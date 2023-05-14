export class PlacementTile {
  private color = 'rgba(255, 255, 255, 0.15)';
  public isOccupied = false;

  constructor(
    private readonly context: CanvasRenderingContext2D,
    public readonly position: { x: number; y: number } = { x: 0, y: 0 },
    protected readonly tileSize: { height: number; width: number }
  ) {}

  private draw() {
    const { context, color, position, tileSize } = this;

    context.fillStyle = color;
    context.fillRect(position.x, position.y, tileSize.width, tileSize.height);
  }

  public isCursorInTileBorders(cursor: { x: number; y: number }) {
    const { position, tileSize } = this;

    return (
      cursor.x > position.x &&
      cursor.x < position.x + tileSize.width * 1.5 &&
      cursor.y > position.y &&
      cursor.y < position.y + tileSize.height * 1.5
    );
  }

  public update(cursor: { x: number; y: number }) {
    this.draw();

    if (this.isCursorInTileBorders(cursor)) {
      this.color = 'rgba(255, 255, 255, 0.25)';
    } else {
      this.color = 'rgba(0, 0, 0, 0.1)';
    }
  }
}
