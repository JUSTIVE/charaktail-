import { Cell } from '../state/cell'
import type { StageMode, StageStatus } from '../state/schema'
import { initialMotionAccess } from './motion'

export type { StageMode, StageStatus }

/**
 * The stage's status. Components never read this cell directly — it reaches
 * them as the live `Query.stage` field (src/graph/stageStatus.ts).
 */
export const stageCell = new Cell<StageStatus>({ mode: 'idle', motion: initialMotionAccess() })

export function patchStage(patch: Partial<StageStatus>): void {
  stageCell.set((current) =>
    Object.entries(patch).every(([k, v]) => current[k as keyof StageStatus] === v) ? current : { ...current, ...patch },
  )
}
