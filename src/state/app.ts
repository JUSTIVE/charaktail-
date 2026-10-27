import { Cell } from './cell'
import type { AppStatus } from './schema'

/**
 * Service-worker status. Written by the registration in main.tsx; read only
 * through the live `Query.app` field (src/graph/appStatus.ts).
 */
export const appCell = new Cell<AppStatus>({ updateReady: false, offlineReady: false })

let applyUpdate: (() => Promise<void>) | null = null

/** main.tsx hands over the registration's update function. */
export function setUpdater(update: () => Promise<void>): void {
  applyUpdate = update
}

export function markUpdateReady(): void {
  appCell.set((s) => ({ ...s, updateReady: true }))
}

export function markOfflineReady(): void {
  appCell.set((s) => ({ ...s, offlineReady: true }))
}

export function dismissOfflineReady(): void {
  appCell.set((s) => ({ ...s, offlineReady: false }))
}

/** Activates the waiting service worker; the page reloads into the new version. */
export async function installUpdate(): Promise<void> {
  if (applyUpdate) await applyUpdate()
  else location.reload()
}
