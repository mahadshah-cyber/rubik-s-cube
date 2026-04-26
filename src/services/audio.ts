import { Howl } from 'howler';

const sounds = {
  click: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'] }),
  solve: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'] }),
  scramble: new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'] }),
};

export const playSound = (name: keyof typeof sounds) => {
  sounds[name].play();
};
