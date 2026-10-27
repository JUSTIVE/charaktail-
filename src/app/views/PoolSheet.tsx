import { useSheetStack } from 'morphing-sheet/react'

import { Button, seq } from '../ui'

/**
 * What else this attribute could have been, given the rest of the roll — the
 * catalogue's conditions made visible. Swap 세계관 and this list changes.
 */
export function PoolSheet({
  color,
  value,
  detail,
  possible,
}: {
  color: string
  value: string
  detail: string | null
  possible: readonly string[]
}) {
  const sheet = useSheetStack()
  return (
    <div className="space-y-4">
      <p className="ms-seq text-[13px] text-muted" style={seq(0)}>
        이 조합에서 나올 수 있었던 값들이에요.
      </p>
      <ul className="ms-seq flex flex-wrap gap-1.5" style={seq(1)}>
        {possible.map((label) => {
          const hit = value.split(' · ').includes(label) || label === detail
          return (
            <li
              key={label}
              data-hit={hit || undefined}
              className="rounded-full border border-line px-3 py-1.5 text-[12.5px] text-muted data-[hit]:font-bold data-[hit]:text-night"
              style={hit ? { background: color, borderColor: color } : undefined}
            >
              {label}
            </li>
          )
        })}
      </ul>
      <div className="ms-seq flex justify-end" style={seq(2)}>
        <Button onClick={() => void sheet.pop()}>닫기</Button>
      </div>
    </div>
  )
}
