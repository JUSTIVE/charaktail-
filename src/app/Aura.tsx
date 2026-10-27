import type { CSSProperties, ReactNode } from 'react'

/** Soft colour blobs on incommensurate loops: drift that never visibly repeats. */
function Blobs({ colors }: { colors: readonly string[] }) {
  const count = Math.max(3, Math.min(colors.length, 6))
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={
            {
              '--c': colors[i % colors.length],
              '--i': i,
              left: `${(i / (count - 1)) * 72 - 6}%`,
            } as CSSProperties
          }
        />
      ))}
    </>
  )
}

/**
 * The selected attributes' colours, drifting like noise around and through a
 * call to action: a blurred halo behind it, and a faint tint inside it.
 * Only transforms animate.
 */
export function Aura({ colors, dim, children }: { colors: readonly string[]; dim?: boolean; children: ReactNode }) {
  if (colors.length === 0) return <>{children}</>
  return (
    <div className="aura-wrap" data-dim={dim || undefined}>
      <div className="aura-halo" aria-hidden>
        <Blobs colors={colors} />
      </div>
      {children}
    </div>
  )
}

/** The same drift, faintly, inside the button itself. */
export function AuraTint({ colors }: { colors: readonly string[] }) {
  if (colors.length === 0) return null
  return (
    <span className="aura-tint" aria-hidden>
      <Blobs colors={colors} />
    </span>
  )
}
