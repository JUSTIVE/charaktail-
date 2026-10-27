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
