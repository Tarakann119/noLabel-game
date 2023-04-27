import {
  EnemyType,
  TGameSettings,
  TowerListItemType,
  TowersList,
  TowerType,
} from '@typings/app.typings';
import { throttle } from 'lodash';

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

  private towers: TowerListItemType[] = [];
  private dragok = false;
  private towerType: TowerType | null = null;
  private startX: number | undefined;
  private startY: number | undefined;

  handleMouseMoveEvent = (event: MouseEvent) => this.handleMouseMove(event);
  handleClickEvent = () => this.handleClick;
  myUpEvent = () => this.myUp;
  myDownEvent = () => this.myDown;

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
    this.createTowerListItems();

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
        canvas.addEventListener('mouseup', this.myUpEvent);
        canvas.addEventListener('mousedown', this.myDownEvent);

        return new Promise<{ text: string; score: number }>((resolve) => {
          const animate = () => {
            const animationId = requestAnimationFrame(animate);

            context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            (this.gameResources as Resources).update();

            this.draw();

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
    canvas.removeEventListener('mouseup', this.myUpEvent);
    canvas.removeEventListener('mousedown', this.myDownEvent);
  }

  private handleMouseMove(event: MouseEvent) {
    const { placementTiles, cursor, dragok, towers } = this;

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

    if (dragok && this.startX && this.startY) {
      const dx = cursor.x - this.startX;
      const dy = cursor.y - this.startY;

      for (let i = 0; i < towers.length; i++) {
        if (towers[i].isDragging == true) {
          towers[i].x += dx;
          towers[i].y += dy;
        }
      }
      this.draw();

      this.startX = cursor.x;
      this.startY = cursor.y;
    }

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  }

  private handleClick() {
    const { activeTile, buildings, context, mapSettings } = this;
    const { tileSize } = <TGameSettings>mapSettings;

    if (
      activeTile &&
      !activeTile.isOccupied &&
      (this.gameResources as Resources).getValue('coins') >= 25 &&
      this.towerType !== null
    ) {
      const newCoins = (this.gameResources as Resources).getValue('coins') + 25;
      (this.gameResources as Resources).setValue('coins', newCoins);

      buildings.push(
        new Building(
          <CanvasRenderingContext2D>context,
          {
            x: activeTile.position.x,
            y: activeTile.position.y,
          },
          this.towerType,
          tileSize
        )
      );
      this.towerType = null;

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

  private myUp() {
    const { towers } = this;

    this.dragok = false;

    for (let i = 0; i < towers.length; i++) {
      towers[0].x = 30;
      towers[0].y = 630;
      towers[1].x = 170;
      towers[1].y = 630;

      towers[i].isDragging = false;
      this.draw();
    }
  }

  private myDown() {
    const { towers, cursor } = this;

    this.dragok = true;
    const group = [];

    for (let i = 0; i < towers.length; i++) {
      if (
        cursor.x > towers[i].x &&
        cursor.x < towers[i].x + towers[i].width + 10 &&
        cursor.y > towers[i].y + 22 &&
        cursor.y < towers[i].y + 22 + towers[i].height
      ) {
        group.push(towers[i]);
      }
    }

    if (group.length === 1) {
      group[0].isDragging = true;
      this.towerType = group[0].type;
    }

    this.startX = cursor.x;
    this.startY = cursor.y;
  }

  private rect(towerListItem: TowerListItemType) {
    if (this.context) {
      const img = new Image();
      img.src = towerListItem.imageSrc;

      this.context.fillStyle = towerListItem.fill;
      this.context.drawImage(img, towerListItem.x, towerListItem.y);
      this.context.fillRect(
        towerListItem.x,
        towerListItem.y,
        towerListItem.width,
        towerListItem.height
      );
    }
  }

  private createTowerListItems() {
    this.towers.push({
      x: 30,
      y: 630,
      width: 128,
      height: 128,
      fill: 'rgba(0, 0, 0, 0)',
      imageSrc: './game/assets/towers/stone/tower.png',
      isDragging: false,
      type: TowersList.STONE,
    });
    this.towers.push({
      x: 170,
      y: 630,
      width: 128,
      height: 128,
      fill: 'rgba(0, 0, 0, 0)',
      isDragging: false,
      imageSrc: './game/assets/towers/archer/tower.png',
      type: TowersList.ARCHER,
    });
  }

  private draw() {
    const { context, canvas } = this;

    if (context) {
      const img = new Image();
      img.src = './game/assets/interface/table/table_down.png';
      context.drawImage(img, -70, canvas.height, canvas.width, 70);
    }

    for (let i = 0; i < this.towers.length; i++) {
      this.rect(this.towers[i]);
    }
  }
}
