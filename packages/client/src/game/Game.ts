import { TGameSettings } from '@typings/app.typings';

import { Building } from './Bulding';
import { Enemy } from './Enemy';
import { PlacementTile } from './PlacementTile';
const mapsSettings = import.meta.glob(`../../public/game/maps/*.json`);

export class Game {
  private context: CanvasRenderingContext2D | null;

  private cursor: { x: number; y: number } = { x: 0, y: 0 };

  private settings: TGameSettings | undefined;
  private imageSrc: string | undefined;
  private placementTiles: PlacementTile[] = [];
  private buildings: Building[] = [];
  private enemies: Enemy[] = [];
  private activeTile: PlacementTile | undefined = undefined;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
  }

  public init(mapName: string) {
    this.addEvents();
    this.getLvlSettings(mapName);
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
        if (symbol !== 0) {
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

  private handleResize = () => () => {
    console.log('resize');
    //   if ( this.cnv ) {
    //     this.canvas.width = window.innerWidth;
    //     this.cnv.height = window.innerHeight;
    //     this.resize();
    // }
  };

  private handleMouseMove = (event: MouseEvent) => () => {
    const { cursor, placementTiles } = this;

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

    this.activeTile = placementTiles.find((tile) => tile.isCursorInTileBorders(cursor));
  };

  private handleClick = () => () => {
    console.log('click');
  };

  private addEvents() {
    const { canvas } = this;

    canvas.addEventListener('resize', this.handleResize);
    canvas.addEventListener('mousemove', this.handleMouseMove);
    canvas.addEventListener('click', this.handleClick);
  }

  public removeAllEvents() {
    const { canvas } = this;

    canvas.removeEventListener('resize', this.handleResize);
    canvas.removeEventListener('mousemove', this.handleMouseMove);
    canvas.removeEventListener('click', this.handleClick);
  }

  private async getLvlSettings(mapName: string) {
    const path = <string>Object.keys(mapsSettings).find((path) => {
      const position = path.lastIndexOf('/') + 1;
      const filename = path.substring(position);

      return filename === `settings-${mapName}.json`;
    });

    const settings = await mapsSettings[path]();

    this.settings = <TGameSettings>JSON.parse(JSON.stringify(settings));
    this.imageSrc = `./game/maps/background-${mapName}.png`;
  }
}
