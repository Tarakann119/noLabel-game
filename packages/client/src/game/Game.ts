import { PlacementTile } from './PlacementTile';
import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { Resource } from './Resources';
import { Menu } from './Menu';
import { EnemyType, TGameSettings, TowerType } from '../../typings/app.typings';

export class Game {
  private readonly pathToMap = '../../public/game/maps/';
  private readonly imageSrc: string;
  private readonly settingsSrc: string;
  private context: CanvasRenderingContext2D | null;
  private settings: TGameSettings | null = null;

  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];
  private enemies: Enemy[] = [];

  private waveIndex = 0;
  private cursor: { x: number; y: number } = { x: 0, y: 0 };
  private activeTile: PlacementTile | undefined = undefined;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly mapName: string) {
    this.context = this.canvas.getContext('2d');
    this.imageSrc = `${this.pathToMap}${this.mapName}/background.png`;
    this.settingsSrc = `${this.pathToMap}${this.mapName}/settings.ts`;
  }

  private async init() {
    const { settings } = await import(this.settingsSrc);
    this.settings = settings;
  }

  public async start() {
    await this.init();

    const { settings, context } = this;

    if (settings && context) {
      const { canvas, imageSrc, cursor, placementTiles, buildings, enemies } = this;
      const { tileSize, width, height, waves } = settings;

      canvas.width = width * tileSize;
      canvas.height = height * tileSize;

      const img = await this.loadBackground(imageSrc);

      if (img) {
        const menu = new Menu(context, { x: canvas.width / 2, y: canvas.height / 2 });
        const { hearts, coins, points } = this.createResources();
        this.createPlacementTiles();
        this.spawnEnemiesWave(this.waveIndex);

        canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
        canvas.addEventListener('click', () => this.handleClick(coins));

        return new Promise<number>((resolve) => {
          const animate = () => {
            const animationId = requestAnimationFrame(animate);

            context.drawImage(img, 0, 0);

            coins.update();
            hearts.update();
            points.update();

            placementTiles.forEach((tile) => {
              tile.update(cursor);
            });

            buildings.forEach((building) => {
              building.update();
              building.setTarget(enemies);
              building.shoot(enemies, coins, points);
            });

            for (let i = enemies.length - 1; i >= 0; i -= 1) {
              const enemy = enemies[i];
              enemy.update();

              if (enemy.isAtTheEndPoint(canvas)) {
                hearts.setCount(hearts.getCount() - 1);
                enemies.splice(i, 1);

                if (hearts.getCount() <= 0) {
                  hearts.update();

                  menu.setText('Поражение!');
                  menu.setPoints(points.getCount());
                  menu.update();

                  cancelAnimationFrame(animationId);
                  resolve(points.getCount());
                }
              }
            }

            if (enemies.length === 0) {
              if (this.waveIndex < waves.length - 1) {
                this.waveIndex += 1;
                this.spawnEnemiesWave(this.waveIndex);
              } else {
                coins.update();
                points.update();

                menu.setText('Победа!');
                menu.setPoints(points.getCount());
                menu.update();

                cancelAnimationFrame(animationId);
                resolve(points.getCount());
              }
            }
          };

          requestAnimationFrame(animate);
        });
      }
    }
  }

  private handleMouseMove(event: MouseEvent) {
    const { placementTiles, cursor } = this;

    cursor.x = event.clientX;
    cursor.y = event.clientY;

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  }

  private handleClick(coins: Resource) {
    const { activeTile, buildings, context, settings } = this;
    const { tileSize } = <TGameSettings>settings;

    if (activeTile && !activeTile.isOccupied && coins.getCount() >= 25) {
      coins.setCount(coins.getCount() - 25);

      buildings.push(
        new Building(
          <CanvasRenderingContext2D>context,
          {
            x: activeTile.position.x,
            y: activeTile.position.y,
          },
          TowerType.STONE,
          tileSize
        )
      );

      activeTile.isOccupied = true;

      buildings.sort((a, b) => {
        return a.position.y - b.position.y;
      });
    }
  }

  private loadBackground(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject);
      img.src = src;
    });
  }

  private createResources() {
    const { canvas, context, settings } = this;
    const { coins: initialСoins, hearts: initialHearts } = <TGameSettings>settings;

    const hearts = new Resource(
      <CanvasRenderingContext2D>context,
      {
        x: canvas.width - 190,
        y: 0,
      },
      initialHearts,
      'heart.png'
    );
    const coins = new Resource(
      <CanvasRenderingContext2D>context,
      {
        x: canvas.width - 120,
        y: 0,
      },
      initialСoins,
      'coin.png'
    );
    const points = new Resource(
      <CanvasRenderingContext2D>context,
      {
        x: 20,
        y: 0,
      },
      0,
      'points.png'
    );

    return { hearts, coins, points };
  }

  private createPlacementTiles() {
    const { placementTiles: placementTilesArr, width, tileSize } = <TGameSettings>this.settings;
    const { placementTiles, context } = this;
    const placementTilesData2D: number[][] = [];

    for (let i = 0; i < placementTilesArr.length; i += width) {
      placementTilesData2D.push(placementTilesArr.slice(i, i + width));
    }

    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          placementTiles.push(
            new PlacementTile(
              <CanvasRenderingContext2D>context,
              {
                x: x * tileSize,
                y: y * tileSize,
              },
              tileSize
            )
          );
        }
      });
    });
  }

  private createEnemy(enemyType: EnemyType, xOffset: number) {
    const { enemies, context, settings } = this;
    const { waypoints } = <TGameSettings>settings;

    enemies.push(
      new Enemy(
        <CanvasRenderingContext2D>context,
        {
          x: waypoints[0].x - xOffset,
          y: waypoints[0].y,
        },
        enemyType,
        waypoints
      )
    );
  }

  private spawnEnemiesWave(waveNumber: number) {
    const { waves } = <TGameSettings>this.settings;

    const wave = waves[waveNumber].enemies;

    wave.forEach(({ type, count }) => {
      for (let i = 0; i < count; i += 1) {
        const xOffset = i * 150;

        this.createEnemy(type, xOffset);
      }
    });
  }
}
