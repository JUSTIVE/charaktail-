import type { DataID } from 'relay-runtime'

import { appCell } from '../state/app'

/*
 * The installed app itself, as a node: whether a new version is waiting and
 * whether the app is ready offline.
 */

export interface AppModel {
  id: DataID
}

/**
 * @relayType App
 */
export function App(id: DataID): AppModel | null {
  return id === 'app' ? { id } : null
}

/**
 * A new version is downloaded and waiting for the player to accept it.
 * @relayField App.updateReady: Boolean!
 * @live
 */
export function updateReady(_app: AppModel) {
  return appCell.live((s) => s.updateReady)
}

/**
 * Everything is cached; the app works without a connection.
 * @relayField App.offlineReady: Boolean!
 * @live
 */
export function offlineReady(_app: AppModel) {
  return appCell.live((s) => s.offlineReady)
}
