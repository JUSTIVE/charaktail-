import type { DataID } from 'relay-runtime'

import { stageCell } from '../stage/store'

/*
 * The stage's choreography and the motion-sensor permission, as a node. The
 * stage writes its cell; the HUD, the header and the result read these
 * live fields.
 */

export interface StageStatusModel {
  id: DataID
}

/**
 * @relayType StageStatus
 */
export function StageStatus(id: DataID): StageStatusModel | null {
  return id === 'stage' ? { id } : null
}

/**
 * idle · armed · mixing · glowing · revealed
 * @relayField StageStatus.mode: StageMode!
 * @live
 */
export function mode(_stage: StageStatusModel) {
  return stageCell.live((s) => s.mode)
}

/**
 * unknown · prompt · granted · denied · unsupported
 * @relayField StageStatus.motion: MotionAccess!
 * @live
 */
export function motion(_stage: StageStatusModel) {
  return stageCell.live((s) => s.motion)
}
