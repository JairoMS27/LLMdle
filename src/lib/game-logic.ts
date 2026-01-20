import { TileState, GameStatus, MAX_ATTEMPTS } from './constants';
import { VALID_CHARS } from './models';
import { getDailyWord, getTodayString } from './daily-word';

export interface TileResult {
  char: string;
  state: TileState;
}

export interface GuessResult {
  tiles: TileResult[];
  isValid: boolean;
  isWin: boolean;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  status: GameStatus;
  dateString: string;
}

/**
 * Evaluate a guess against the target word
 * Implements proper duplicate character handling:
 * 1. First pass: Mark all exact matches (green)
 * 2. Second pass: Mark present letters (yellow) respecting remaining counts
 */
export function evaluateGuess(guess: string, target: string): TileResult[] {
  const guessChars = guess.toLowerCase().split('');
  const targetChars = target.toLowerCase().split('');

  const remainingCounts: Record<string, number> = {};
  for (const char of targetChars) {
    remainingCounts[char] = (remainingCounts[char] || 0) + 1;
  }

  const results: TileResult[] = guessChars.map(char => ({
    char,
    state: TileState.ABSENT,
  }));

  // First pass: Mark exact matches (CORRECT/green)
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === targetChars[i]) {
      results[i]!.state = TileState.CORRECT;
      remainingCounts[guessChars[i]!]!--;
    }
  }

  // Second pass: Mark present but wrong position (PRESENT/yellow)
  for (let i = 0; i < guessChars.length; i++) {
    if (results[i]!.state === TileState.CORRECT) continue;

    const char = guessChars[i]!;
    if (remainingCounts[char] && remainingCounts[char]! > 0) {
      results[i]!.state = TileState.PRESENT;
      remainingCounts[char]!--;
    }
  }

  return results;
}

/**
 * Check if a character is valid for the game
 */
export function isValidChar(char: string): boolean {
  return VALID_CHARS.has(char.toLowerCase());
}

/**
 * Add a character to the current guess
 */
export function addCharToGuess(state: GameState, char: string): GameState {
  if (state.status !== GameStatus.PLAYING) return state;
  if (state.currentGuess.length >= state.targetWord.length) return state;
  if (!isValidChar(char)) return state;

  return {
    ...state,
    currentGuess: state.currentGuess + char.toLowerCase(),
  };
}

/**
 * Remove the last character from the current guess
 */
export function removeCharFromGuess(state: GameState): GameState {
  if (state.status !== GameStatus.PLAYING) return state;
  if (state.currentGuess.length === 0) return state;

  return {
    ...state,
    currentGuess: state.currentGuess.slice(0, -1),
  };
}

/**
 * Submit the current guess
 */
export function submitGuess(state: GameState): {
  state: GameState;
  result: GuessResult | null;
  error?: string;
} {
  if (state.status !== GameStatus.PLAYING) {
    return { state, result: null, error: 'Game is over' };
  }

  const guess = state.currentGuess.toLowerCase();

  if (guess.length !== state.targetWord.length) {
    return {
      state,
      result: null,
      error: `Guess must be ${state.targetWord.length} characters`
    };
  }

  const tiles = evaluateGuess(guess, state.targetWord);
  const isWin = guess === state.targetWord.toLowerCase();

  const newGuesses = [...state.guesses, guess];
  const isGameOver = isWin || newGuesses.length >= MAX_ATTEMPTS;

  const newState: GameState = {
    ...state,
    guesses: newGuesses,
    currentGuess: '',
    status: isWin
      ? GameStatus.WON
      : (isGameOver ? GameStatus.LOST : GameStatus.PLAYING),
  };

  return {
    state: newState,
    result: {
      tiles,
      isValid: true,
      isWin,
    },
  };
}

/**
 * Create a new game state for today
 */
export function createNewGame(dateString?: string): GameState {
  const date = dateString || getTodayString();
  return {
    targetWord: getDailyWord(date),
    guesses: [],
    currentGuess: '',
    status: GameStatus.PLAYING,
    dateString: date,
  };
}

/**
 * Get keyboard key states based on all guesses
 */
export function getKeyboardStates(
  guesses: string[],
  targetWord: string
): Record<string, TileState> {
  const states: Record<string, TileState> = {};

  for (const guess of guesses) {
    const results = evaluateGuess(guess, targetWord);
    for (const { char, state } of results) {
      const currentState = states[char];

      if (state === TileState.CORRECT) {
        states[char] = TileState.CORRECT;
      } else if (state === TileState.PRESENT && currentState !== TileState.CORRECT) {
        states[char] = TileState.PRESENT;
      } else if (!currentState) {
        states[char] = state;
      }
    }
  }

  return states;
}
