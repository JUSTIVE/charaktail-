import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'

import { addOption, removeOption, resetAttribute, setRange, toggleOption } from '../../state/edits'
import { router } from '../../router'
import { BackIcon, PlusIcon, TrashIcon } from '../icons'
import { Button, Dot, seq, Swatches } from '../ui'
import type { ValuesSheetQuery } from '../../__generated__/ValuesSheetQuery.graphql'

/**
 * One attribute's values, editable: switch a value off so it is never drawn,
 * delete it, or add your own. The picker's panel morphs into this view and
 * back (`/?values=…`), and every row is a live field over the edits cell.
 */
const back = () => void router.navigate({ to: '/', search: {} })

export function ValuesSheet({ attributeId }: { attributeId: string }) {
  const [draft, setDraft] = useState('')
  const [hex, setHex] = useState('#6e56cf')
  const [hex2, setHex2] = useState('#29a383')
  const [twoTone, setTwoTone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const data = useLocalQuery<ValuesSheetQuery>(
    graphql`
      query ValuesSheetQuery($id: ID!) {
        attribute(id: $id) {
          key
          label
          color
          kind
          editable
          edited
          summary
          rangeMin
          rangeMax
          unit
          hasCases
          options {
            key
            label
            enabled
            custom
            swatches
          }
        }
      }
    `,
    { id: attributeId },
  )
  const attribute = data.attribute
  if (!attribute) {
    return (
      <div data-stage-floor className="space-y-3 text-center">
        <p className="headline">없는 속성이에요</p>
        <Button onClick={back}>돌아가기</Button>
      </div>
    )
  }

  const options = attribute.options ?? []
  const enabledCount = options.filter((o) => o.enabled).length
  const isColor = attribute.kind === 'color'

  const add = (event: FormEvent) => {
    event.preventDefault()
    const problem = addOption(attributeId, draft, isColor ? hex : undefined, isColor && twoTone ? hex2 : undefined)
    setError(problem)
    if (!problem) setDraft('')
  }

  return (
    <div data-stage-floor className="space-y-3">
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <button type="button" onClick={back} aria-label="속성 목록으로" className="press -ml-2 grid size-9 shrink-0 place-items-center rounded-full text-muted hover:text-ink">
          <BackIcon />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="display flex items-center gap-2">
            <Dot color={attribute.color ?? '#888'} size={10} />
            {attribute.label}
          </h2>
          <p className="text-[12.5px] text-muted">{attribute.summary}</p>
        </div>
        {attribute.edited ? (
          <Button variant="ghost" className="px-2.5 py-1.5 text-[12.5px]" onClick={() => resetAttribute(attributeId)}>
            기본값으로
          </Button>
        ) : null}
      </div>

      {!attribute.editable ? (
        <RangeEditor
          attributeId={attributeId}
          min={attribute.rangeMin ?? 0}
          max={attribute.rangeMax ?? 0}
          unit={attribute.unit ?? ''}
          note={attribute.hasCases ? (attribute.edited ? '종족별 범위 대신 이 범위로 뽑아요.' : '지금은 종족마다 범위가 달라요. 입력하면 모두 이 범위로 뽑아요.') : null}
        />
      ) : (
        <>
          <ul className="ms-seq values-list" style={seq(1)}>
            {options.map((option) => {
              const last = !!option.enabled && enabledCount <= 1
              return (
                <li key={option.key} className="values-row" data-off={!option.enabled || undefined}>
                  {(option.swatches?.length ?? 0) > 0 ? (
                    <Swatches colors={option.swatches ?? []} />
                  ) : (
                    <Dot color={attribute.color ?? '#888'} size={7} />
                  )}
                  <span className="min-w-0 flex-1 truncate text-[14px] font-medium">{option.label}</span>
                  {option.custom ? <span className="values-badge">내 값</span> : null}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={option.enabled ?? false}
                    aria-label={`${option.label} ${option.enabled ? '끄기' : '켜기'}`}
                    title={last ? '최소 하나는 켜져 있어야 해요' : undefined}
                    disabled={last}
                    onClick={() => toggleOption(attributeId, option.key ?? '')}
                    className="switch"
                    style={{ '--switch-on': attribute.color } as CSSProperties}
                  >
                    <span />
                  </button>
                  <button
                    type="button"
                    aria-label={`${option.label} 삭제`}
                    disabled={last}
                    onClick={() => removeOption(attributeId, option.key ?? '')}
                    className="press grid size-8 shrink-0 place-items-center rounded-full text-faint hover:bg-white/5 hover:text-ink disabled:opacity-30"
                  >
                    <TrashIcon width={15} height={15} />
                  </button>
                </li>
              )
            })}
          </ul>

          {isColor ? (
            // A second colour for the new value: 오드아이 for eyes, 투톤 otherwise.
            // The whole row is the label, so tapping the words toggles too.
            <label className="ms-seq flex items-center gap-2" style={seq(2)}>
              <button type="button" role="switch" aria-checked={twoTone} onClick={() => setTwoTone((v) => !v)} className="switch" style={{ '--switch-on': attribute.color } as CSSProperties}>
                <span />
              </button>
              <span className="text-[13px] text-muted">{attributeId === 'eyeColor' ? '오드아이 (양쪽 눈 색이 달라요)' : '투톤 (두 가지 색)'}</span>
            </label>
          ) : null}
          <form className="ms-seq flex items-center gap-2" style={seq(2)} onSubmit={add}>
            {isColor ? (
              <span className="flex shrink-0 -space-x-2">
                <label className="color-pick press" style={{ background: hex }} aria-label={twoTone ? '첫 번째 색' : '색 고르기'}>
                  <input type="color" value={hex} onChange={(event) => setHex(event.target.value)} />
                </label>
                {twoTone ? (
                  <label className="color-pick press" style={{ background: hex2 }} aria-label="두 번째 색">
                    <input type="color" value={hex2} onChange={(event) => setHex2(event.target.value)} />
                  </label>
                ) : null}
              </span>
            ) : null}
            <input
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                setError(null)
              }}
              maxLength={24}
              placeholder={`새 ${attribute.label} 값`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
              className="name-field min-w-0 flex-1 py-2.5 text-[16px] outline-none placeholder:text-faint"
            />
            <Button type="submit" className="shrink-0 px-3" disabled={draft.trim() === ''}>
              <PlusIcon width={16} height={16} />
              추가
            </Button>
          </form>
          {error ? <p className="-mt-1 text-[12px] text-[#ff977d]">{error}</p> : null}
        </>
      )}

      <div className="ms-seq" style={seq(3)}>
        <Button variant="primary" className="w-full py-3" onClick={back}>
          완료
        </Button>
      </div>
    </div>
  )
}

/**
 * Bounds for a numeric attribute. Typed values apply on Enter or when a field
 * loses focus. Live bounds flow back in only while neither field is being
 * edited — re-mounting here would throw away what was just typed.
 */
function RangeEditor({
  attributeId,
  min,
  max,
  unit,
  note,
}: {
  attributeId: string
  min: number
  max: number
  unit: string
  note: string | null
}) {
  const [low, setLow] = useState(String(min))
  const [high, setHigh] = useState(String(max))
  const [error, setError] = useState<string | null>(null)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (box.current?.contains(document.activeElement)) return
    setLow(String(min))
    setHigh(String(max))
  }, [min, max])
  const apply = () => setError(setRange(attributeId, Number(low), Number(high)))

  const field = (label: string, value: string, set: (v: string) => void) => (
    <label className="name-field flex-1">
      <span className="eyebrow shrink-0">{label}</span>
      <input
        value={value}
        inputMode="numeric"
        enterKeyHint="done"
        onChange={(event) => {
          set(event.target.value.replace(/[^0-9]/g, '').slice(0, 5))
          setError(null)
        }}
        onBlur={apply}
        onKeyDown={(event) => {
          if (event.key === 'Enter') apply()
        }}
        className="tnum min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none"
      />
      <span className="shrink-0 text-[13px] text-faint">{unit}</span>
    </label>
  )

  return (
    <div ref={box} className="ms-seq space-y-2" style={seq(1)}>
      <div className="flex items-center gap-2">
        {field('최소', low, setLow)}
        <span aria-hidden className="text-faint">–</span>
        {field('최대', high, setHigh)}
      </div>
      {error ? <p className="text-[12px] text-[#ff977d]">{error}</p> : note ? <p className="text-[12px] text-faint">{note}</p> : null}
    </div>
  )
}
