import { Enemy } from './Enemy';
import { Sprite } from './Sprite';

export class Projectile extends Sprite {
  private velocity: { x: number; y: number } = { x: 0, y: 0 };
  public radius = 3;

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public position: { x: number; y: number } = { x: 0, y: 0 },
    public readonly settings: {
      imageSrc: string;
      damage: number;
    },
    public readonly enemy: Enemy
  ) {
    super(context, position, settings.imageSrc);
  }

  public update() {
    this.draw();

    const { enemy, velocity, position } = this;

    const angle = Math.atan2(enemy.center.y - position.y, enemy.center.x - position.x);

    const power = 5;
    velocity.x = Math.cos(angle) * power;
    velocity.y = Math.sin(angle) * power;

    position.x += velocity.x;
    position.y += velocity.y;
  }
}
