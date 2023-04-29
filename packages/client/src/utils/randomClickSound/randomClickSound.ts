import Ask from '@/assets/sounds/ask.mp3';
import ClickSound from '@/assets/sounds/orcsound.mp3';
import Say from '@/assets/sounds/say.mp3';
import Smile from '@/assets/sounds/smile.mp3';

let prevSoundNum = 0;

export default function randomClickSound() {
  const soundsList = [ClickSound, Ask, Smile, Say];
  const sound = generateRandomSound(soundsList);
  prevSoundNum = soundsList.indexOf(sound);
  new Audio(sound).play();
}

function generateRandomSound(arr: string[]): string {
  const newSoundsArr = arr.filter(function (el: string) {
    return el !== arr[prevSoundNum];
  });
  const range = newSoundsArr.length;
  const randomNum = Math.floor(Math.random() * range);
  return newSoundsArr[randomNum];
}
