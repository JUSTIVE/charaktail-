import type { SVGProps } from 'react'

/*
 * 머리 스타일, drawn: hair only, no face — the head is implied by where the
 * hair stops. One 48×48 line drawing per style, keyed by value id; a style
 * the player adds has none and keeps the plain dot.
 */

const CROWN = 'M13 24 C11 8 37 8 35 24'
const PART = 'M24 10 C22 14 18 17 15 19 M24 10 C26 14 30 17 33 19'
const ring = (cx: number, cy: number, r: number) => `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`

const ART: Record<string, { d: string[]; dashed?: boolean }> = {
  숏컷: { d: ['M13.5 26 C11 8 37 8 34.5 26', 'M13.5 26 Q14 28 15.5 28 M34.5 26 Q34 28 32.5 28', 'M15 17 Q19 21 22 17.5 Q26 21.5 30 17.5 Q32 19 33.5 18'] },
  단발: { d: [CROWN, 'M13 24 C12 29 12.5 32 14 34 Q16 35.5 18 34', 'M35 24 C36 29 35.5 32 34 34 Q32 35.5 30 34', 'M15 19 C20 21 28 21 33 19'] },
  중단발: {
    d: [CROWN, 'M13 24 C12 31 12 36 10 40', 'M35 24 C36 31 36 36 38 40', 'M15 18 Q20 22 24 18 Q28 22 33 18', 'M16 30 C16 34 15 37 14 39 M32 30 C32 34 33 37 34 39'],
  },
  장발: { d: [CROWN, PART, 'M13 24 C11 33 11 40 12 46', 'M35 24 C37 33 37 40 36 46', 'M17 29 C17 36 16 41 17 46 M31 29 C31 36 32 41 31 46'] },
  포니테일: { d: ['M13 25 C11 8 37 8 35 25', 'M15 18 C20 15 28 15 33 18', ring(35.3, 13, 1.8), 'M37 13 C44 16 44 28 40 38 C39 41 37 42 36 41', 'M37.5 16 C41 21 41 30 38 37'] },
  트윈테일: {
    d: [
      'M13 25 C11 8 37 8 35 25',
      PART,
      ring(12, 16, 1.6),
      ring(36, 16, 1.6),
      'M11 17.5 C5 22 5 34 9 42 M12.5 18 C9 24 9 33 11 40',
      'M37 17.5 C43 22 43 34 39 42 M35.5 18 C39 24 39 33 37 40',
    ],
  },
  '땋은 머리': {
    d: [CROWN, PART, 'M13 24 C12 28 12 30 13.5 31', 'M35 24 C36 28 35 31 33 32', 'M13.5 31 q3 2 0 4 q-3 2 0 4 q3 2 0 4 q-3 2 0 4', 'M13.5 31 q-3 2 0 4 q3 2 0 4 q-3 2 0 4 q3 2 0 4'],
  },
  올림머리: { d: ['M13 25 C11 10 37 10 35 25', ring(24, 11, 4.5), 'M22 10 q2 -2 4 0 q1 2 -1 3', 'M15 21 C19 18 21 17.5 21 17.5 M33 21 C29 18 27 17.5 27 17.5'] },
  반묶음: {
    d: [CROWN, ring(32.5, 9.5, 2.5), 'M14 17 C20 12 26 10 30 10', 'M13 24 C11 33 11 40 12 46', 'M35 24 C37 33 37 40 36 46', 'M34.5 11.5 C38 16 38 22 36 27'],
  },
  울프컷: {
    d: [CROWN, 'M13 24 L11 28 L14 27 L12 32 L15 30 L14 35', 'M35 24 L37 28 L34 27 L36 32 L33 30 L34 35', 'M15 16 L17 21 L19 17 L22 22 L24 17 L27 21 L29 17 L32 20 L33 17'],
  },
  히메컷: { d: [CROWN, 'M13 24 C12 33 12 40 12 46', 'M35 24 C36 33 36 40 36 46', 'M14.5 19 L33.5 19', 'M15.5 19 L15.5 31 L18 31 M32.5 19 L32.5 31 L30 31'] },
  곱슬머리: {
    d: [
      'M13 26 q-3 -3 0 -6 q-2 -4 2 -6 q0 -4 4 -4 q2 -3 5 -1 q3 -2 5 1 q4 0 4 4 q4 2 2 6 q3 3 0 6',
      'M17 21 q2 -2 3 0 M23 20 q2 -2 3 0 M29 21 q2 -2 3 0',
      'M13 26 q-2 3 1 5 q-2 3 1 5 M35 26 q2 3 -1 5 q2 3 -1 5',
    ],
  },
  웨이브: { d: [CROWN, PART, 'M13 24 c-2 4 2 6 0 10 c-2 4 2 6 0 10', 'M35 24 c2 4 -2 6 0 10 c2 4 -2 6 0 10', 'M17 28 c-2 4 2 6 0 10 c-1 3 1 5 0 7 M31 28 c2 4 -2 6 0 10 c1 3 -1 5 0 7'] },
  버즈컷: { d: ['M14 23 C13 10 35 10 34 23', 'M15 20 C20 18 28 18 33 20'], dashed: true },
  '눈을 가리는 앞머리': {
    d: [CROWN, 'M13 24 C12 29 12 32 13 34 M35 24 C36 29 36 32 35 34', 'M14 18 C14 24 15 27 17 28', 'M17 15 C18 22 20 26 22 28', 'M22 14 C23 21 25 25 28 27', 'M27 14 C29 20 31 24 33 25'],
  },
  '삐친 머리 한 가닥': { d: ['M13.5 26 C11 8 37 8 34.5 26', 'M15 17 Q19 21 22 17.5 Q26 21.5 30 17.5 Q32 19 33.5 18', 'M24 10 C23 5 27 3 29 5 C30 7 27 8 26 6'] },
}

export function hasHairArt(id: string): boolean {
  return id in ART
}

export function HairArt({ id, ...props }: SVGProps<SVGSVGElement> & { id: string }) {
  const art = ART[id]
  if (!art) return null
  return (
    <svg viewBox="0 0 48 48" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      {art.d.map((d) => (
        <path key={d} d={d} strokeDasharray={art.dashed ? '0.1 2.6' : undefined} strokeWidth={art.dashed ? 2.2 : undefined} />
      ))}
    </svg>
  )
}
