import { STORAGE_KEY, STATS_KEY, THEME_KEY, TileState } from './constants';
import type { GameState } from './game-logic';
import type { Statistics } from './statistics';
import { getTodayString } from './daily-word';

export interface StoredTile {
  char: string;
  state: TileState;
}

export interface StoredGameState {
  state: GameState;
  evaluatedGuesses: StoredTile[][];
}

/**
 * Save game state to localStorage
 */
export function saveGameState(state: GameState, evaluatedGuesses: StoredTile[][]): void {
  try {
    const data: StoredGameState = { state, evaluatedGuesses };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

/**
 * Load game state from localStorage
 * Returns null if no saved state or if it's from a different day
 */
export function loadGameState(): StoredGameState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed: StoredGameState = JSON.parse(data);

    if (parsed.state.dateString !== getTodayString()) {
      return null;
    }

    return parsed;
  } catch (e) {
    console.error('Failed to load game state:', e);
    return null;
  }
}

/**
 * Clear saved game state
 */
export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear game state:', e);
  }
}

/**
 * Save statistics to localStorage
 */
export function saveStatistics(stats: Statistics): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save statistics:', e);
  }
}

/**
 * Load statistics from localStorage
 */
export function loadStatistics(): Statistics | null {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load statistics:', e);
    return null;
  }
}

/**
 * Get or initialize theme preference
 */
export function getThemePreference(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

/**
 * Save theme preference
 */
export function saveThemePreference(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    console.error('Failed to save theme:', e);
  }
}
