import { useSyncExternalStore } from 'react'

import { Cell } from '../state/cell'
import { initialMotionAccess, type MotionAccess } from './motion'

/**
 * The stage's choreography, as the UI sees it.
 *
 *   idle      balls drift above the picker, labels on
 *   armed     waiting for a hard shake; charge fills as you shake
 *   mixing    labels gone, colours melt, everything swirls to the centre
 *   glowing   one body, lighting up — ends in a flash and a buzz
 *   revealed  the orb rests, softly lit, under the result
 */
export type StageMode = 'idle' | 'armed' | 'mixing' | 'glowing' | 'revealed'

export interface StageStatus {
  mode: StageMode
  motion: MotionAccess
}

export const stageCell = new Cell<StageStatus>({ mode: 'idle', motion: initialMotionAccess() })

export function patchStage(patch: Partial<StageStatus>): void {
  stageCell.set((current) =>
    Object.entries(patch).every(([k, v]) => current[k as keyof StageStatus] === v) ? current : { ...current, ...patch },
  )
}

export function useStage(): StageStatus {
  return useSyncExternalStore(stageCell.subscribe, stageCell.read)
}
