import { useState } from 'react'

import { router } from '../../router'
import { nameCell, NAME_MAX, setName } from '../../state/name'
import { haptic } from '../../stage/haptics'
import { HapticTap } from '../HapticTap'
import { Button, seq } from '../ui'

/**
 * Step one: the name — the one thing the player decides. Which attributes go
 * into the roll is the next step (/pick).
 */
export function NameStep() {
  // The input owns its text while typing (a controlled value fed back from a
  // live field would fight Korean IME composition); the draft cell is written
  // on every change.
  const [name, setNameText] = useState(() => nameCell.read())
  const ready = name.trim() !== ''

  const next = () => {
    if (!ready) return
    haptic.press()
    void router.navigate({ to: '/pick' })
  }

  return (
    <form
      data-stage-floor
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        next()
      }}
    >
      <div className="ms-seq" style={seq(0)}>
        <h1 className="display">이 캐릭터의 이름은?</h1>
        <p className="text-[12.5px] text-muted">이름만 지어 주면, 나머지는 흔들어서 정해요.</p>
      </div>

      <label className="ms-seq name-field" style={seq(1)}>
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
          enterKeyHint="next"
          className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold outline-none placeholder:font-normal placeholder:text-faint"
        />
      </label>

      <div className="ms-seq" style={seq(2)}>
        <HapticTap onTap={next} disabled={!ready}>
          <Button type="submit" variant="primary" className="w-full py-3 text-[15px]" disabled={!ready}>
            {ready ? '좋아요, 이 이름으로 할게요' : '이름을 먼저 지어 주세요'}
          </Button>
        </HapticTap>
      </div>
    </form>
  )
}
