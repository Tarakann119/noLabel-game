import { EnemyType, GameButtons, TGameSettings, TowersList } from '@typings/app.typings';
import { throttle } from 'lodash';

import { activateFullscreen, deactivateFullscreen } from '@/utils/fullscreen';

import { loadImage } from './utils/loadImage';
import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { Interface } from './Interface';
import { PlacementTile } from './PlacementTile';
import { Resources } from './Resources';

export class Game {
  private context: CanvasRenderingContext2D | null;
  private imageSrc: string | undefined;
  private audio: HTMLAudioElement | undefined;
  private tileSize: { height: number; width: number };

  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];
  private enemies: Enemy[] = [];
  private gameResources: Resources | undefined;
  private gameInterface: Interface | undefined;

  private cursor: { x: number; y: number } = { x: 0, y: 0 };
  private activeTile: PlacementTile | undefined = undefined;
  private activePlacementTile = 0;

  private pause = true;
  private fullscreen = false;
  private volume = 0.6;
  private waveIndex = 0;
  private difficulty = 1;
  private waveBuffs = {
    speed: 0,
    offset: 150,
    health: 0,
  };
  private spawn = {
    timer: false,
    indicator: true,
    deegres: 0,
  };

  private gameOver: boolean | undefined;

  handleMouseMoveEvent = throttle((event: MouseEvent) => this.handleMouseMove(event), 100);
  handleClickEvent = () => this.handleClick();

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly wrapperSize: { height: number; width: number },
    mapName: string,
    private readonly mapSettings: TGameSettings,
    track: string
  ) {
    this.context = this.canvas.getContext('2d');
    this.imageSrc = `./game/maps/background-${mapName}.png`;
    this.tileSize = {
      height: wrapperSize.height / mapSettings.height,
      width: wrapperSize.width / mapSettings.width,
    };
    this.audio = new Audio(track);
  }

  public async start() {
    const { context, wrapperSize, imageSrc, mapSettings, audio } = this;

    if (mapSettings && context && imageSrc && wrapperSize) {
      const { canvas, imageSrc, cursor, placementTiles, buildings, enemies } = this;
      const { waves, coins, hearts } = mapSettings;

      const canvasHeight = wrapperSize.height;
      const canvasWidth = wrapperSize.width;

      // Устанавливаем размеры канваса
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;

      const img = await loadImage(<string>imageSrc);
      const spawnImg = await loadImage('./game/assets/interface/wave/indicator.png');

      if (img) {
        canvas.addEventListener('mousemove', this.handleMouseMoveEvent);
        canvas.addEventListener('click', this.handleClickEvent);

        this.gameResources = new Resources(canvas, { hearts, coins, points: 0 }) as Resources;
        const { gameResources } = this;

        this.gameInterface = new Interface(canvas, this.volume, this.pause, this.fullscreen);
        const { gameInterface } = this;

        // Создание массива клеток под башни
        this.createPlacementTiles();

        // Запуск музыки
        if (audio) {
          audio.addEventListener('canplaythrough', () => {
            audio.volume = this.volume;
            this.playMusicLoop();
            audio.play();
          });
        }

        return await new Promise<{ text: string; score: number }>((resolve) => {
          const animate = async (pause: boolean, volume: number) => {
            const animationId = requestAnimationFrame(() => animate(this.pause, this.volume));

            if (audio) {
              audio.volume = volume;
            }

            // Отрисовка фона
            context.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            // Отрисовка кнопок
            gameInterface.update();

            if (!pause) {
              // Отрисовка активных клеток
              placementTiles.forEach((tile) => {
                tile.update(cursor);
              });

              // Отрисовка башен и стрельбы
              buildings.forEach((building) => {
                building.updateTower(cursor);
                building.setTarget(enemies);

                // Если враг убит
                const reward = building.shoot(enemies);
                if (reward) {
                  const newCoins = gameResources.getValue('coins') + reward.coins;
                  const newPoints = gameResources.getValue('points') + reward.points;
                  gameResources.setValue('coins', newCoins);
                  gameResources.setValue('points', newPoints);
                }
              });

              for (let i = enemies.length - 1; i >= 0; i -= 1) {
                const enemy = enemies[i];
                enemy.update();

                // Если враг дошел до края карты:
                if (enemy.isAtTheEndPoint(canvas)) {
                  // отнимает здоровье
                  const newHearts = gameResources.getValue('hearts') - 1;
                  gameResources.setValue('hearts', newHearts);

                  // удаляет врага из пула
                  enemies.splice(i, 1);

                  // Если здоровье опустилось до 0
                  if (gameResources.getValue('hearts') === 0) {
                    this.gameOver = true;
                    cancelAnimationFrame(animationId);
                    this.playMusicLoop('stop');
                    this.removeAllEvents();
                    resolve({
                      text: 'Поражение',
                      score: gameResources.getValue('points'),
                    });
                  }
                }
              }

              // Если врагов нет
              if (enemies.length === 0) {
                // показать индикатор перед волной
                if (this.spawn.indicator) {
                  const time = 500;
                  this.drawWaveLoadIndicator(spawnImg);

                  if (!this.spawn.timer) {
                    const id = setInterval(() => {
                      this.spawn.deegres += 360 / time;

                      if (this.spawn.deegres >= 360) {
                        this.spawn.indicator = false;
                        this.spawnEnemiesWave();
                        this.waveIndex += 1;
                        clearInterval(id);
                      }
                    }, 1);

                    this.spawn.timer = true;
                  }
                } else {
                  this.spawnEnemiesWave();

                  this.waveIndex = this.waveIndex < waves.length - 1 ? this.waveIndex + 1 : 0;

                  if (this.waveIndex === 0) {
                    this.difficulty += 1;
                    this.spawn.indicator = true;
                    this.spawn.timer = false;
                    this.spawn.deegres = 0;
                  }
                }
              }
            }

            // Отрисовка плашки с ресурсами
            gameResources.update();
          };

          requestAnimationFrame(() => animate(this.pause, this.volume));
        });
      }
    }
  }

  private drawWaveLoadIndicator(spawnImg: HTMLImageElement) {
    const { context, mapSettings } = this;

    if (!spawnImg || !context) {
      return;
    }
    const arcRadius = 35;
    const lineWidth = 10;

    context.beginPath();
    context.arc(
      mapSettings.waypoints[1].x + arcRadius,
      mapSettings.waypoints[1].y + arcRadius / 3,
      arcRadius,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * (270 + 360)
    );
    context.strokeStyle = '#b1b1b1';
    context.lineWidth = lineWidth;
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#3949AB';
    context.lineWidth = lineWidth;
    context.arc(
      mapSettings.waypoints[1].x + arcRadius,
      mapSettings.waypoints[1].y + arcRadius / 3,
      arcRadius,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * (270 + this.spawn.deegres)
    );
    context.stroke();

    context.drawImage(
      spawnImg,
      mapSettings.waypoints[1].x + lineWidth / 2,
      mapSettings.waypoints[1].y - (arcRadius / 3 + lineWidth / 2),
      arcRadius * 2 - lineWidth,
      arcRadius * 2 - lineWidth
    );
  }

  private playMusicLoop(state = 'play') {
    const { audio } = this;

    if (!audio) return;

    audio.loop = true;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const musicAnimation = () => {
      if (audio.currentTime >= audio.duration - 0.05) {
        audio.currentTime = 0;
        audio.play();
      }

      const animateId = requestAnimationFrame(musicAnimation);

      if (state === 'stop') {
        cancelAnimationFrame(animateId);
        audio.pause();
      }
    };

    musicAnimation();
  }

  public removeAllEvents() {
    const { canvas } = this;

    canvas.removeEventListener('mousemove', this.handleMouseMoveEvent);
    canvas.removeEventListener('click', this.handleClickEvent);
    this.audio?.pause();
  }

  private handleMouseMove = (event: MouseEvent) => {
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

    // если фулл скрин включен
    if (document.fullscreenElement) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const scaleFactorX = this.canvas.width / screenWidth;
      const scaleFactorY = this.canvas.height / screenHeight;
      cursor.x = event.clientX * scaleFactorX;
      cursor.y = event.clientY * scaleFactorY;
    }

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  };

  private handleClick() {
    const { activeTile, buildings, context, tileSize, cursor, canvas } = this;
    const gameResources = this.gameResources as Resources;
    const gameInterface = this.gameInterface as Interface;

    const interfaceButton = gameInterface.getClickedButton(cursor);
    if (interfaceButton) {
      switch (interfaceButton) {
        case GameButtons.FULLSCREEN: {
          this.fullscreen = !this.fullscreen;
          gameInterface.setFullscreen(this.fullscreen);

          if (this.fullscreen) {
            activateFullscreen(canvas);
          } else {
            deactivateFullscreen();
          }
          break;
        }

        case GameButtons.PAUSE: {
          this.pause = !this.pause;
          gameInterface.setPause(this.pause);
          break;
        }

        case GameButtons.SOUND: {
          // eslint-disable-next-line no-case-declarations
          const newVolume = Number((this.volume - 0.2).toFixed(2));
          this.volume = newVolume < 0 ? 1 : newVolume;

          if (this.volume < 0.2) {
            gameInterface.setSound(this.volume, true);
          } else {
            gameInterface.setSound(this.volume, false);
          }
          break;
        }
      }
    }

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

    this.activePlacementTile += 1;

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
          for (let i = 0; i < towerList.length; i += 1) {
            const tower = towerList[i];
            if (
              positions[tower.position as keyof typeof positions] &&
              gameResources.getValue('coins') >= tower.price &&
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

              const newCoins = gameResources.getValue('coins') + -tower.price;
              gameResources.setValue('coins', newCoins);
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

  private createEnemy(
    enemyType: EnemyType,
    xOffset: number,
    speedBuff: number,
    healthBuff: number
  ) {
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
        waypoints,
        speedBuff,
        healthBuff
      )
    );
  }

  private mixWaves(
    wave: {
      type: EnemyType;
      count: number;
    }[]
  ) {
    const { difficulty } = this;
    const output: EnemyType[] = [];
    const enemies = wave.map((enemy) => ({ type: enemy.type, count: enemy.count * difficulty }));

    let index = 0;
    let totalEnemies = enemies.reduce((total, enemy) => total + enemy.count, 0);

    while (totalEnemies > 0) {
      if (enemies[index].count > 0) {
        output.push(enemies[index].type);
        enemies[index].count -= 1;
        totalEnemies -= 1;
      }

      index = (index + 1) % enemies.length;
    }

    return output;
  }

  private spawnEnemiesWave() {
    const { waveIndex, difficulty } = this;
    const { waves } = <TGameSettings>this.mapSettings;

    if (difficulty % 2 === 0) {
      this.waveBuffs.offset = 150 - difficulty * 4 >= 50 ? 150 - difficulty * 4 : 50;
      this.waveBuffs.speed += 0.1;
    }

    if (difficulty % 4 === 0) {
      this.waveBuffs.health += 1;
    }

    const wave = waves[waveIndex].enemies;
    const enemies: EnemyType[] =
      wave.length === 1
        ? new Array(wave[0].count * difficulty).fill(wave[0].type)
        : this.mixWaves(wave);

    enemies.forEach((type, i) => {
      let index = i + 1;
      const xOffset = index * this.waveBuffs.offset;

      this.createEnemy(type, xOffset, this.waveBuffs.speed, this.waveBuffs.health);
      index += 1;
    });
  }
}
