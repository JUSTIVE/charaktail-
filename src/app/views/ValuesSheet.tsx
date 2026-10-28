import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'

import { addOption, removeOption, resetAttribute, setRange, toggleOption } from '../../state/edits'
import { router } from '../../router'
import { haptic } from '../../stage/haptics'
import { BackIcon, PlusIcon, TrashIcon } from '../icons'
import { HairArt, hasHairArt } from '../hairArt'
import { Button, Dot, seq, Swatches } from '../ui'
import type { AddValueSheetQuery } from '../../__generated__/AddValueSheetQuery.graphql'
import type { ValuesSheetQuery } from '../../__generated__/ValuesSheetQuery.graphql'

/**
 * One attribute's values, editable: switch a value off so it is never drawn,
 * delete it, or add your own. The picker's panel morphs into this view and
 * back (`/?values=…`), and every row is a live field over the edits cell.
 * Adding is a view of its own (`&add=true`): the whole panel morphs into it.
 */
const back = () => void router.navigate({ to: '/', search: {} })

/** What a generated kind does, in a line — they have no value list to edit. */
const GENERATED_NOTE: Record<string, string> = {
  date: '1년 365일 중 하루를 뽑고, 그날의 별자리를 함께 알려줘요.',
  stats: '여러 능력치를 한 번에 뽑아요. 대부분은 중간쯤, 가끔 뛰어난 게 하나씩 나와요.',
  traits: '특징마다 나올 확률이 따로 있어서, 하나도 없거나 여러 개가 함께 나올 수 있어요.',
}

export function ValuesSheet({ attributeId, group }: { attributeId: string; group?: string | undefined }) {
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
          dependsOnSpecies
          locked
          speciesRanges {
            speciesKey
            speciesLabel
            speciesHint
            span
            bands
          }
          partLabels
          groupBy {
            key
            label
            options {
              key
              label
              hint
              enabled
            }
          }
          options {
            key
            label
            hint
            groups
            part
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

  // Grouped kinds (직업 by 세계관) open on the list of groups — the enabled
  // values of the attribute they are grouped by — and each group morphs into
  // the values that belong to it (`&group=`).
  const groupBy = attribute.groupBy
  const groups = (groupBy?.options ?? []).filter((o) => o.enabled)
  const atGroups = !!groupBy && !group
  const groupLabel = group ? (groupBy?.options?.find((o) => o.key === group)?.label ?? group) : null
  const inGroup = (groupsOfValue: ReadonlyArray<string> | null | undefined) =>
    !group || (groupsOfValue?.length ?? 0) === 0 || (groupsOfValue ?? []).includes(group)
  const options = (attribute.options ?? []).filter((o) => inGroup(o.groups))
  const partLabels = attribute.partLabels ?? []
  const toGroups = () => void router.navigate({ to: '/', search: { values: attributeId } })

  return (
    <div data-stage-floor className="space-y-3">
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <button
          type="button"
          onClick={group ? toGroups : back}
          aria-label={group ? `${groupBy?.label ?? ''} 목록으로` : '속성 목록으로'}
          className="press -ml-2 grid size-9 shrink-0 place-items-center rounded-full text-muted hover:text-ink"
        >
          <BackIcon />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="display flex min-w-0 items-center gap-2">
            <Dot color={attribute.color ?? '#888'} size={10} />
            <span className="truncate">{groupLabel ? `${attribute.label} · ${groupLabel}` : attribute.label}</span>
          </h2>
          <p className="text-[12.5px] text-muted">
            {atGroups ? `${groupBy?.label ?? ''}별로 골라 보세요` : group ? `이 ${groupBy?.label ?? ''}의 ${attribute.label} ${options.length}가지` : attribute.summary}
          </p>
        </div>
        {attribute.edited ? (
          <Button variant="ghost" className="px-2.5 py-1.5 text-[12.5px]" onClick={() => resetAttribute(attributeId)}>
            기본값으로
          </Button>
        ) : null}
      </div>

      {!attribute.editable && attribute.kind !== 'range' ? (
        // Generated kinds (date, stats, traits) have no list to edit.
        <div className="ms-seq space-y-2" style={seq(1)}>
          <p className="rounded-[14px] bg-white/[0.04] px-4 py-4 text-[13px] text-muted">
            {GENERATED_NOTE[attribute.kind ?? ''] ?? '자동으로 만들어지는 속성이에요.'}
          </p>
        </div>
      ) : !attribute.editable ? (
        <>
          <RangeEditor
            attributeId={attributeId}
            min={attribute.rangeMin ?? 0}
            max={attribute.rangeMax ?? 0}
            unit={attribute.unit ?? ''}
            note={attribute.hasCases ? (attribute.edited ? '종족별 범위 대신 이 범위로 뽑아요.' : '지금은 종족마다 범위가 달라요. 입력하면 모두 이 범위로 뽑아요.') : null}
          />
          {/* Only while this range is locked: its value stays put through
              re-rolls while 종족 may change, so the player can see which
              species it suits and preview another. */}
          {attribute.dependsOnSpecies && attribute.locked ? (
            <SpeciesPreview label={attribute.label ?? ''} color={attribute.color ?? '#888'} ranges={attribute.speciesRanges ?? []} />
          ) : null}
        </>
      ) : atGroups ? (
        <ul className="ms-seq values-list" style={seq(1)}>
          {groups.map((g) => {
            const all = (attribute.options ?? []).filter((o) => (o.groups?.length ?? 0) === 0 || (o.groups ?? []).includes(g.key ?? ''))
            return (
              <li key={g.key}>
                <button
                  type="button"
                  className="values-row press-soft w-full text-left"
                  onClick={() => {
                    haptic.select()
                    void router.navigate({ to: '/', search: { values: attributeId, group: g.key ?? undefined } })
                  }}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{g.label}</span>
                    {g.hint ? <span className="block truncate text-[11.5px] text-faint">{g.hint}</span> : null}
                  </span>
                  <span className="tnum shrink-0 text-[12.5px] text-muted">
                    {all.filter((o) => o.enabled).length}/{all.length}
                  </span>
                  <BackIcon width={16} height={16} className="shrink-0 rotate-180 text-faint" />
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <ul className="ms-seq values-list" style={seq(1)}>
          {options.map((option, index) => {
            // A compose kind lists each part under its own name; at least one
            // value per part stays on, or the phrase could not be built.
            const part = option.part ?? 0
            const inPart = partLabels.length ? options.filter((o) => (o.part ?? 0) === part) : options
            const last = !!option.enabled && inPart.filter((o) => o.enabled).length <= 1
            const heading = partLabels.length > 0 && (index === 0 || (options[index - 1]?.part ?? 0) !== part)
            return (
              <Fragment key={option.key}>
                {heading ? <li className="values-part eyebrow">{partLabels[part]}</li> : null}
                <li className="values-row" data-off={!option.enabled || undefined}>
                  {(option.swatches?.length ?? 0) > 0 ? (
                    <Swatches colors={option.swatches ?? []} />
                  ) : hasHairArt(option.key ?? '') ? (
                    <HairArt id={option.key ?? ''} className="-my-1 shrink-0" style={{ color: attribute.color ?? undefined }} />
                  ) : (
                    <Dot color={attribute.color ?? '#888'} size={7} />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{option.label}</span>
                    {option.hint ? <span className="tnum block truncate text-[11.5px] text-faint">{option.hint}</span> : null}
                  </span>
                  {option.custom ? <span className="values-badge">내 값</span> : null}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={option.enabled ?? false}
                    aria-label={`${option.label} ${option.enabled ? '끄기' : '켜기'}`}
                    title={last ? '최소 하나는 켜져 있어야 해요' : undefined}
                    disabled={last}
                    onClick={() => {
                      haptic.select()
                      toggleOption(attributeId, option.key ?? '')
                    }}
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
              </Fragment>
            )
          })}
        </ul>
      )}
      <div className="ms-seq flex gap-2" style={seq(3)}>
        <Button variant="primary" className="flex-1 py-3" onClick={back}>
          완료
        </Button>
        {attribute.editable && !atGroups ? (
          <Button
            aria-label={`${attribute.label} 값 추가하기`}
            className="aspect-square shrink-0 px-0 py-3"
            onClick={() => {
              haptic.select()
              void router.navigate({ to: '/', search: { values: attributeId, group, add: true } })
            }}
          >
            <PlusIcon width={18} height={18} />
          </Button>
        ) : null}
      </div>
    </div>
  )
}

type SpeciesRangeView = {
  readonly speciesKey: string | null | undefined
  readonly speciesLabel: string | null | undefined
  readonly speciesHint: string | null | undefined
  readonly span: string | null | undefined
  readonly bands: ReadonlyArray<string> | null | undefined
}

/**
 * What this range turns out to be for one species — 드워프의 키는 110–150cm —
 * with a button that opens the species list to preview another.
 */
function SpeciesPreview({ label, color, ranges }: { label: string; color: string; ranges: ReadonlyArray<SpeciesRangeView> }) {
  const [key, setKey] = useState<string | null>(null)
  const [choosing, setChoosing] = useState(false)
  const current = ranges.find((r) => r.speciesKey === key) ?? ranges[0]
  if (!current) return null
  return (
    <div className="ms-seq species-preview space-y-2" style={{ ...seq(2), '--accent': color } as CSSProperties}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="eyebrow">종족 미리보기</p>
          <p className="mt-1 text-[14px] font-semibold">
            {current.speciesLabel}의 {label}
          </p>
          {current.speciesHint ? <p className="tnum text-[11.5px] text-faint">{current.speciesHint}</p> : null}
        </div>
        <Button
          variant="ghost"
          aria-expanded={choosing}
          className="shrink-0 px-2.5 py-1.5 text-[12.5px]"
          onClick={() => {
            haptic.select()
            setChoosing((v) => !v)
          }}
        >
          종족 변경
        </Button>
      </div>
      <p className="tnum text-[22px] font-bold tracking-[-0.02em]">{current.span}</p>
      {(current.bands?.length ?? 0) > 0 ? <p className="text-[12px] text-muted">{current.bands?.join(' · ')}</p> : null}
      {choosing ? (
        <div className="species-choices" role="radiogroup" aria-label="미리볼 종족">
          {ranges.map((r) => (
            <button
              key={r.speciesKey}
              type="button"
              role="radio"
              aria-checked={r.speciesKey === current.speciesKey}
              onClick={() => {
                haptic.select()
                setKey(r.speciesKey ?? null)
                setChoosing(false)
              }}
              className="press-soft"
            >
              {r.speciesLabel}
            </button>
          ))}
        </div>
      ) : null}
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
    <label className="name-field min-w-0 flex-1 gap-2 px-3">
      <span className="eyebrow shrink-0">{label}</span>
      <input
        value={value}
        // No intrinsic width: the field takes what the row gives it.
        size={1}
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

/**
 * Adding a value: the whole panel morphs from the list into this view and
 * back. What it asks for follows the kind — a colour (or two) for colours,
 * the part for a phrase, the expected lifespan for a species.
 */
export function AddValueSheet({ attributeId, group }: { attributeId: string; group?: string | undefined }) {
  const data = useLocalQuery<AddValueSheetQuery>(
    graphql`
      query AddValueSheetQuery($id: ID!) {
        attribute(id: $id) {
          label
          color
          kind
          partLabels
        }
      }
    `,
    { id: attributeId },
  )
  const [name, setName] = useState('')
  const [hex, setHex] = useState('#6e56cf')
  const [hex2, setHex2] = useState('#29a383')
  const [twoTone, setTwoTone] = useState(false)
  const [part, setPart] = useState(0)
  const [low, setLow] = useState('70')
  const [high, setHigh] = useState('100')
  const [error, setError] = useState<string | null>(null)

  const attribute = data.attribute
  const toList = () => void router.navigate({ to: '/', search: { values: attributeId, group } })
  if (!attribute) return null
  const color = attribute.color ?? '#888'
  const isColor = attribute.kind === 'color'
  const isSpecies = attributeId === 'species'
  const partLabels = attribute.partLabels ?? []

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const problem = addOption(attributeId, name, {
      hex: isColor ? hex : undefined,
      hex2: isColor && twoTone ? hex2 : undefined,
      part: partLabels.length ? part : undefined,
      group,
      lifespan: isSpecies ? { min: Number(low), max: Number(high) } : undefined,
    })
    setError(problem)
    if (problem) return
    haptic.select()
    toList()
  }
  const years = (label: string, value: string, set: (v: string) => void) => (
    <label className="name-field min-w-0 flex-1 gap-2 px-3">
      <span className="eyebrow shrink-0">{label}</span>
      <input
        value={value}
        size={1}
        inputMode="numeric"
        enterKeyHint="done"
        onChange={(event) => {
          set(event.target.value.replace(/[^0-9]/g, '').slice(0, 5))
          setError(null)
        }}
        className="tnum min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none"
      />
      <span className="shrink-0 text-[13px] text-faint">년</span>
    </label>
  )

  return (
    <form data-stage-floor className="space-y-3" onSubmit={submit}>
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <button type="button" onClick={toList} aria-label={`${attribute.label} 목록으로`} className="press -ml-2 grid size-9 shrink-0 place-items-center rounded-full text-muted hover:text-ink">
          <BackIcon />
        </button>
        <h2 className="display flex min-w-0 flex-1 items-center gap-2">
          <Dot color={color} size={10} />새 {attribute.label}
        </h2>
      </div>

      {partLabels.length ? (
        // Which part of the phrase the new value joins.
        <div className="ms-seq segmented" role="radiogroup" aria-label="마디" style={seq(1)}>
          {partLabels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={part === i}
              onClick={() => {
                haptic.select()
                setPart(i)
              }}
              className="press-soft"
              style={{ '--seg': color } as CSSProperties}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="ms-seq flex items-center gap-2" style={seq(1)}>
        {isColor ? (
          <span className="flex shrink-0 -space-x-2">
            <label className="color-pick press" style={{ background: hex }} aria-label={twoTone ? '첫 번째 색' : '색 고르기'}>
              <input type="color" value={hex} onChange={(event) => setHex(event.target.value)} />
            </label>
            {/* Always mounted, so it can animate out as well as in. */}
            <label className="color-pick color-pick-second press" data-open={twoTone || undefined} aria-hidden={!twoTone} style={{ background: hex2 }} aria-label="두 번째 색">
              <input type="color" value={hex2} tabIndex={twoTone ? 0 : -1} onChange={(event) => setHex2(event.target.value)} />
            </label>
          </span>
        ) : null}
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setError(null)
          }}
          maxLength={24}
          placeholder={partLabels.length ? `새 ${partLabels[part]}` : `${attribute.label} 이름`}
          aria-label={`${attribute.label} 이름`}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          className="name-field min-w-0 flex-1 py-2.5 text-[16px] outline-none placeholder:text-faint"
        />
      </div>

      {isColor ? (
        // A second colour for the new value: 오드아이 for eyes, 투톤 otherwise.
        // The whole row is the label, so tapping the words toggles too.
        <label className="ms-seq flex items-center gap-2" style={seq(2)}>
          <button type="button" role="switch" aria-checked={twoTone} onClick={() => setTwoTone((v) => !v)} className="switch" style={{ '--switch-on': color } as CSSProperties}>
            <span />
          </button>
          <span className="text-[13px] text-muted">{attributeId === 'eyeColor' ? '오드아이 (양쪽 눈 색이 달라요)' : '투톤 (두 가지 색)'}</span>
        </label>
      ) : null}

      {isSpecies ? (
        <div className="ms-seq" style={seq(2)}>
          <p className="eyebrow mb-1.5">기대 수명</p>
          <div className="flex items-center gap-2">
            {years('최소', low, setLow)}
            <span aria-hidden className="text-faint">–</span>
            {years('최대', high, setHigh)}
          </div>
          {error ? null : <p className="mt-2 text-[12px] text-faint">나이는 이 수명 안에서 뽑혀요.</p>}
        </div>
      ) : null}
      {error ? <p className="text-[12px] text-[#ff977d]">{error}</p> : null}

      <div className="ms-seq flex gap-2" style={seq(3)}>
        <Button variant="ghost" className="flex-1 py-3" onClick={toList}>
          취소
        </Button>
        <Button type="submit" variant="primary" className="flex-1 py-3" disabled={name.trim() === '' || (isSpecies && (low === '' || high === ''))}>
          추가
        </Button>
      </div>
    </form>
  )
}
