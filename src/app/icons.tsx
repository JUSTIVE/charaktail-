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
export const KebabIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" /></svg>
)
export const TrashIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 7h16" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
)
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
)
export const LockIcon = ({ locked, ...p }: SVGProps<SVGSVGElement> & { locked?: boolean }) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2.5" fill={locked ? 'currentColor' : 'none'} />
    {/* The shackle swings open when unlocked. */}
    <path d={locked ? 'M8 11V8a4 4 0 0 1 8 0v3' : 'M8 11V8a4 4 0 0 1 7.6-1.8'} />
  </svg>
)
