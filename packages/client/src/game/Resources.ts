export class Resource {
  private readonly image: HTMLImageElement = new Image();
  private readonly pathToSprites = './game/assets/resources/';

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public readonly position = { x: 0, y: 0 },
    private count: number,
    private readonly src: string
  ) {
    this.image.src = `${this.pathToSprites}${this.src}`;
  }

  public setCount(value: number) {
    this.count = value;
  }

  public getCount() {
    return this.count;
  }

  private draw() {
    const { context, position, count, image } = this;

    context.drawImage(image, position.x, position.y + 10);
    context.font = '25px IMPACT';
    context.strokeText(`${count}`, position.x + image.width + 5, image.height + 8);
    context.font = '25px IMPACT';
    context.fillStyle = 'white';
    context.fillText(`${count}`, position.x + image.width + 5, image.height + 8);
  }

  public update() {
    this.draw();
  }
}
