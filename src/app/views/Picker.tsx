import { useState, type CSSProperties } from 'react'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'

import { router } from '../../router'
import { currentName, NAME_MAX, setName } from '../../state/name'
import { selectAll, selectionCell, toggleAttribute } from '../../state/selection'
import { requestMotionAccess } from '../../stage/motion'
import { patchStage } from '../../stage/store'
import { KebabIcon, ShakeIcon } from '../icons'
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
        }
        stage {
          motion
        }
        attributes {
          key
          label
          color
          selected
        }
      }
    `,
    {},
  )
  const attributes = data.attributes ?? []
  const count = attributes.filter((a) => a.selected).length
  const allOn = count === attributes.length
  // The input owns its text while typing (a controlled value fed back from a
  // live field would fight Korean IME composition); the draft cell is written
  // on every change and read back through Relay for everything else.
  const [name, setNameText] = useState(data.draft?.name ?? '')
  const ready = data.draft?.canShake ?? false

  const confirm = async () => {
    if (!ready) return
    // iOS only grants motion from inside the tap that asked for it.
    if (data.stage?.motion === 'prompt') patchStage({ motion: await requestMotionAccess() })
    void router.navigate({ to: '/shake', search: { a: selectionCell.read().join('.'), n: currentName() } })
  }

  return (
    <div data-stage-floor className="space-y-4">
      <div className="ms-seq flex items-end justify-between gap-3" style={seq(0)}>
        <div>
          <h1 className="display">어떤 캐릭터를 뽑을까요?</h1>
        </div>
        <Button variant="ghost" className="shrink-0 px-2.5 py-1.5 text-[12.5px]" onClick={() => selectAll(!allOn)}>
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
        {attributes.map((attribute) => (
          <li key={attribute.key} className="ms-item relative">
            <button
              type="button"
              aria-pressed={attribute.selected ?? false}
              onClick={() => toggleAttribute(attribute.key ?? '')}
              className="chip press-soft"
              style={{ '--chip': attribute.color } as CSSProperties}
            >
              <span className="flex items-center gap-2 pr-6">
                <Dot color={attribute.color ?? '#888'} size={9} />
                <span className="text-[14px] font-semibold">{attribute.label}</span>
              </span>
            </button>
            {/* A sibling, not a child: buttons cannot nest. */}
            <button
              type="button"
              aria-label={`${attribute.label} 값 목록`}
              className="chip-kebab press"
              onClick={() => void router.navigate({ to: '/', search: { values: attribute.key ?? undefined } })}
            >
              <KebabIcon width={16} height={16} />
            </button>
          </li>
        ))}
      </ul>

      <div className="ms-seq space-y-2" style={seq(3)}>
        {name.trim() === '' ? <p className="text-center text-[12.5px] text-muted">이름을 지어야 흔들 수 있어요.</p> : null}
        <Button variant="primary" className="w-full py-3 text-[15px]" disabled={!ready} onClick={() => void confirm()}>
          <ShakeIcon width={18} height={18} />
          {count}개로 흔들기
        </Button>
      </div>
    </div>
  )
}
