import { ALL_MODELS } from './models';

/**
 * Mulberry32 PRNG - a simple, fast seeded random number generator
 * Returns a function that generates numbers between 0 and 1
 */
function mulberry32(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Convert a date string to a numeric seed
 */
function dateToSeed(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get the daily word for a specific date
 * Ensures everyone gets the same word on the same day
 */
export function getDailyWord(dateString: string = getTodayString()): string {
  const seed = dateToSeed(dateString);
  const rng = mulberry32(seed);
  const index = Math.floor(rng() * ALL_MODELS.length);
  return ALL_MODELS[index]!;
}

/**
 * Get the word length for today's puzzle
 */
export function getTodayWordLength(): number {
  return getDailyWord().length;
}

/**
 * Calculate the puzzle number (days since game launch)
 */
export function getPuzzleNumber(startDate: string = '2026-01-01'): number {
  const start = new Date(startDate);
  const today = new Date(getTodayString());
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
