import type { SVGProps } from 'react'

const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const ShuffleIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M3 17h3.5a4 4 0 0 0 3.2-1.6l4.6-6.8A4 4 0 0 1 17.5 7H21" /><path d="m18 4 3 3-3 3" /><path d="M3 7h3.5a4 4 0 0 1 3 1.4" /><path d="M14.5 15.6a4 4 0 0 0 3 1.4H21" /><path d="m18 14 3 3-3 3" /></svg>
)
export const StarIcon = ({ filled, ...p }: SVGProps<SVGSVGElement> & { filled?: boolean }) => (
  <svg {...base} fill={filled ? 'currentColor' : 'none'} {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>
)
export const ShareIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 3v12" /><path d="m7 8 5-5 5 5" /><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></svg>
)
export const BackIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="m15 18-6-6 6-6" /></svg>
)
export const ArchiveIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="3" y="4" width="18" height="5" rx="1.5" /><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" /><path d="M10 13h4" /></svg>
)
export const ShakeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M3 8v8" /><path d="M21 8v8" /><path d="M11 18h2" /></svg>
)
