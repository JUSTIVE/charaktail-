import { useEffect, useRef } from 'react'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

import { freshSeed } from '../domain/rng'
import { encodeRollKey } from '../domain/roll'
import { router } from '../router'
import { selectionCell } from '../state/selection'
import { Stage } from '../stage/Stage'
import type { StageCanvasQuery } from '../__generated__/StageCanvasQuery.graphql'

/** The one stage; the shake HUD reaches it for the hold-to-shake fallback. */
export const stageHandle: { current: Stage | null } = { current: null }

/**
 * Full-bleed canvas behind every sheet. The balls are whatever attributes are
 * selected — a live field, so ticking a chip in the picker drops a ball in.
 */
export function StageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const data = useLazyLoadQuery<StageCanvasQuery>(
    graphql`
      query StageCanvasQuery {
        selectedAttributes {
          key
          label
          color
        }
      }
    `,
    {},
    { fetchPolicy: 'store-only' },
  )

  useEffect(() => {
    const stage = new Stage(canvasRef.current!)
    stage.onReveal = () => {
      const key = encodeRollKey({ seed: freshSeed(), attributeIds: selectionCell.read() })
      void router.navigate({ to: '/result', search: { k: key }, replace: true })
    }
    stageHandle.current = stage
    return () => {
      stage.dispose()
      if (stageHandle.current === stage) stageHandle.current = null
    }
  }, [])

  const balls = (data.selectedAttributes ?? []).map((a) => ({ id: a.key ?? '', label: a.label ?? '', color: a.color ?? '#888888' }))
  const signature = balls.map((b) => b.id).join('.')
  useEffect(() => {
    stageHandle.current?.setBalls(balls)
    // signature is the identity of the ball set; the array is rebuilt every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  return <canvas ref={canvasRef} className="stage" aria-label="속성 메타볼" />
}
