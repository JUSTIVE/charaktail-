/*
 * Device motion, normalised to screen space.
 *
 * Tilt comes from `deviceorientation` (beta/gamma), which reads the same on
 * iOS and Android; shakes come from `devicemotion.acceleration` — gravity
 * already removed — whose sign conventions differ between engines but whose
 * magnitude does not, and magnitude is what a shake is.
 */

import type { MotionAccess } from '../state/schema'

export type { MotionAccess }

type PermissionCapable = { requestPermission?: () => Promise<'granted' | 'denied'> }

export function initialMotionAccess(): MotionAccess {
  if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return 'unsupported'
  const needsPrompt = typeof (DeviceMotionEvent as unknown as PermissionCapable).requestPermission === 'function'
  // Desktop browsers expose the constructor too; whether events ever arrive is
  // only known once they do (see `listen`).
  return needsPrompt ? 'prompt' : 'unknown'
}

/** iOS asks once, and only from inside a user gesture. */
export async function requestMotionAccess(): Promise<MotionAccess> {
  const motion = DeviceMotionEvent as unknown as PermissionCapable
  const orientation = (window.DeviceOrientationEvent ?? {}) as unknown as PermissionCapable
  if (typeof motion.requestPermission !== 'function') return 'granted'
  try {
    const [m] = await Promise.all([motion.requestPermission(), orientation.requestPermission?.()])
    return m === 'granted' ? 'granted' : 'denied'
  } catch {
    return 'denied'
  }
}

function screenAngle(): number {
  return (screen.orientation?.angle ?? (window as unknown as { orientation?: number }).orientation ?? 0) * (Math.PI / 180)
}

/** Rotates a device-frame vector into the current screen frame. */
function toScreen(x: number, y: number): { x: number; y: number } {
  const a = screenAngle()
  const c = Math.cos(a)
  const s = Math.sin(a)
  return { x: x * c + y * s, y: -x * s + y * c }
}

export interface MotionHandlers {
  /** Gravity in screen space, each axis in [-1, 1]. */
  onTilt: (g: { x: number; y: number }) => void
  /** Linear acceleration in screen space, m/s². */
  onShake: (a: { x: number; y: number; magnitude: number }) => void
  /** First real sensor reading — this device has motion. */
  onAlive: () => void
}

export function listenMotion(handlers: MotionHandlers): () => void {
  let alive = false
  const markAlive = () => {
    if (alive) return
    alive = true
    handlers.onAlive()
  }

  const onOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta === null || event.gamma === null) return
    markAlive()
    const rad = Math.PI / 180
    handlers.onTilt(toScreen(Math.sin(event.gamma * rad), Math.sin(event.beta * rad)))
  }

  const onMotion = (event: DeviceMotionEvent) => {
    const a = event.acceleration
    if (!a || a.x === null || a.y === null) return
    markAlive()
    const z = a.z ?? 0
    // Screen-space y grows downward; device y grows upward.
    const s = toScreen(a.x, -a.y)
    handlers.onShake({ x: s.x, y: s.y, magnitude: Math.hypot(a.x, a.y, z) })
  }

  window.addEventListener('deviceorientation', onOrientation)
  window.addEventListener('devicemotion', onMotion)
  return () => {
    window.removeEventListener('deviceorientation', onOrientation)
    window.removeEventListener('devicemotion', onMotion)
  }
}
