export class Interface {
  private readonly pathToButtons = './game/assets/interface';
  private context: CanvasRenderingContext2D;

  constructor(protected readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private draw() {
    const { context, canvas } = this;

    const btnFullscreen = new Image();
    btnFullscreen.src = `${this.pathToButtons}/buttons/button_fullscreen.png`;
    const btnMenu = new Image();
    btnMenu.src = `${this.pathToButtons}/buttons/button_menu.png`;
    const btnPause = new Image();
    btnPause.src = `${this.pathToButtons}/buttons/button_pause.png`;
    const btnQuick = new Image();
    btnQuick.src = `${this.pathToButtons}/buttons/button_quick.png`;
    const btnSound = new Image();
    btnSound.src = `${this.pathToButtons}/buttons/button_sound.png`;
    const btnSoundOff = new Image();
    btnSoundOff.src = `${this.pathToButtons}/buttons/button_sound.png`;

    const offsetX = 5;
    const offsetY = 5;
    const btnSize = canvas.height * 0.1;

    // верхний ряд кнопок
    context.drawImage(btnFullscreen, offsetX, offsetY, btnSize, btnSize);
    context.drawImage(btnMenu, canvas.width - offsetX - btnSize, offsetY, btnSize, btnSize);

    // нижний ряд кнопок
    context.drawImage(btnPause, offsetX, canvas.height - offsetY - btnSize, btnSize, btnSize);
    context.drawImage(
      btnQuick,
      offsetX + offsetX + btnSize,
      canvas.height - offsetY - btnSize,
      btnSize,
      btnSize
    );

    context.drawImage(
      btnSound,
      canvas.width - offsetX - btnSize,
      canvas.height - offsetY - btnSize,
      btnSize,
      btnSize
    );
  }

  public update() {
    this.draw();
  }
}
