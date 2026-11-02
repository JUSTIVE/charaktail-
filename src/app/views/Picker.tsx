import NumberFlow from '@number-flow/react'
import { Fragment, useState, type CSSProperties } from 'react'
import { encodeAttributeIds } from '../../domain/codes'
import { koreanParts } from '../../domain/koreanNumber'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'

import { router } from '../../router'
import { currentName, NAME_MAX, setName } from '../../state/name'
import { nestParent, selectAll, selectionCell, toggleAttribute } from '../../state/selection'
import { requestMotionAccess } from '../../stage/motion'
import { patchStage } from '../../stage/store'
import { attributeHead } from '../attributeHead'
import { Aura, AuraTint } from '../Aura'
import { HapticTap } from '../HapticTap'
import { releaseTextInput } from '../releaseTextInput'
import { haptic } from '../../stage/haptics'
import { KebabIcon, LockIcon, ShakeIcon } from '../icons'
import { Button, Dot, seq } from '../ui'
import type { PickerQuery } from '../../__generated__/PickerQuery.graphql'

/**
 * Step one: which attributes go into the roll. Every chip is catalogue data
 * read through Relay — a new attribute file shows up here with no UI change.
 */
export function Picker() {
  const data = useLocalQuery<PickerQuery>(
    graphql`
      query PickerQuery {
        draft {
          name
          canShake
          selectionCount
          characterCount
        }
        stage {
          motion
        }
        attributes {
          ...attributeHead_attribute
        }
      }
    `,
    {},
  )
  const attributes = (data.attributes ?? []).flatMap((ref) => attributeHead(ref) ?? [])
  const count = attributes.filter((a) => a.selected).length
  const parts = koreanParts(data.draft?.characterCount ?? 0)
  const auraColors = attributes.filter((a) => a.selected).map((a) => a.color ?? '#7c7a85')
  const allOn = count === attributes.length
  // 완전 종속 속성 (나이, 키 of 종족) fold into their chip while it is on: no chips of their own, tags inside it.
  const selectedKeys = new Set(attributes.filter((a) => a.selected).map((a) => a.key))
  const folded = (key: string) => {
    const parent = nestParent(key)
    return !!parent && selectedKeys.has(parent)
  }
  const nestedIn = (key: string) => attributes.filter((a) => nestParent(a.key) === key && folded(a.key))
  // The input owns its text while typing (a controlled value fed back from a
  // live field would fight Korean IME composition); the draft cell is written
  // on every change and read back through Relay for everything else.
  const [name, setNameText] = useState(data.draft?.name ?? '')
  const ready = data.draft?.canShake ?? false

  const confirm = async () => {
    if (!ready) return
    // Before anything else: no focused field, no undo history to offer on shake.
    releaseTextInput()
    haptic.press()
    // iOS only grants motion from inside the tap that asked for it.
    if (data.stage?.motion === 'prompt') patchStage({ motion: await requestMotionAccess() })
    void router.navigate({ to: '/shake', search: { a: encodeAttributeIds(selectionCell.read()), n: currentName() } })
  }

  return (
    <div data-stage-floor className="space-y-4">
      <div className="ms-seq flex items-center justify-between gap-3" style={seq(0)}>
        <h1 className="display">어떤 캐릭터를 뽑을까요?</h1>
        {/* Negative block margin: the button's tap area must not make the row
            taller than the title, or the title sits low with empty space above. */}
        <Button variant="ghost" className="-my-2 shrink-0 px-2.5 py-1.5 text-[12.5px]" onClick={() => selectAll(!allOn)}>
          {allOn ? '모두 해제' : '모두 선택'}
        </Button>
      </div>

      {/* The name is the one thing the player decides; everything else is rolled. */}
      <form
        className="ms-seq"
        style={seq(1)}
        onSubmit={(event) => {
          event.preventDefault()
          void confirm()
        }}
      >
        <label className="name-field">
          <span className="eyebrow shrink-0">이름</span>
          <input
            value={name}
            onChange={(event) => {
              setNameText(event.target.value)
              setName(event.target.value)
            }}
            maxLength={NAME_MAX}
            placeholder="캐릭터 이름을 지어 주세요"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none placeholder:font-normal placeholder:text-faint"
          />
        </label>
      </form>

      <ul className="ms-seq picker-list grid grid-cols-2 gap-2 sm:grid-cols-3" style={seq(2)}>
        {attributes.filter((a) => !folded(a.key)).map((attribute) => (
          <li key={attribute.key} className="ms-item relative">
            <HapticTap
              onTap={() => {
                haptic.select()
                toggleAttribute(attribute.key)
              }}
            >
              <button
                type="button"
                aria-pressed={attribute.selected}
                onClick={() => {
                  haptic.select()
                  toggleAttribute(attribute.key)
                }}
                className="chip press-soft"
                style={{ '--chip': attribute.color } as CSSProperties}
              >
                {/* The dot stays centred where it always is; only the text column beside it
                    makes room when 완전 종속 속성 tags join it underneath. */}
                <span className="flex items-center gap-2 pr-6">
                  <Dot color={attribute.color} size={9} />
                  <span className="flex min-w-0 flex-col">
                    <span className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold">{attribute.label}</span>
                      {attribute.locked ? <LockIcon locked aria-label="잠김" width={12} height={12} className="-ml-0.5 shrink-0 opacity-70" /> : null}
                      {attribute.enabledCount !== null ? <span className="sr-only">, 값 {attribute.enabledCount}개 켜짐</span> : null}
                    </span>
                    {nestedIn(attribute.key).length > 0 ? (
                      <span className="chip-nest">
                        {nestedIn(attribute.key).map((child) => (
                          <span key={child.key} className="chip-nested" style={{ '--nested': child.color } as CSSProperties}>
                            {child.label}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                </span>
                {/* How many of its values are on: big and faint behind the label, cut off by the chip's edge.
                    After the label: the off-chip dimming rule finds the dot as the first child's first child. */}
                {attribute.enabledCount !== null ? (
                  <span aria-hidden className="chip-count">
                    <NumberFlow value={attribute.enabledCount} className="tnum" />
                  </span>
                ) : null}
              </button>
            </HapticTap>
            {/* A sibling, not a child: buttons cannot nest. */}
            <button
              type="button"
              aria-label={`${attribute.label} 값 목록`}
              className="chip-kebab press"
              onClick={() => {
                haptic.select()
                void router.navigate({ to: '/', search: { values: attribute.key ?? undefined } })
              }}
            >
              <KebabIcon width={16} height={16} />
            </button>
          </li>
        ))}
      </ul>

      <div className="ms-seq space-y-2" style={seq(3)}>
        {name.trim() === '' ? <p className="text-center text-[12.5px] text-muted">이름을 지어야 흔들 수 있어요.</p> : null}
        <Aura colors={auraColors} dim={!ready}>
          <HapticTap onTap={() => void confirm()} disabled={!ready}>
            <Button variant="primary" className="relative w-full overflow-hidden py-3 text-[15px]" disabled={!ready} onClick={() => void confirm()}>
              <AuraTint colors={auraColors} />
              <span className="relative flex items-center gap-1.5">
                <ShakeIcon width={18} height={18} />
                {/* How many characters this shake picks from, read the Korean way — 2억 5,891만 —
                    each group rolling digit by digit as chips and values change. */}
                {parts ? (
                  <span className="whitespace-nowrap text-[clamp(12.5px,3.55vw,14px)] tracking-[-0.01em] [word-break:keep-all]">
                    흔들어서{' '}
                    {parts.map((part) => (
                      <Fragment key={part.unit}>
                        <NumberFlow value={part.value} locales="ko-KR" className="tnum" />
                        {part.unit}{' '}
                      </Fragment>
                    ))}
                    개의 캐릭터 중 하나 뽑기
                  </span>
                ) : (
                  <span>흔들어서 셀 수 없이 많은 캐릭터 중 하나 뽑기</span>
                )}
              </span>
            </Button>
          </HapticTap>
        </Aura>
      </div>
    </div>
  )
}
