import { EnemyType, TGameSettings, TowersList } from '@typings/app.typings';

import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { Menu } from './Menu';
import { PlacementTile } from './PlacementTile';
import { Resource } from './Resources';

const mapsSettings = import.meta.glob(`../../public/game/maps/*.json`);

export class Game {
  private imageSrc: string | undefined;
  private context: CanvasRenderingContext2D | null;
  private settings: TGameSettings | undefined;

  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];
  private enemies: Enemy[] = [];

  private waveIndex = 0;
  private cursor: { x: number; y: number } = { x: 0, y: 0 };
  private activeTile: PlacementTile | undefined = undefined;

  private gameOver: boolean | undefined;

  private resources = {
    coins: <Resource | null>null,
  };

  handleMouseMoveEvent = (event: MouseEvent) => this.handleMouseMove(event);
  handleClickEvent = () => this.handleClick();

  private activePlacementTile = 0;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly mapName: string) {
    this.context = this.canvas.getContext('2d');
  }

  private async init() {
    const path = <string>Object.keys(mapsSettings).find((path) => {
      const position = path.lastIndexOf('/') + 1;
      const filename = path.substring(position);

      return filename === `settings-${this.mapName}.json`;
    });

    const settings = await mapsSettings[path]();

    this.settings = <TGameSettings>JSON.parse(JSON.stringify(settings));
    this.imageSrc = `./game/maps/background-${this.mapName}.png`;
  }

  public async start() {
    await this.init();

    const { settings, context, imageSrc } = this;

    if (settings && context && imageSrc) {
      const { canvas, imageSrc, cursor, placementTiles, buildings, enemies } = this;
      const { tileSize, width, height, waves } = settings;

      canvas.width = width * tileSize;
      canvas.height = height * tileSize;

      const img = await this.loadBackground(<string>imageSrc);

      if (img) {
        const menu = new Menu(context, { x: canvas.width / 2, y: canvas.height / 2 });
        const { hearts, coins, points } = this.createResources();
        this.createPlacementTiles();
        this.spawnEnemiesWave(this.waveIndex);

        this.resources.coins = coins;

        canvas.addEventListener('mousemove', this.handleMouseMoveEvent);
        canvas.addEventListener('click', this.handleClickEvent);

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
              building.updateTower(cursor);
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
                  this.gameOver = true;
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
                this.gameOver = true;
                resolve(points.getCount());
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
    } else {
      // если фулл скрин убран
    }

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  }

  private handleClick() {
    const { activeTile, buildings, context, settings } = this;
    const { tileSize } = <TGameSettings>settings;

    const coins = this.resources.coins;

    const positions = {
      stone: null as boolean | null,
      archer: null as boolean | null,
      crossbowman: null as boolean | null,
      magicTower: null as boolean | null,
    };

    const towerList = [
      {
        position: 'stone',
        price: 50,
        type: TowersList.STONE,
      },
      {
        position: 'archer',
        price: 100,
        type: TowersList.ARCHER,
      },
      {
        position: 'crossbowman',
        price: 150,
        type: TowersList.CROSSBOWMAN,
      },
      {
        position: 'magicTower',
        price: 200,
        type: TowersList.MAGICTOWER,
      },
    ];

    this.activePlacementTile++;

    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      if (this.context && activeTile && activeTile.isOccupied !== true && !this.gameOver) {
        const img = new Image();
        img.src = './game/assets/towers/tower_list.png';
        this.context.drawImage(img, activeTile.position.x - 64, activeTile.position.y - 64);

        positions.stone =
          this.cursor.y + 64 > activeTile.position.y &&
          this.cursor.y < activeTile.position.y &&
          this.cursor.x + 64 > activeTile.position.x &&
          this.cursor.x < activeTile.position.x;

        positions.archer =
          this.cursor.y + 64 > activeTile.position.y &&
          this.cursor.y < activeTile.position.y &&
          this.cursor.x - 64 > activeTile.position.x &&
          this.cursor.x < activeTile.position.x + 128;

        positions.crossbowman =
          this.cursor.y - 64 > activeTile.position.y &&
          this.cursor.y < activeTile.position.y + 128 &&
          this.cursor.x + 64 > activeTile.position.x &&
          this.cursor.x < activeTile.position.x;

        positions.magicTower =
          this.cursor.y - 64 > activeTile.position.y &&
          this.cursor.y < activeTile.position.y + 128 &&
          this.cursor.x - 64 > activeTile.position.x &&
          this.cursor.x < activeTile.position.x + 128;

        if (
          (positions.stone || positions.archer || positions.crossbowman || positions.magicTower) &&
          activeTile &&
          !activeTile.isOccupied
        ) {
          for (let i = 0; i < towerList.length; i++) {
            const tower = towerList[i];
            if (
              positions[tower.position as keyof typeof positions] &&
              coins &&
              coins.getCount() >= tower.price &&
              this.activePlacementTile === 2
            ) {
              buildings.push(
                new Building(
                  <CanvasRenderingContext2D>context,
                  {
                    x: activeTile.position.x,
                    y: activeTile.position.y,
                  },
                  tower.type,
                  tileSize
                )
              );
              activeTile.isOccupied = true;
              coins.setCount(coins.getCount() - tower.price);
              break;
            }
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
    const placementTileСoordinates = 91448;

    for (let i = 0; i < placementTilesArr.length; i += width) {
      placementTilesData2D.push(placementTilesArr.slice(i, i + width));
    }

    placementTilesData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === placementTileСoordinates) {
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
    const { waves } = <TGameSettings>this.settings;

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
