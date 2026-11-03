/*
 * The app's only mutable state. Relay live resolvers subscribe to these cells,
 * so a toggle re-renders exactly the components whose fields read it — no
 * network, no mutations, no store writes.
 */
type Listener = () => void

export class Cell<T> {
  private value: T
  private listeners = new Set<Listener>()

  /** With `storageKey`, the value survives reloads (and installs, for a PWA). */
  constructor(
    initial: T,
    private readonly storageKey?: string,
    revive: (stored: unknown) => T | null = (stored) => stored as T,
  ) {
    this.value = initial
    if (!storageKey) return
    try {
      const raw = localStorage.getItem(storageKey)
      const restored = raw === null ? null : revive(JSON.parse(raw))
      if (restored !== null) this.value = restored
    } catch {
      // Private mode or corrupt JSON — start fresh.
    }
  }

  read = (): T => this.value

  set = (next: T | ((current: T) => T)): void => {
    const resolved = typeof next === 'function' ? (next as (c: T) => T)(this.value) : next
    if (Object.is(resolved, this.value)) return
    this.value = resolved
    if (this.storageKey) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(resolved))
      } catch {
        // Quota or private mode — the in-memory value still works.
      }
    }
    for (const listener of this.listeners) listener()
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /** The shape a Relay `@live` resolver returns. */
  live = <R = T>(select: (value: T) => R = (v) => v as unknown as R) => ({
    read: () => select(this.value),
    subscribe: this.subscribe,
  })
}

/**
 * A live value read from several cells at once — Relay subscribes to them all.
 * Recomputed only when one of them changed, and the previous result is kept
 * when the new one is shallowly equal, so a change elsewhere re-renders
 * nothing that reads this.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function liveOf<R extends object>(cells: readonly Cell<any>[], compute: () => R) {
  let inputs: unknown[] | null = null
  let result: R | null = null
  return {
    read: (): R => {
      const now = cells.map((cell) => cell.read())
      if (result && inputs && now.every((v, i) => Object.is(v, inputs![i]))) return result
      inputs = now
      const next = compute()
      if (!result || !shallowEqual(result, next)) result = next
      return result
    },
    subscribe: (listener: Listener): (() => void) => {
      const offs = cells.map((cell) => cell.subscribe(listener))
      return () => offs.forEach((off) => off())
    },
  }
}

function shallowEqual(a: object, b: object): boolean {
  const ka = Object.keys(a)
  if (ka.length !== Object.keys(b).length) return false
  return ka.every((k) => Object.is((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
}
