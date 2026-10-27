import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'

import { requestMotionAccess } from '../../stage/motion'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'
import { patchStage, type StageMode } from '../../stage/store'
import type { ShakeHudQuery } from '../../__generated__/ShakeHudQuery.graphql'
import { stageHandle } from '../StageCanvas'
import { BackIcon, ShakeIcon } from '../icons'
import { Button, seq } from '../ui'

const COPY: Record<StageMode, { title: string; body: string }> = {
  idle: { title: '준비 중', body: '' },
  armed: { title: '세게 흔들어 주세요', body: '게이지가 차면 속성들이 섞이기 시작해요.' },
  mixing: { title: '섞이는 중…', body: '' },
  glowing: { title: '빛이 차오른다', body: '거의 다 됐어요.' },
  revealed: { title: '완성!', body: '' },
}

/**
 * Step two: a small HUD over the stage. The stage writes the charge meter's
 * transform itself every frame — no React render, no document-wide restyle.
 */
export function ShakeHud() {
  const data = useLocalQuery<ShakeHudQuery>(
    graphql`
      query ShakeHudQuery {
        stage {
          mode
          motion
        }
      }
    `,
    {},
  )
  const mode = (data.stage?.mode ?? 'armed') as StageMode
  const motion = data.stage?.motion ?? 'unknown'
  const copy = COPY[mode]
  const busy = mode === 'mixing' || mode === 'glowing'

  // Leaving mid-hold must not leave the stage shaking.
  useEffect(() => () => stageHandle.current?.setManualShake(false), [])

  // A release can land anywhere — the button may already be hidden under the
  // finger — so the window hears it, not the button.
  useEffect(() => {
    const release = () => stageHandle.current?.setManualShake(false)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [])

  const meter = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = meter.current
    if (!el) return
    // On a cold load straight to /shake the stage may mount a tick later.
    let stage = stageHandle.current
    const attach = () => {
      stage = stageHandle.current
      stage?.meters.add(el)
    }
    const timer = stage ? 0 : window.setTimeout(attach, 0)
    stage?.meters.add(el)
    return () => {
      window.clearTimeout(timer)
      stage?.meters.delete(el)
    }
  }, [])

  const hold = (on: boolean) => () => stageHandle.current?.setManualShake(on)

  return (
    <div data-stage-floor className="space-y-4" data-busy={busy || undefined}>
      <div className="ms-seq flex items-start gap-3" style={seq(0)}>
        <span className="shake-icon grid size-11 shrink-0 place-items-center rounded-[14px] bg-white/[0.06]" data-mode={mode}>
          <ShakeIcon width={22} height={22} />
        </span>
        <div className="min-w-0">
          <h2 className="headline">{copy.title}</h2>
          {copy.body ? <p className="mt-0.5 text-[12.5px] text-muted">{copy.body}</p> : null}
        </div>
      </div>

      <div className="ms-seq charge" style={seq(1)} data-mode={mode}>
        <span ref={meter} />
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
