import { drawRoundedRect } from './utils/drawRoundedRect';
export class Resources {
  private readonly pathToSprites = './game/assets/resources';
  private context: CanvasRenderingContext2D;

  constructor(
    protected readonly canvas: HTMLCanvasElement,
    private resources: {
      hearts: number;
      coins: number;
      points: number;
    } = {
      hearts: 0,
      coins: 0,
      points: 0,
    }
  ) {
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public setValue(key: 'coins' | 'points' | 'hearts', value: number) {
    this.resources[key] = value;
  }

  public getValue(key: 'coins' | 'points' | 'hearts') {
    return this.resources[key];
  }

  private drawResource(
    context: CanvasRenderingContext2D,
    image: string,
    value: number,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    const img = new Image();
    img.src = `${this.pathToSprites}/${image}`;

    context.drawImage(img, x, y, w, h);

    const textOffesetX = context.measureText(`${value}`).width;
    const textLength = String(value).length;

    const offsetX = textLength === 1 ? x + textOffesetX / 2 : x - textLength * (textLength - 1);

    context.font = `${h}px IMPACT`;
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    context.strokeText(`${value}`, offsetX, y + img.height + h + y);

    context.font = `${h}px IMPACT`;
    context.fillStyle = 'white';
    context.fillText(`${value}`, offsetX, y + img.height + h + y);
  }

  private draw() {
    const { canvas, context, resources } = this;

    const resourseFieldHeight = canvas.height * 0.1;
    const resourseFieldWidth = canvas.width * 0.3;
    const resourseFieldOffsetX = canvas.width / 2 - resourseFieldWidth / 2;
    const resourseFieldOffsetY = 5;

    // плашка с ресурсами
    context.fillStyle = '#00000054';
    context.fill(
      new Path2D(
        drawRoundedRect(
          resourseFieldOffsetX,
          resourseFieldOffsetY,
          resourseFieldWidth,
          resourseFieldHeight - resourseFieldOffsetY,
          [8]
        )
      )
    );

    const resourceSize = 25;
    const resourceWidth = resourseFieldWidth / Object.keys(resources).length;
    const resourceOffetX = resourseFieldOffsetX;
    const resourceOffetY = resourseFieldOffsetY + 5;

    let i = resourceWidth / 2 - resourceSize / 2;

    for (const [key, value] of Object.entries(resources)) {
      this.drawResource(
        context,
        `${key}.png`,
        value,
        resourceOffetX + i,
        resourceOffetY,
        resourceSize,
        resourceSize
      );
      i += resourceWidth;
    }
  }

  public update() {
    this.draw();
  }
}
