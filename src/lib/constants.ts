export const MAX_ATTEMPTS = 6;
export const GAME_TITLE = "LLMdle";
export const STORAGE_KEY = "llmdle-state";
export const STATS_KEY = "llmdle-stats";
export const THEME_KEY = "llmdle-theme";

export const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '-'],
  ['ENTER', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'BACKSPACE'],
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
];

export enum TileState {
  EMPTY = 'empty',
  FILLED = 'filled',
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}

export enum GameStatus {
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

export const WIN_MESSAGES = [
  'Genius!',
  'Magnificent!',
  'Impressive!',
  'Splendid!',
  'Great!',
  'Phew!'
];
