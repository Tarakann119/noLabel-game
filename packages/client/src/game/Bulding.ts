import { TBuildingSettings, TowerType } from '@typings/app.typings';

import { settings } from './settings/buldings';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { Sprite } from './Sprite';

export class Building extends Sprite {
  public readonly settings: TBuildingSettings;
  private center: { x: number; y: number };
  private target: Enemy | null = null;
  public readonly projectiles: Projectile[] = [];

  private enemyRadius = 30;

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public position: { x: number; y: number } = { x: 0, y: 0 },
    private towerType: TowerType,
    private readonly tileSize: {
      height: number;
      width: number;
    }
  ) {
    super(
      context,
      position,
      settings[towerType].imageSrc,
      { x: -32, y: -80 },
      settings[towerType].maxFrames,
      settings[towerType].delay
    );

    this.settings = settings[this.towerType];
    this.center = {
      x: this.position.x + this.tileSize.width / 2,
      y: this.position.y + this.tileSize.height / 2,
    };
  }

  public shoot(enemies: Enemy[]) {
    const { projectiles } = this;

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];

      projectile.update();

      if (this.isValidEnemy(projectile.enemy, projectile.position, projectile.radius)) {
        projectile.enemy.wounds += projectile.settings.damage;
        let reward = null;

        if (projectile.enemy.wounds >= projectile.enemy.settings.health) {
          const enemyIndex = enemies.findIndex((enemy) => {
            return projectile.enemy === enemy;
          });

          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);

            reward = {
              coins: projectile.enemy.settings.coins,
              points: projectile.enemy.settings.points,
            };
          }
        }

        projectiles.splice(i, 1);
        return reward;
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

    return distance < this.enemyRadius + radius;
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
    this.context.beginPath();
    this.context.arc(this.center.x, this.center.y, this.settings.radius, 0, Math.PI * 2);
    super.draw();
  }

  public isCursorInTileBorders(cursor: { x: number; y: number }) {
    const { position, tileSize } = this;

    return (
      cursor.x > position.x &&
      cursor.x < position.x + tileSize.width * 1.5 &&
      cursor.y > position.y &&
      cursor.y < position.y + tileSize.height * 1.5
    );
  }

  updateTower(cursor: { x: number; y: number }) {
    this.draw();

    // наведение на башню
    if (this.isCursorInTileBorders(cursor)) {
      this.context.fillStyle = 'rgba(0, 0, 255, 0.1)';
      this.context.fill();
    }

    const { target, frames } = this;

    if (target || (!target && frames.current !== 0)) {
      super.update();
    }

    if (target && frames.current === 6 && frames.elapsed % frames.hold === 0) {
      this.createProjectile();
    }
  }
}
