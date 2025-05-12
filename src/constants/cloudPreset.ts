export const CLOUND_PRESET = {
  AUDIO: 'audios',
  IMAGE: 'images',
};

export type CloudPresets = (typeof CLOUND_PRESET)[keyof typeof CLOUND_PRESET];
