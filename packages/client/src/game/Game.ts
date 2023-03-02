import { TGameSettings } from '../../typings/app.typings';

export class Game {
  private readonly pathToMap = '../../public/game/maps/';
  private readonly imageSrc: string;
  private readonly settingsSrc: string;
  private context: CanvasRenderingContext2D | null;
  private settings: TGameSettings | null = null;

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
      const { canvas, imageSrc } = this;
      const { tileSize, width, height } = settings;

      canvas.width = width * tileSize;
      canvas.height = height * tileSize;

      this.loadBackground(imageSrc).then((img) => {
        const animate = () => {
          requestAnimationFrame(animate);

          context.drawImage(img, 0, 0);
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
}
