import NumberFlow from '@number-flow/react'
import { Fragment, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { graphql } from 'relay-runtime'

import { ADDED_TRAIT_CHANCE } from '../../domain/edits'
import { useLocalQuery } from '../../graph/useLocalQuery'

import { addOption, clearCount, editOption, removeOption, resetAttribute, setCount, setOptionsEnabled, setDecimal, setRange, toggleOption } from '../../state/edits'
import { router } from '../../router'
import { haptic } from '../../stage/haptics'
import { BackIcon, PlusIcon, TrashIcon } from '../icons'
import { attributeHead } from '../attributeHead'
import { HapticTap } from '../HapticTap'
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
const back = () => void router.navigate({ to: '/pick', search: {} })

/** What a generated kind does, in a line — they have no value list to edit. */
const GENERATED_NOTE: Record<string, string> = {
  DateAttribute: '1년 365일 중 하루를 뽑고, 그날의 별자리를 함께 알려줘요.',
}

export function ValuesSheet({ attributeId, group }: { attributeId: string; group?: string | undefined }) {
  const data = useLocalQuery<ValuesSheetQuery>(
    graphql`
      query ValuesSheetQuery($id: ID!) {
        attribute(id: $id) {
          __typename
          ...attributeHead_attribute
          ... on PickAttribute {
            multiple
            count
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
          }
          ... on ColorAttribute {
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
          ... on ComposeAttribute {
            partLabels
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
          ... on StatsAttribute {
            rangeMin
            rangeMax
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
          ... on TraitsAttribute {
            multiple
            count
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
          ... on RangeAttribute {
            rangeMin
            rangeMax
            unit
            hasCases
            decimalToggle
            decimal
            dependsOnSpecies
            speciesRanges {
              speciesKey
              speciesLabel
              speciesHint
              span
              bands
            }
          }
        }
      }
    `,
    { id: attributeId },
  )
  const raw = data.attribute
  const head = raw ? attributeHead(raw) : null
  if (!raw || !head || raw.__typename === '%other') {
    return (
      <div data-stage-floor className="space-y-3 text-center">
        <p className="headline">없는 속성이에요</p>
        <Button onClick={back}>돌아가기</Button>
      </div>
    )
  }

  // The union, read by kind: each field exists only on the members that have it.
  const kind = raw.__typename
  const editable = 'options' in raw
  const range = kind === 'RangeAttribute' ? raw : null
  const bounds = 'rangeMin' in raw ? { min: raw.rangeMin ?? 0, max: raw.rangeMax ?? 0 } : null
  const several = 'multiple' in raw && raw.multiple ? { count: raw.count ?? null, capped: kind === 'TraitsAttribute' } : null
  const attribute = {
    ...head,
    options: 'options' in raw ? (raw.options ?? []) : [],
    partLabels: kind === 'ComposeAttribute' ? (raw.partLabels ?? []) : [],
    groupBy: kind === 'PickAttribute' ? raw.groupBy : null,
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
  // 전체 선택/해제 inside one world leaves the values every world shares alone,
  // like the world's own switch does.
  const allScope = atGroups ? (attribute.options ?? []) : group ? options.filter((o) => (o.groups ?? []).includes(group)) : options
  const toGroups = () => void router.navigate({ to: '/pick', search: { values: attributeId } })

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
          <p className="truncate text-[12px] text-muted">
            {atGroups ? `${groupBy?.label ?? ''}별로 골라 보세요` : group ? `이 ${groupBy?.label ?? ''}의 ${attribute.label} ${options.length}가지` : attribute.summary}
          </p>
        </div>
        {/* One tidy cluster on the right; the subtitle already says how many are on. */}
        <div className="-mr-1.5 flex shrink-0 flex-col items-end">
          {editable && !range && allScope.length > 1 ? (
            <AllSwitch attributeId={attributeId} options={allScope} parts={partLabels.length > 0} keepOne={!groupBy} />
          ) : null}
          {attribute.edited ? (
            <button type="button" className={HEAD_ACTION} onClick={() => resetAttribute(attributeId)}>
              기본값으로
            </button>
          ) : null}
        </div>
      </div>

      {!editable && !range ? (
        // Generated kinds (date, traits) have no list to edit.
        <div className="ms-seq space-y-2" style={seq(1)}>
          <p className="rounded-[14px] bg-white/[0.04] px-4 py-4 text-[13px] text-muted">
            {GENERATED_NOTE[kind] ?? '자동으로 만들어지는 속성이에요.'}
          </p>
        </div>
      ) : range ? (
        <>
          <RangeEditor
            attributeId={attributeId}
            min={range.rangeMin ?? 0}
            max={range.rangeMax ?? 0}
            unit={range.unit ?? ''}
            color={attribute.color ?? '#888'}
            decimal={range.decimalToggle ? (range.decimal ?? false) : null}
            note={range.hasCases ? '종족 없이 뽑을 때의 범위예요. 종족마다의 범위는 종족 목록에서 그 종족을 눌러 바꿔요.' : null}
          />
          {/* Only while this range is locked: its value stays put through
              re-rolls while 종족 may change, so the player can see which
              species it suits and preview another. */}
          {range.dependsOnSpecies && attribute.locked ? (
            <SpeciesPreview label={attribute.label} color={attribute.color} ranges={range.speciesRanges ?? []} />
          ) : null}
        </>
      ) : atGroups ? (
        <ul className="ms-seq values-list" style={seq(1)}>
          {groups.map((g) => {
            const all = (attribute.options ?? []).filter((o) => (o.groups?.length ?? 0) === 0 || (o.groups ?? []).includes(g.key ?? ''))
            // The switch moves this world's own 직업; ones shared by every
            // world stay put, or turning one world off would empty the rest.
            const own = all.filter((o) => (o.groups ?? []).includes(g.key ?? ''))
            const ownOn = own.filter((o) => o.enabled)
            const on = ownOn.length > 0
            const switchGroup = () => {
              haptic.select()
              setOptionsEnabled(attributeId, own.map((o) => o.key ?? ''), !on)
            }
            return (
              <li key={g.key} className="values-row" data-off={!on || undefined}>
                <button
                  type="button"
                  className="press-soft flex min-w-0 flex-1 items-center gap-2 text-left"
                  onClick={() => {
                    haptic.select()
                    void router.navigate({ to: '/pick', search: { values: attributeId, group: g.key ?? undefined } })
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
                {own.length > 0 ? (
                  <HapticTap className="haptic-inline" onTap={switchGroup}>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`${g.label} 직업 ${on ? '모두 끄기' : '모두 켜기'}`}
                      onClick={switchGroup}
                      className="switch"
                      style={{ '--switch-on': attribute.color } as CSSProperties}
                    >
                      <span />
                    </button>
                  </HapticTap>
                ) : null}
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
            // At least one value stays on — except in a grouped list (직업),
            // which may be emptied; the attribute then switches off instead.
            const last = !groupBy && !!option.enabled && inPart.filter((o) => o.enabled).length <= 1
            const heading = partLabels.length > 0 && (index === 0 || (options[index - 1]?.part ?? 0) !== part)
            const switchOption = () => {
              haptic.select()
              toggleOption(attributeId, option.key ?? '')
            }
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
                  {/* The name and its line open the value for editing. */}
                  <button
                    type="button"
                    aria-label={`${option.label} 편집`}
                    className="press-soft min-w-0 flex-1 text-left"
                    onClick={() => {
                      haptic.select()
                      void router.navigate({ to: '/pick', search: { values: attributeId, group, edit: option.key ?? undefined } })
                    }}
                  >
                    <span className="block truncate text-[14px] font-medium">{option.label}</span>
                    {option.hint ? <span className="tnum block truncate text-[11.5px] text-faint">{option.hint}</span> : null}
                  </button>
                  {option.custom ? <span className="values-badge">내 값</span> : null}
                  <HapticTap className="haptic-inline" onTap={switchOption} disabled={last}>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={option.enabled ?? false}
                      aria-label={`${option.label} ${option.enabled ? '끄기' : '켜기'}`}
                      title={last ? '최소 하나는 켜져 있어야 해요' : undefined}
                      disabled={last}
                      onClick={switchOption}
                      className="switch"
                      style={{ '--switch-on': attribute.color } as CSSProperties}
                    >
                      <span />
                    </button>
                  </HapticTap>
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
      {several && !atGroups ? (
        <CountEditor
          attributeId={attributeId}
          count={several.count}
          capped={several.capped}
          enabled={options.filter((o) => o.enabled).length}
          color={attribute.color ?? '#888'}
        />
      ) : null}
      {kind === 'StatsAttribute' && bounds ? (
        // 능력치: which stats (the list above) and the span each rolls in.
        <RangeEditor
          attributeId={attributeId}
          min={bounds.min}
          max={bounds.max}
          unit=""
          color={attribute.color ?? '#888'}
          decimal={null}
          note="능력치마다 이 범위 안에서 뽑아요. 대부분은 중간쯤, 가끔 뛰어난 게 나와요."
        />
      ) : null}
      <div className="ms-seq flex gap-2" style={seq(3)}>
        <Button variant="primary" className="flex-1 py-3" onClick={back}>
          완료
        </Button>
        {editable && !atGroups ? (
          <Button
            aria-label={`${attribute.label} 값 추가하기`}
            className="aspect-square shrink-0 px-0 py-3"
            onClick={() => {
              haptic.select()
              void router.navigate({ to: '/pick', search: { values: attributeId, group, add: true } })
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
 * How many come out at once. A pick draws exactly this many; 외형 특징 rolls
 * each feature on its own odds and keeps at most this many — or, with
 * 무제한, every one that hits.
 */
/** The header's small text actions, stacked at its right edge. */
const HEAD_ACTION = 'press rounded-full px-2 py-[3px] text-[11.5px] font-medium leading-tight text-muted hover:bg-white/5 hover:text-ink'

/** 전체 선택, or 전체 해제 once all are on, for the values in view. A list
 *  that must keep a value on keeps the first lit one of each part. */
function AllSwitch({
  attributeId,
  options,
  parts,
  keepOne,
}: {
  attributeId: string
  options: ReadonlyArray<{ readonly key?: string | null; readonly enabled?: boolean | null; readonly part?: number | null }>
  parts: boolean
  keepOne: boolean
}) {
  const allOn = options.every((o) => o.enabled)
  const toggle = () => {
    haptic.select()
    if (!allOn) {
      setOptionsEnabled(attributeId, options.map((o) => o.key ?? ''), true)
      return
    }
    const kept = new Set<string>()
    if (keepOne) {
      for (const part of new Set(options.map((o) => (parts ? (o.part ?? 0) : 0)))) {
        kept.add(options.find((o) => (parts ? (o.part ?? 0) : 0) === part)?.key ?? '')
      }
    }
    setOptionsEnabled(attributeId, options.flatMap((o) => (kept.has(o.key ?? '') ? [] : [o.key ?? ''])), false)
  }
  return (
    <button type="button" className={HEAD_ACTION} onClick={toggle}>
      {allOn ? '전체 해제' : '전체 선택'}
    </button>
  )
}

function CountEditor({ attributeId, count, capped, enabled, color }: { attributeId: string; count: number | null; capped: boolean; enabled: number; color: string }) {
  const [error, setError] = useState<string | null>(null)
  const unlimited = capped && count === null
  const current = Math.min(count ?? enabled, enabled)
  // The cap to come back to when 무제한 is switched off again.
  const [lastCap, setLastCap] = useState(current)
  const set = (n: number) => {
    haptic.select()
    const problem = setCount(attributeId, n)
    setError(problem)
    if (!problem) setLastCap(n)
  }
  const toggleUnlimited = () => {
    if (unlimited) return set(Math.min(lastCap, enabled))
    haptic.select()
    setError(null)
    clearCount(attributeId)
  }
  return (
    <div className="ms-seq space-y-2" style={seq(2)}>
      <p className="eyebrow">{capped ? '함께 나오는 개수' : '뽑는 개수'}</p>
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" aria-label="하나 줄이기" className="aspect-square px-0 py-1.5 text-[16px]" disabled={current <= 1} onClick={() => set(current - 1)}>
          −
        </Button>
        <p
          className="tnum min-w-[4.5em] text-center text-[15px] font-semibold transition-opacity duration-200"
          style={{ color, opacity: unlimited ? 0.4 : 1 }}
          aria-label={unlimited ? '무제한' : capped ? `최대 ${current}개` : `${current}개씩`}
        >
          {capped ? '최대 ' : null}
          <NumberFlow value={current} className="tnum" />
          {capped ? '개' : '개씩'}
        </p>
        <Button variant="ghost" aria-label="하나 늘리기" className="aspect-square px-0 py-1.5 text-[16px]" disabled={current >= enabled} onClick={() => set(current + 1)}>
          +
        </Button>
        {capped ? (
          <Button
            aria-pressed={unlimited}
            onClick={toggleUnlimited}
            className="ml-auto px-3 py-1.5 text-[13px]"
            style={unlimited ? { borderColor: color, color, background: `color-mix(in srgb, ${color} 14%, transparent)` } : undefined}
          >
            무제한
          </Button>
        ) : null}
      </div>
      {error ? (
        <p className="text-[12px] text-[#ff977d]">{error}</p>
      ) : (
        <p className="text-[12px] text-faint">
          {!capped
            ? `켜진 값 ${enabled}개 중에서 겹치지 않게 뽑아요.`
            : unlimited
              ? '특징마다 나올 확률이 따로 있어서, 걸리는 만큼 모두 나와요.'
              : `특징마다 나올 확률이 따로 있어요. ${current}개보다 많이 걸리면 그중 ${current}개만 남겨요.`}
        </p>
      )}
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
  color,
  decimal,
  note,
}: {
  attributeId: string
  min: number
  max: number
  unit: string
  color: string
  /** null: this range has no decimal switch. */
  decimal: boolean | null
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
  const toggleDecimal = () => {
    haptic.select()
    setDecimal(attributeId, !decimal)
  }

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
      {decimal !== null ? (
        <div className="values-row">
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-medium">소수점 한 자리</span>
            <span className="tnum block text-[11.5px] text-faint">{decimal ? `172.4${unit}처럼 뽑아요` : `172${unit}처럼 정수로 뽑아요`}</span>
          </span>
          <HapticTap className="haptic-inline" onTap={toggleDecimal}>
            <button
              type="button"
              role="switch"
              aria-checked={decimal}
              aria-label={`소수점 한 자리 ${decimal ? '끄기' : '켜기'}`}
              onClick={toggleDecimal}
              className="switch"
              style={{ '--switch-on': color } as CSSProperties}
            >
              <span />
            </button>
          </HapticTap>
        </div>
      ) : null}
    </div>
  )
}

/**
 * Adding a value, or changing one already in the list (`edit`, a value id):
 * the whole panel morphs from the list into this view and back. What it asks
 * for follows the kind — a colour (or two) for colours, the part for a
 * phrase, the 나이 and 키 ranges for a species, the odds for a 외형 특징.
 */
export function AddValueSheet({ attributeId, group, edit }: { attributeId: string; group?: string | undefined; edit?: string | undefined }) {
  const data = useLocalQuery<AddValueSheetQuery>(
    graphql`
      query AddValueSheetQuery($id: ID!) {
        attribute(id: $id) {
          __typename
          ...attributeHead_attribute
          ... on ComposeAttribute {
            partLabels
            options {
              key
              label
              swatches
              chance
              ageMin
              ageMax
              heightMin
              heightMax
            }
          }
          ... on PickAttribute {
            options {
              key
              label
              swatches
              chance
              ageMin
              ageMax
              heightMin
              heightMax
            }
          }
          ... on ColorAttribute {
            options {
              key
              label
              swatches
              chance
              ageMin
              ageMax
              heightMin
              heightMax
            }
          }
          ... on StatsAttribute {
            options {
              key
              label
              swatches
              chance
              ageMin
              ageMax
              heightMin
              heightMax
            }
          }
          ... on TraitsAttribute {
            options {
              key
              label
              swatches
              chance
              ageMin
              ageMax
              heightMin
              heightMax
            }
          }
        }
      }
    `,
    { id: attributeId },
  )
  const raw = data.attribute
  const options = raw && 'options' in raw ? (raw.options ?? []) : []
  const editing = edit ? (options.find((o) => o.key === edit) ?? null) : null
  if (edit && !editing) return null
  // Keyed by the value, so moving to another one starts from its own fields.
  return <ValueForm key={edit ?? 'new'} data={data} attributeId={attributeId} group={group} editing={editing} />
}

type EditedOption = {
  readonly key: string
  readonly label: string
  readonly swatches: ReadonlyArray<string>
  readonly chance: number | null | undefined
  readonly ageMin: number | null | undefined
  readonly ageMax: number | null | undefined
  readonly heightMin: number | null | undefined
  readonly heightMax: number | null | undefined
}

function ValueForm({
  data,
  attributeId,
  group,
  editing,
}: {
  data: AddValueSheetQuery['response']
  attributeId: string
  group?: string | undefined
  editing: EditedOption | null
}) {
  const text = (n: number | null | undefined, fallback: number) => String(n ?? fallback)
  const [name, setName] = useState(editing?.label ?? '')
  const [hex, setHex] = useState(editing?.swatches[0] ?? '#6e56cf')
  const [hex2, setHex2] = useState(editing?.swatches[1] ?? '#29a383')
  const [twoTone, setTwoTone] = useState((editing?.swatches.length ?? 0) > 1)
  const [part, setPart] = useState(0)
  // A new species starts from a human's 나이 and 키.
  const [young, setYoung] = useState(text(editing?.ageMin, 12))
  const [old, setOld] = useState(text(editing?.ageMax, 80))
  const [short, setShort] = useState(text(editing?.heightMin, 145))
  const [tall, setTall] = useState(text(editing?.heightMax, 195))
  const [percent, setPercent] = useState(text(editing?.chance != null ? Math.round(editing.chance * 100) : null, Math.round(ADDED_TRAIT_CHANCE * 100)))
  const [error, setError] = useState<string | null>(null)

  const raw = data.attribute
  const attribute = raw ? attributeHead(raw) : null
  const toList = () => void router.navigate({ to: '/pick', search: { values: attributeId, group } })
  if (!raw || !attribute || raw.__typename === '%other') return null
  const color = attribute.color
  const isColor = raw.__typename === 'ColorAttribute'
  const isSpecies = attributeId === 'species'
  const isTraits = raw.__typename === 'TraitsAttribute'
  // A new value picks its part; an existing one stays in its own.
  const partLabels = raw.__typename === 'ComposeAttribute' && !editing ? (raw.partLabels ?? []) : []

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const extras = {
      hex: isColor ? hex : undefined,
      hex2: isColor ? (twoTone ? hex2 : null) : undefined,
      age: isSpecies ? { min: Number(young), max: Number(old) } : undefined,
      height: isSpecies ? { min: Number(short), max: Number(tall) } : undefined,
      chance: isTraits ? Number(percent) / 100 : undefined,
    }
    const problem = editing
      ? editOption(attributeId, editing.key, name, extras)
      : addOption(attributeId, name, { ...extras, hex2: extras.hex2 ?? undefined, part: partLabels.length ? part : undefined, group })
    setError(problem)
    if (problem) return
    haptic.select()
    toList()
  }
  const bound = (label: string, value: string, set: (v: string) => void, unit: string, digits = 5) => (
    <label className="name-field min-w-0 flex-1 gap-2 px-3">
      <span className="eyebrow shrink-0">{label}</span>
      <input
        value={value}
        size={1}
        inputMode="numeric"
        enterKeyHint="done"
        onChange={(event) => {
          set(event.target.value.replace(/[^0-9]/g, '').slice(0, digits))
          setError(null)
        }}
        className="tnum min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none"
      />
      <span className="shrink-0 text-[13px] text-faint">{unit}</span>
    </label>
  )

  return (
    <form data-stage-floor className="space-y-3" onSubmit={submit}>
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <button type="button" onClick={toList} aria-label={`${attribute.label} 목록으로`} className="press -ml-2 grid size-9 shrink-0 place-items-center rounded-full text-muted hover:text-ink">
          <BackIcon />
        </button>
        <h2 className="display flex min-w-0 flex-1 items-center gap-2">
          <Dot color={color} size={10} />
          <span className="truncate">{editing ? `${editing.label} 편집` : `새 ${attribute.label}`}</span>
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
          <p className="eyebrow mb-1.5">나이</p>
          <div className="flex items-center gap-2">
            {bound('최소', young, setYoung, '세')}
            <span aria-hidden className="text-faint">–</span>
            {bound('최대', old, setOld, '세')}
          </div>
          <p className="eyebrow mt-3 mb-1.5">키</p>
          <div className="flex items-center gap-2">
            {bound('최소', short, setShort, 'cm')}
            <span aria-hidden className="text-faint">–</span>
            {bound('최대', tall, setTall, 'cm')}
          </div>
          {error ? null : <p className="mt-2 text-[12px] text-faint">이 종족이 나오면 나이와 키는 이 범위 안에서 뽑혀요.</p>}
        </div>
      ) : null}
      {isTraits ? (
        <div className="ms-seq" style={seq(2)}>
          <p className="eyebrow mb-1.5">나올 확률</p>
          {bound('확률', percent, setPercent, '%', 3)}
          {error ? null : <p className="mt-2 text-[12px] text-faint">뽑을 때마다 이 확률로 붙어요. 다른 특징과 함께 나올 수 있어요.</p>}
        </div>
      ) : null}
      {error ? <p className="text-[12px] text-[#ff977d]">{error}</p> : null}

      <div className="ms-seq flex gap-2" style={seq(3)}>
        <Button variant="ghost" className="flex-1 py-3" onClick={toList}>
          취소
        </Button>
        <Button type="submit" variant="primary" className="flex-1 py-3" disabled={name.trim() === '' || (isSpecies && [young, old, short, tall].includes('')) || (isTraits && percent === '')}>
          {editing ? '저장' : '추가'}
        </Button>
      </div>
    </form>
  )
}
