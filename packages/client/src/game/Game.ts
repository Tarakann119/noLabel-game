import { PlacementTile } from './PlacementTile';
import { TGameSettings, TowerType } from '../../typings/app.typings';
import { Building } from './Bulding';

export class Game {
  private readonly pathToMap = '../../public/game/maps/';
  private readonly imageSrc: string;
  private readonly settingsSrc: string;
  private context: CanvasRenderingContext2D | null;
  private settings: TGameSettings | null = null;

  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];

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
      const { canvas, imageSrc, placementTiles, buildings } = this;
      const { tileSize, width, height } = settings;

      canvas.width = width * tileSize;
      canvas.height = height * tileSize;

      const cursor: { x: number; y: number } = { x: 0, y: 0 };
      let activeTile: PlacementTile | undefined = undefined;

      canvas.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX;
        cursor.y = event.clientY;

        activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
      });

      canvas.addEventListener('click', () => {
        if (activeTile && !activeTile.isOccupied) {
          buildings.push(
            new Building(
              context,
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
      });

      this.createPlacementTiles();

      this.loadBackground(imageSrc).then((img) => {
        const animate = () => {
          requestAnimationFrame(animate);

          context.drawImage(img, 0, 0);

          placementTiles.forEach((tile) => {
            tile.update(cursor);
          });

          buildings.forEach((building) => {
            building.update();
          });
        };

        animate();
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
}
