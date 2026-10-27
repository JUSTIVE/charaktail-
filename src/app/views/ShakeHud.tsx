import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'

import { requestMotionAccess } from '../../stage/motion'
import { patchStage, useStage, type StageMode } from '../../stage/store'
import { stageHandle } from '../StageCanvas'
import { BackIcon, ShakeIcon } from '../icons'
import { Button, seq } from '../ui'

const COPY: Record<StageMode, { title: string; body: string }> = {
  idle: { title: '준비 중', body: '' },
  armed: { title: '세게 흔들어 주세요', body: '게이지가 차면 속성들이 섞이기 시작해요.' },
  mixing: { title: '섞이는 중…', body: '글자가 녹고 색이 하나로 번져요.' },
  glowing: { title: '빛이 차오른다', body: '거의 다 됐어요.' },
  revealed: { title: '완성!', body: '' },
}

/**
 * Step two: a small HUD over the stage. The charge meter reads `--charge`,
 * which the stage writes every frame — no React render per frame.
 */
export function ShakeHud() {
  const { mode, motion } = useStage()
  const copy = COPY[mode]
  const busy = mode === 'mixing' || mode === 'glowing'

  // Leaving mid-hold must not leave the stage shaking.
  useEffect(() => () => stageHandle.current?.setManualShake(false), [])

  const hold = (on: boolean) => () => stageHandle.current?.setManualShake(on)

  return (
    <div data-stage-floor className="space-y-4" data-busy={busy || undefined}>
      <div className="ms-seq flex items-start gap-3" style={seq(0)}>
        <span className="shake-icon grid size-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06]" data-mode={mode}>
          <ShakeIcon width={22} height={22} />
        </span>
        <div className="min-w-0">
          <p className="eyebrow">STEP 2 · 흔들기</p>
          <h2 className="headline mt-0.5">{copy.title}</h2>
          <p className="mt-0.5 text-[12.5px] text-muted">{copy.body}</p>
        </div>
      </div>

      <div className="ms-seq charge" style={seq(1)} data-mode={mode}>
        <span />
      </div>

      <div className="ms-seq flex items-center gap-2" style={seq(2)} hidden={busy}>
        <Link to="/" className="press grid size-11 place-items-center rounded-[14px] text-muted hover:text-ink" aria-label="다시 고르기">
          <BackIcon />
        </Link>
        {motion === 'prompt' || motion === 'denied' ? (
          <Button
            className="flex-1"
            disabled={motion === 'denied'}
            onClick={() => void requestMotionAccess().then((access) => patchStage({ motion: access }))}
          >
            {motion === 'denied' ? '모션 센서가 꺼져 있어요' : '모션 센서 켜기'}
          </Button>
        ) : null}
        <Button
          variant={motion === 'granted' ? 'secondary' : 'primary'}
          className="flex-1 select-none touch-none"
          onPointerDown={hold(true)}
          onPointerUp={hold(false)}
          onPointerLeave={hold(false)}
          onPointerCancel={hold(false)}
          onContextMenu={(event) => event.preventDefault()}
        >
          {motion === 'granted' ? '버튼으로 흔들기' : '누르고 있으면 흔들려요'}
        </Button>
      </div>
    </div>
  )
}
