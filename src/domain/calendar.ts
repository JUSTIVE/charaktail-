/*
 * The calendar for `date` attributes: a non-leap year, and the Western star
 * signs by their usual cut-off days.
 */

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/** 0-based day of a non-leap year → month (1–12) and day of month. */
export function dayOfYear(index: number): { month: number; day: number } {
  let rest = ((index % 365) + 365) % 365
  for (let m = 0; m < 12; m++) {
    const days = MONTH_DAYS[m]!
    if (rest < days) return { month: m + 1, day: rest + 1 }
    rest -= days
  }
  return { month: 12, day: 31 }
}

/** [first month, first day, id, label] — each sign runs to the next one's start. */
const SIGNS: [number, number, string, string][] = [
  [1, 20, 'aquarius', '물병자리'],
  [2, 19, 'pisces', '물고기자리'],
  [3, 21, 'aries', '양자리'],
  [4, 20, 'taurus', '황소자리'],
  [5, 21, 'gemini', '쌍둥이자리'],
  [6, 22, 'cancer', '게자리'],
  [7, 23, 'leo', '사자자리'],
  [8, 23, 'virgo', '처녀자리'],
  [9, 23, 'libra', '천칭자리'],
  [10, 23, 'scorpio', '전갈자리'],
  [11, 23, 'sagittarius', '사수자리'],
  [12, 22, 'capricorn', '염소자리'],
]

export function zodiacOf(month: number, day: number): { id: string; label: string } {
  let sign = SIGNS[SIGNS.length - 1]! // 염소자리 wraps past the new year
  for (const candidate of SIGNS) {
    const [m, d] = candidate
    if (month > m || (month === m && day >= d)) sign = candidate
  }
  return { id: sign[2], label: sign[3] }
}

export const ZODIAC_IDS = SIGNS.map((s) => s[2])
