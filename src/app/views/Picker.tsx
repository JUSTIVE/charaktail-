import { useSyncExternalStore, type CSSProperties } from 'react'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

import { router } from '../../router'
import { currentName, NAME_MAX, nameCell, setName } from '../../state/name'
import { selectAll, selectionCell, toggleAttribute } from '../../state/selection'
import { requestMotionAccess } from '../../stage/motion'
import { patchStage, stageCell } from '../../stage/store'
import { ShakeIcon } from '../icons'
import { Button, Dot, seq, Swatches } from '../ui'
import type { PickerQuery } from '../../__generated__/PickerQuery.graphql'

/**
 * Step one: which attributes go into the roll. Every chip is catalogue data
 * read through Relay — a new attribute file shows up here with no UI change.
 */
export function Picker() {
  const data = useLazyLoadQuery<PickerQuery>(
    graphql`
      query PickerQuery {
        attributes {
          key
          label
          color
          summary
          selected
          preview
          swatches
        }
      }
    `,
    {},
    { fetchPolicy: 'store-only' },
  )
  const attributes = data.attributes ?? []
  const count = attributes.filter((a) => a.selected).length
  const allOn = count === attributes.length
  const name = useSyncExternalStore(nameCell.subscribe, nameCell.read)
  const ready = count > 0 && name.trim() !== ''

  const confirm = async () => {
    if (!ready) return
    // iOS only grants motion from inside the tap that asked for it.
    if (stageCell.read().motion === 'prompt') patchStage({ motion: await requestMotionAccess() })
    void router.navigate({ to: '/shake', search: { a: selectionCell.read().join('.'), n: currentName() } })
  }

  return (
    <div data-stage-floor className="space-y-4">
      <div className="ms-seq flex items-end justify-between gap-3" style={seq(0)}>
        <div>
          <p className="eyebrow">STEP 1 · 속성 고르기</p>
          <h1 className="display mt-1">어떤 캐릭터를 뽑을까요?</h1>
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
            onChange={(event) => setName(event.target.value)}
            maxLength={NAME_MAX}
            placeholder="캐릭터 이름을 지어 주세요"
            autoComplete="off"
            enterKeyHint="go"
            className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none placeholder:font-normal placeholder:text-faint"
          />
        </label>
      </form>

      <ul className="ms-seq picker-list grid grid-cols-2 gap-2 sm:grid-cols-3" style={seq(2)}>
        {attributes.map((attribute) => (
          <li key={attribute.key}>
            <button
              type="button"
              aria-pressed={attribute.selected ?? false}
              onClick={() => toggleAttribute(attribute.key ?? '')}
              className="chip press"
              style={{ '--chip': attribute.color } as CSSProperties}
            >
              <span className="flex items-center gap-2">
                <Dot color={attribute.color ?? '#888'} size={9} />
                <span className="text-[14px] font-semibold">{attribute.label}</span>
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[11.5px] text-faint">
                {(attribute.swatches?.length ?? 0) > 0 ? <Swatches colors={attribute.swatches!.slice(0, 4)} /> : null}
                <span className="truncate">{attribute.summary}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="ms-seq flex items-center gap-3" style={seq(3)}>
        <p className="text-[12.5px] text-muted">
          {name.trim() === '' ? '이름을 지어야 흔들 수 있어요.' : '위의 공을 끌어서 던져볼 수도 있어요.'}
        </p>
        <Button variant="primary" className="ml-auto shrink-0 px-5" disabled={!ready} onClick={() => void confirm()}>
          <ShakeIcon width={17} height={17} />
          {count}개로 흔들기
        </Button>
      </div>
    </div>
  )
}
