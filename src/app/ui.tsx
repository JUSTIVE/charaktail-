import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

/** Stagger index for morphing-sheet's arrival choreography. */
export const seq = (index: number): CSSProperties => ({ '--ms-item-index': index }) as CSSProperties

export function Button({
  variant = 'secondary',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const cls =
    variant === 'primary'
      ? 'border-transparent bg-ink text-night shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_8px_24px_-8px_rgb(110_86_207/0.7)]'
      : variant === 'ghost'
        ? 'border-transparent text-muted hover:bg-white/5 hover:text-ink'
        : 'border-line bg-white/[0.04] text-ink hover:border-faint'
  return (
    <button
      type="button"
      {...rest}
      className={`press inline-flex items-center justify-center gap-1.5 rounded-[14px] border px-4 py-2.5 text-[14px] font-semibold disabled:opacity-35 ${cls} ${className}`}
    />
  )
}

export function Dot({ color, size = 10 }: { color: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: color, boxShadow: `0 0 12px ${color}` }}
    />
  )
}

export function Swatches({ colors }: { colors: readonly string[] }) {
  if (colors.length === 0) return null
  return (
    <span className="inline-flex -space-x-1.5">
      {colors.map((hex, i) => (
        <span key={i} className="size-5 rounded-full border-2 border-[var(--ms-surface)]" style={{ background: hex }} />
      ))}
    </span>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}
