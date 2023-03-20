import { PlacementTile } from './PlacementTile';
import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { Resource } from './Resources';
import { Menu } from './Menu';
import { EnemyType, TGameSettings, TowerType, TowerListItemType } from '../../typings/app.typings';

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

  private towers: TowerListItemType[] = [];
  private dragok = false;
  private towerType: number | null = null;
  private startX: number | undefined;
  private startY: number | undefined;

  handleMouseMoveEvent = (event: MouseEvent) => this.handleMouseMove(event);
  handleClickEvent = (coins: Resource) => () => this.handleClick(coins);
  myUpEvent = () => this.myUp();
  myDownEvent = () => this.myDown();

  constructor(private readonly canvas: HTMLCanvasElement, private readonly mapName: string) {
    this.context = this.canvas.getContext('2d');
    this.imageSrc = `${this.pathToMap}${this.mapName}/background.png`;
    this.settingsSrc = `${this.pathToMap}${this.mapName}/settings.ts`;
  }

  private async init() {
    const { settings } = await import(
      /* @vite-ignore */
      this.settingsSrc
    );
    this.settings = settings;
  }

  public async start() {
    await this.init();
    this.createTowerListItems();
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

        canvas.addEventListener('mousemove', this.handleMouseMoveEvent);
        canvas.addEventListener('click', this.handleClickEvent(coins));
        canvas.addEventListener('mouseup', this.myUpEvent);
        canvas.addEventListener('mousedown', this.myDownEvent);

        return new Promise<number>((resolve) => {
          const animate = () => {
            const animationId = requestAnimationFrame(animate);

            context.drawImage(img, 0, 0);

            this.draw();

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

  public removeAllEvents() {
    const { canvas } = this;

    canvas.removeEventListener('mousemove', this.handleMouseMoveEvent);
    canvas.removeEventListener('click', this.handleClickEvent as unknown as () => void);
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
    } else {
      // если фулл скрин убран
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

  private handleClick(coins: Resource) {
    const { activeTile, buildings, context, settings } = this;
    const { tileSize } = <TGameSettings>settings;

    if (activeTile && !activeTile.isOccupied && coins.getCount() >= 25 && this.towerType !== null) {
      coins.setCount(coins.getCount() - 25);

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
    const output = [];
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
      imageSrc: '../../public/game/assets/towers/stone/tower.png',
      isDragging: false,
      type: TowerType.STONE,
    });
    this.towers.push({
      x: 170,
      y: 630,
      width: 128,
      height: 128,
      fill: 'rgba(0, 0, 0, 0)',
      isDragging: false,
      imageSrc: '../../public/game/assets/towers/archer/tower.png',
      type: TowerType.ARCHER,
    });
  }

  private draw() {
    const { context } = this;

    if (context) {
      const img = new Image();
      img.src = '../../public/game/assets/interface-game/table_down.png';
      context.drawImage(img, -70, 650);
    }

    for (let i = 0; i < this.towers.length; i++) {
      this.rect(this.towers[i]);
    }
  }
}
