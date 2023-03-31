export class Sprite {
  private readonly image: HTMLImageElement = new Image();
  private readonly pathToSprites = './game/assets/';

  protected frames: {
    max: number;
    current: number;
    elapsed: number;
    hold: number;
  };

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    protected readonly position: { x: number; y: number } = { x: 0, y: 0 },
    private readonly src: string,
    protected readonly offset: { x: number; y: number } = { x: 0, y: 0 },
    private maxFrames: number = 1,
    private holdFrames: number = 3
  ) {
    this.image.src = `${this.pathToSprites}${this.src}`;
    this.frames = {
      max: this.maxFrames,
      current: 0,
      elapsed: 0,
      hold: this.holdFrames,
    };
  }

  protected draw() {
    const { context, image, frames, position, offset } = this;

    const cropWidth = image.width / frames.max;

    const crop = {
      position: {
        x: cropWidth * frames.current + 1,
        y: 0,
      },
      width: cropWidth,
      height: image.height,
    };

    context.drawImage(
      image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      position.x + offset.x,
      position.y + offset.y,
      crop.width,
      crop.height
    );
  }

  protected update() {
    const { frames } = this;

    frames.elapsed += 1;

    if (frames.elapsed % frames.hold === 0) {
      frames.current += 1;
      if (frames.current >= frames.max) {
        frames.current = 0;
      }
    }
  }
}
