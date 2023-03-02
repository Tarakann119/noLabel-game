import { Sprite } from './Sprite';
import { TBuildingSettings, TowerType } from '../../typings/app.typings';
import { settings } from './settings/buldings';

export class Building extends Sprite {
  public readonly settings: TBuildingSettings;
  public center: { x: number; y: number };

  constructor(
    protected readonly context: CanvasRenderingContext2D,
    public position: { x: number; y: number } = { x: 0, y: 0 },
    private towerType: TowerType,
    private readonly tileSize: number
  ) {
    super(
      context,
      position,
      settings[towerType].imageSrc,
      { x: 0, y: -80 },
      19,
      settings[towerType].delay
    );

    this.settings = settings[this.towerType];
    this.center = {
      x: this.position.x + this.tileSize / 2,
      y: this.position.y + this.tileSize / 2,
    };
  }

  protected draw() {
    const { context, settings, center } = this;
    context.beginPath();
    context.arc(center.x, center.y, settings.radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 255, 0.2)';
    context.fill();

    super.draw();
  }

  public update() {
    this.draw();
  }
}
