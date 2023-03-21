import { EnemyType, TEnemySettings } from '@typings/app.typings';

import { settings } from './settings/enemies';
import { Sprite } from './Sprite';

export class Enemy extends Sprite {
  public readonly settings: TEnemySettings;
  private velocity: { x: number; y: number } = { x: 0, y: 0 };
  public center: { x: number; y: number };
  public waypointIndex = 0;
  public wounds = 0;

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public position: { x: number; y: number } = { x: 0, y: 0 },
    private readonly enemyType: EnemyType,
    private readonly waypoints: { x: number; y: number }[]
  ) {
    super(context, position, settings[enemyType].imageSrc, { x: 0, y: 0 }, 7);

    this.settings = settings[this.enemyType];

    this.center = {
      x: this.position.x + this.settings.width / 2,
      y: this.position.y + this.settings.height / 2,
    };
  }

  public isAtTheEndPoint(canvas: HTMLCanvasElement) {
    const { position, waypoints, waypointIndex } = this;

    return (
      waypointIndex >= waypoints.length - 1 &&
      (position.x > canvas.width || position.y > canvas.height || position.x < 0 || position.y < 0)
    );
  }

  protected draw() {
    super.draw();

    const { context, position, settings, wounds } = this;

    const width = settings.width / 2;
    const segment = width / settings.health;

    context.fillStyle = 'red';
    context.fillRect(position.x + settings.radius, position.y - 15, width, 10);

    if (settings.health >= 0) {
      context.fillStyle = 'green';
      context.fillRect(
        position.x + settings.radius,
        position.y - 15,
        segment * (settings.health - wounds),
        10
      );
    }

    for (let i = 1; i < settings.health; i += 1) {
      context.fillStyle = 'darkgreen';
      context.fillRect(position.x + settings.radius + segment * i, position.y - 15, 1, 10);
    }
  }

  public update() {
    this.draw();
    super.update();

    const { waypoints, center, position, velocity, settings, waypointIndex } = this;

    const waypoint = waypoints[waypointIndex];
    const yDistance = waypoint.y - center.y;
    const xDistance = waypoint.x - center.x;
    const angle = Math.atan2(yDistance, xDistance);

    velocity.x = Math.cos(angle) * settings.speed;
    velocity.y = Math.sin(angle) * settings.speed;

    position.x += velocity.x;
    position.y += velocity.y;

    center.x = position.x + settings.width / 2;
    center.y = position.y + settings.height / 2;

    if (
      Math.abs(Math.round(center.x) - Math.round(waypoint.x)) < Math.abs(velocity.x) &&
      Math.abs(Math.round(center.y) - Math.round(waypoint.y)) < Math.abs(velocity.y) &&
      waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex += 1;
    }
  }
}
