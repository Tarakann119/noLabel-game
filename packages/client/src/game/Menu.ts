export class Menu {
  private readonly image: HTMLImageElement = new Image();
  private readonly menuImg = './game/assets/menu/background.png';
  private center: { x: number; y: number } = { x: 0, y: 0 };
  private points = 0;
  private text = '';

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    private readonly position = { x: 0, y: 0 }
  ) {
    this.image.src = `${this.menuImg}`;
  }

  public setText(value: string) {
    this.text = value;
  }

  public setPoints(value: number) {
    this.points = value;
  }

  private draw() {
    const { context, text, image, points, position } = this;
    let { center } = this;
    center = {
      x: position.x - image.width / 2,
      y: position.y - image.height / 2,
    };

    context.drawImage(image, center.x, center.y);

    context.font = '30px IMPACT';
    context.strokeText(`${text}`, center.x + 90, center.y + 60);
    context.font = '30px IMPACT';
    context.fillStyle = '#edb980';
    context.fillText(`${text}`, center.x + 90, center.y + 60);

    context.font = '28px IMPACT';
    context.strokeText(`Вы набрали`, center.x + 110, center.y + 150);
    context.font = '28px IMPACT';
    context.fillStyle = '#ba5e28';
    context.fillText(`Вы набрали`, center.x + 110, center.y + 150);

    context.font = '40px IMPACT';
    context.strokeText(`${points}`, center.x + 170, center.y + 230);
    context.font = '40px IMPACT';
    context.fillStyle = '#ba5e28';
    context.fillText(`${points}`, center.x + 170, center.y + 230);
  }

  public update() {
    this.draw();
  }
}
