import { EnemyType, TGameSettings, TowersList } from '@typings/app.typings';

import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { PlacementTile } from './PlacementTile';
import { Resources } from './Resources';
export class Game {
  private imageSrc: string | undefined;
  private context: CanvasRenderingContext2D | null;

  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];
  private enemies: Enemy[] = [];
  private gameResources: Resources | undefined;

  private waveIndex = 0;
  private cursor: { x: number; y: number } = { x: 0, y: 0 };
  private tileSize: { height: number; width: number };
  private activeTile: PlacementTile | undefined = undefined;

  private gameOver: boolean | undefined;

  handleMouseMoveEvent = (event: MouseEvent) => this.handleMouseMove(event);
  handleClickEvent = () => this.handleClick();

  private activePlacementTile = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly wrapperSize: { height: number; width: number },
    private readonly mapName: string,
    private readonly mapSettings: TGameSettings
  ) {
    this.context = this.canvas.getContext('2d');
    this.imageSrc = `./game/maps/background-${this.mapName}.png`;
    this.tileSize = {
      height: wrapperSize.height / mapSettings.height,
      width: wrapperSize.width / mapSettings.width,
    };
  }

  public async start() {
    const { context, wrapperSize, imageSrc, mapSettings } = this;

    if (mapSettings && context && imageSrc) {
      const { canvas, imageSrc, cursor, placementTiles, buildings, enemies } = this;
      const { waves, coins, hearts } = mapSettings;

      const canvasHeight = wrapperSize.height;
      const canvasWidth = wrapperSize.width;

      canvas.height = canvasHeight;
      canvas.width = canvasWidth;

      const img = await this.loadBackground(<string>imageSrc);

      if (img) {
        this.gameResources = new Resources(canvas, {
          hearts,
          coins,
          points: 0,
        });

        this.createPlacementTiles();

        this.spawnEnemiesWave(this.waveIndex);

        this.gameResources.setValue('coins', coins);

        canvas.addEventListener('mousemove', this.handleMouseMoveEvent);
        canvas.addEventListener('click', this.handleClickEvent);

        return new Promise<{ text: string; score: number }>((resolve) => {
          const animate = () => {
            const animationId = requestAnimationFrame(animate);

            context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            (this.gameResources as Resources).update();

            placementTiles.forEach((tile) => {
              tile.update(cursor);
            });

            buildings.forEach((building) => {
              building.updateTower(cursor);
              building.setTarget(enemies);
              const reward = building.shoot(enemies);

              if (reward) {
                const newCoins = (this.gameResources as Resources).getValue('coins') + reward.coins;
                const newPoints =
                  (this.gameResources as Resources).getValue('points') + reward.points;
                (this.gameResources as Resources).setValue('coins', newCoins);
                (this.gameResources as Resources).setValue('points', newPoints);
              }
            });

            for (let i = enemies.length - 1; i >= 0; i -= 1) {
              const enemy = enemies[i];
              enemy.update();

              if (enemy.isAtTheEndPoint(canvas)) {
                const newHearts = (this.gameResources as Resources).getValue('hearts') - 1;
                (this.gameResources as Resources).setValue('hearts', newHearts);
                enemies.splice(i, 1);

                if ((this.gameResources as Resources).getValue('hearts') <= 0) {
                  this.gameOver = true;
                  cancelAnimationFrame(animationId);
                  resolve({
                    text: 'Поражение',
                    score: (this.gameResources as Resources).getValue('points'),
                  });
                }
              }
            }

            if (enemies.length === 0) {
              if (this.waveIndex < waves.length - 1) {
                this.waveIndex += 1;
                this.spawnEnemiesWave(this.waveIndex);
              } else {
                this.gameOver = true;
                cancelAnimationFrame(animationId);
                resolve({
                  text: 'Победа',
                  score: (this.gameResources as Resources).getValue('points'),
                });
              }
            }
          };

          requestAnimationFrame(animate);
        });
      }
    }
  }

  public removeAllEvents() {
    const { canvas } = this;

    canvas.removeEventListener('mousemove', this.handleMouseMoveEvent);
    canvas.removeEventListener('click', this.handleClickEvent);
  }

  private handleMouseMove(event: MouseEvent) {
    const { placementTiles, cursor } = this;

    if (this.canvas.width <= window.innerWidth) {
      cursor.x = event.clientX - ((window.innerWidth - this.canvas.width) / 2 - 20);
    } else {
      cursor.x = event.clientX;
    }

    if (this.canvas.height <= window.innerHeight) {
      cursor.y = event.clientY - 84;
    } else {
      cursor.y = event.clientY;
    }

    if (document.fullscreenElement) {
      // если фулл скрин включен
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const scaleFactorX = this.canvas.width / screenWidth;
      const scaleFactorY = this.canvas.height / screenHeight;
      cursor.x = Math.min(Math.max(event.clientX * scaleFactorX, 0), 1280);
      cursor.y = Math.min(Math.max(event.clientY * scaleFactorY, 0), 768);
    }

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  }

  private handleClick() {
    const { activeTile, buildings, context, mapSettings } = this;
    const { tileSize } = <TGameSettings>mapSettings;

    this.activePlacementTile++;
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      if (this.context && activeTile && activeTile.isOccupied !== true && !this.gameOver) {
        const img = new Image();
        img.src = './game/assets/towers/tower_list.png';
        this.context.drawImage(img, activeTile.position.x - 64, activeTile.position.y - 64);

        const towerList = [
          {
            position:
              this.cursor.y + 64 > activeTile.position.y &&
              this.cursor.y < activeTile.position.y &&
              this.cursor.x + 64 > activeTile.position.x &&
              this.cursor.x < activeTile.position.x,
            price: 50,
            type: TowersList.STONE,
          },
          {
            position:
              this.cursor.y + 64 > activeTile.position.y &&
              this.cursor.y < activeTile.position.y &&
              this.cursor.x - 64 > activeTile.position.x &&
              this.cursor.x < activeTile.position.x + 128,
            price: 100,
            type: TowersList.ARCHER,
          },
          {
            position:
              this.cursor.y - 64 > activeTile.position.y &&
              this.cursor.y < activeTile.position.y + 128 &&
              this.cursor.x + 64 > activeTile.position.x &&
              this.cursor.x < activeTile.position.x,
            price: 150,
            type: TowersList.CROSSBOWMAN,
          },
          {
            position:
              this.cursor.y - 64 > activeTile.position.y &&
              this.cursor.y < activeTile.position.y + 128 &&
              this.cursor.x - 64 > activeTile.position.x &&
              this.cursor.x < activeTile.position.x + 128,
            price: 200,
            type: TowersList.MAGICTOWER,
          },
        ];

        for (let i = 0; i < towerList.length; i++) {
          const el = towerList[i];

          if (el.position) {
            if (
              (this.gameResources as Resources).getValue('coins') >= el.price &&
              this.activePlacementTile === 2
            ) {
              buildings.push(
                new Building(
                  <CanvasRenderingContext2D>context,
                  {
                    x: activeTile.position.x,
                    y: activeTile.position.y,
                  },
                  el.type,
                  tileSize
                )
              );

              activeTile.isOccupied = true;

              const newCoins = (this.gameResources as Resources).getValue('coins') + -el.price;
              (this.gameResources as Resources).setValue('coins', newCoins);
            }

            break;
          }
        }

        buildings.sort((a, b) => {
          return a.position.y - b.position.y;
        });
      }

      if (this.activePlacementTile === 2) {
        cancelAnimationFrame(animationId);
        this.activePlacementTile = 1;
      }
    };

    requestAnimationFrame(animate);
  }

  private loadBackground(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();

      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject);
      img.src = src;
    });
  }

  private createPlacementTiles() {
    const { placementTiles: placementTilesArr, width } = <TGameSettings>this.mapSettings;
    const { placementTiles, context, tileSize } = this;
    const placementTilesData2D: number[][] = [];

    for (let i = 0; i < placementTilesArr.length; i += width) {
      placementTilesData2D.push(placementTilesArr.slice(i, i + width));
    }

    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol !== 0) {
          placementTiles.push(
            new PlacementTile(
              <CanvasRenderingContext2D>context,
              {
                x: x * tileSize.width,
                y: y * tileSize.height,
              },
              tileSize
            )
          );
        }
      });
    });
  }

  private createEnemy(enemyType: EnemyType, xOffset: number) {
    const { enemies, context, mapSettings } = this;
    const { waypoints } = <TGameSettings>mapSettings;

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

  private mixWaves(
    wave: {
      type: EnemyType;
      count: number;
    }[]
  ) {
    const output: EnemyType[] = [];
    const counts = wave.map((enemy) => ({ type: enemy.type, count: enemy.count }));

    let index = 0;
    let remaining = wave.reduce((total, enemy) => total + enemy.count, 0);

    while (remaining > 0) {
      const enemy = wave[index];
      if (counts[index].count > 0) {
        output.push(enemy.type);
        counts[index].count--;
        remaining--;
      }
      index = (index + 1) % wave.length;
    }

    return output;
  }

  private spawnEnemiesWave(waveNumber: number) {
    const { waves } = <TGameSettings>this.mapSettings;

    const wave = waves[waveNumber].enemies;

    if (wave.length === 1) {
      for (let i = 1; i < wave[0].count + 1; i++) {
        const xOffset = i * 150;

        this.createEnemy(wave[0].type, xOffset);
      }
    } else {
      const extendWaves = this.mixWaves(wave);

      extendWaves.forEach((type, i) => {
        let index = i + 1;
        const xOffset = index * 150;

        this.createEnemy(type, xOffset);
        index++;
      });
    }
  }
}
