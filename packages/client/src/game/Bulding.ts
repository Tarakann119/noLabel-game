import { Sprite } from './Sprite';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { TBuildingSettings, TowerType } from '../../typings/app.typings';
import { settings } from './settings/buldings';
import { Resource } from './Resources';

export class Building extends Sprite {
  public readonly settings: TBuildingSettings;
  private center: { x: number; y: number };
  private target: Enemy | null = null;
  public readonly projectiles: Projectile[] = [];

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public position: { x: number; y: number } = { x: 0, y: 0 },
    private towerType: TowerType,
    private readonly tileSize: number
  ) {
    super(
      context,
      position,
      settings[towerType].imageSrc,
      { x: 0, y: -80 },
      19,
      settings[towerType].delay
    );

    this.settings = settings[this.towerType];
    this.center = {
      x: this.position.x + this.tileSize / 2,
      y: this.position.y + this.tileSize / 2,
    };
  }

  public shoot(enemies: Enemy[], coins: Resource, points: Resource) {
    const { projectiles } = this;

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];

      projectile.update();

      if (this.isValidEnemy(projectile.enemy, projectile.position, projectile.settings.radius)) {
        projectile.enemy.wounds += projectile.settings.damage;

        if (projectile.enemy.wounds >= projectile.enemy.settings.health) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return projectile.enemy === enemy;
          });

          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);
            coins.setCount(coins.getCount() + projectile.enemy.settings.coins);
            points.setCount(points.getCount() + projectile.enemy.settings.points);
          }
        }

        projectiles.splice(i, 1);
      }
    }
  }

  public setTarget(enemies: Enemy[]) {
    const { position, settings } = this;
    const validEnemies = enemies.filter((enemy) =>
      this.isValidEnemy(enemy, position, settings.radius)
    );

    this.target = validEnemies[0] || null;
  }

  public isValidEnemy(enemy: Enemy, position: { x: number; y: number }, radius: number) {
    const xDifference = enemy.center.x - position.x;
    const yDifference = enemy.center.y - position.y;
    const distance = Math.hypot(xDifference, yDifference);

    return distance < enemy.settings.radius + radius;
  }

  private createProjectile() {
    const { projectiles, context, center, settings, target } = this;

    projectiles.push(
      new Projectile(
        context,
        {
          x: center.x - 20,
          y: center.y - 120,
        },
        settings.projectile,
        <Enemy>target
      )
    );
  }

  protected draw() {
    const { context, settings, center } = this;
    context.beginPath();
    context.arc(center.x, center.y, settings.radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 255, 0.2)';
    context.fill();

    super.draw();
  }

  public update() {
    this.draw();

    const { target, frames } = this;

    if (target || (!target && frames.current !== 0)) {
      super.update();
    }

    if (target && frames.current === 6 && frames.elapsed % frames.hold === 0) {
      this.createProjectile();
    }
  }
}
