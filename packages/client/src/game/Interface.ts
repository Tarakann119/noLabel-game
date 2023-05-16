/* eslint-disable @typescript-eslint/no-empty-function */
import { GameButtons, TInterfaceButton } from '@typings/app.typings';

export class Interface {
  private readonly pathToButtons = './game/assets/interface';
  private context: CanvasRenderingContext2D;
  private buttons: Record<string, TInterfaceButton> = {
    fullscreen: {},
    fullscreen_off: {},
    pause: {},
    play_circle: {},
    sound: {},
    sound_off: {},
  };
  private sound: {
    volume: number;
    turn_off: boolean;
  };

  constructor(
    protected readonly canvas: HTMLCanvasElement,
    volume: number,
    private pause: boolean,
    private fullscreen: boolean
  ) {
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.sound = {
      volume,
      turn_off: false,
    };

    Object.keys(this.buttons).forEach((name) => {
      const image = new Image();
      image.src = `${this.pathToButtons}/buttons/button_${name}.png`;

      this.buttons[name].img = image;
    });
  }

  private draw() {
    const { context, canvas, buttons } = this;
    const { fullscreen, fullscreen_off, pause, play_circle, sound, sound_off } = buttons;

    const offsetX = 5;
    const offsetY = 5;
    const btnSize = canvas.height * 0.1;

    const bottomInterfaceOffset = canvas.height - offsetY - btnSize;
    const rightInterfaceOffset = canvas.width - offsetX - btnSize;

    const centerX = canvas.width / 2 - btnSize;
    const centerY = canvas.height / 2 - btnSize;

    play_circle.isCursorInButtonBorders = (cursor: { x: number; y: number }) => {
      return (
        cursor.x >= centerX &&
        cursor.x <= centerX + btnSize * 2 &&
        cursor.y >= centerY &&
        cursor.y <= centerY + btnSize * 2
      );
    };

    pause.isCursorInButtonBorders = (cursor: { x: number; y: number }) =>
      cursor.x >= offsetX &&
      cursor.x <= offsetX + btnSize &&
      cursor.y >= bottomInterfaceOffset &&
      cursor.y <= bottomInterfaceOffset + btnSize;

    fullscreen.isCursorInButtonBorders = (cursor: { x: number; y: number }) =>
      cursor.x >= offsetX &&
      cursor.x <= offsetX + btnSize &&
      cursor.y >= offsetY &&
      cursor.y <= offsetY + btnSize;

    sound.isCursorInButtonBorders = (cursor: { x: number; y: number }) =>
      cursor.x >= rightInterfaceOffset &&
      cursor.x <= rightInterfaceOffset + btnSize &&
      cursor.y >= bottomInterfaceOffset &&
      cursor.y <= bottomInterfaceOffset + btnSize;

    if (this.pause) {
      if (play_circle.img) {
        context.globalAlpha = 0.5;
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.fill();

        context.globalAlpha = 1;
        context.drawImage(play_circle.img, centerX, centerY, btnSize * 2, btnSize * 2);
      }
    } else {
      if (pause.img) {
        context.drawImage(pause.img, offsetX, bottomInterfaceOffset, btnSize, btnSize);
      }

      const fullscreenImg = this.fullscreen ? fullscreen_off.img : fullscreen.img;
      if (fullscreenImg) {
        context.drawImage(fullscreenImg, offsetX, offsetY, btnSize, btnSize);
      }

      const soundImg = this.sound.turn_off ? sound_off.img : sound.img;
      if (soundImg) {
        const text = `25px IMPACT`;
        const textColor = 'white';
        const value = this.sound.volume * 100;
        const textOffesetX = context.measureText(`${value}`).width;

        context.font = text;
        context.strokeText(
          `${value}%`,
          rightInterfaceOffset - textOffesetX - 20,
          bottomInterfaceOffset + btnSize - 10
        );

        context.font = text;
        context.fillStyle = textColor;
        context.fillText(
          `${value}%`,
          rightInterfaceOffset - textOffesetX - 20,
          bottomInterfaceOffset + btnSize - 10
        );
        context.drawImage(soundImg, rightInterfaceOffset, bottomInterfaceOffset, btnSize, btnSize);
      }
    }
  }

  public update() {
    this.draw();
  }

  public getClickedButton(cursor: { x: number; y: number }): GameButtons | undefined {
    const { fullscreen, pause, play_circle, sound } = this.buttons;

    if (
      fullscreen.isCursorInButtonBorders &&
      pause.isCursorInButtonBorders &&
      play_circle.isCursorInButtonBorders &&
      sound.isCursorInButtonBorders
    ) {
      switch (true) {
        case play_circle.isCursorInButtonBorders(cursor):
          return GameButtons.PAUSE;
        case pause.isCursorInButtonBorders(cursor):
          return GameButtons.PAUSE;
        case sound.isCursorInButtonBorders(cursor):
          return GameButtons.SOUND;
        case fullscreen.isCursorInButtonBorders(cursor):
          return GameButtons.FULLSCREEN;
      }
    } else {
      return;
    }
  }

  public setSound(volume: number, turn_off = false) {
    this.sound = {
      volume,
      turn_off,
    };
  }

  public setPause(value: boolean) {
    this.pause = value;
  }

  public setFullscreen(value: boolean) {
    this.fullscreen = value;
  }
}
