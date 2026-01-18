import { GameStatus, MAX_ATTEMPTS } from './constants';
import { getTodayString } from './daily-word';

export interface Statistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastPlayedDate: string;
  lastWonDate: string;
}

/**
 * Create empty statistics
 */
export function createEmptyStats(): Statistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    lastPlayedDate: '',
    lastWonDate: '',
  };
}

/**
 * Calculate win rate as percentage
 */
export function getWinRate(stats: Statistics): number {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.gamesWon / stats.gamesPlayed) * 100);
}

/**
 * Check if dates are consecutive (for streak calculation)
 */
function areDatesConsecutive(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

/**
 * Update statistics after a game ends
 */
export function updateStatistics(
  stats: Statistics,
  status: GameStatus,
  numGuesses: number
): Statistics {
  const today = getTodayString();

  if (stats.lastPlayedDate === today) {
    return stats;
  }

  const newStats = { ...stats };
  newStats.gamesPlayed++;
  newStats.lastPlayedDate = today;

  if (status === GameStatus.WON) {
    newStats.gamesWon++;
    newStats.guessDistribution[numGuesses - 1]!++;

    if (stats.lastWonDate && areDatesConsecutive(stats.lastWonDate, today)) {
      newStats.currentStreak++;
    } else {
      newStats.currentStreak = 1;
    }

    newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
    newStats.lastWonDate = today;
  } else {
    newStats.currentStreak = 0;
  }

  return newStats;
}

/**
 * Generate share text for the game result
 */
export function generateShareText(
  puzzleNumber: number,
  guesses: Array<Array<{ char: string; state: string }>>,
  won: boolean,
  maxAttempts: number = MAX_ATTEMPTS
): string {
  const title = `LLMdle #${puzzleNumber}`;
  const score = won ? `${guesses.length}/${maxAttempts}` : `X/${maxAttempts}`;

  const grid = guesses.map(row =>
    row.map(tile => {
      switch (tile.state) {
        case 'correct': return '\u{1F7E9}';
        case 'present': return '\u{1F7E8}';
        default: return '\u2B1B';
      }
    }).join('')
  ).join('\n');

  return `${title} ${score}\n\n${grid}\n\nhttps://llmdle.com`;
}
