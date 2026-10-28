/*
 * Vibration. Android exposes `navigator.vibrate`; iOS Safari does not, but
 * since 17.4 toggling a native `<input type="checkbox" switch>` plays a system
 * haptic tick. That tick only plays while the tap that caused it is still
 * being handled — a `setTimeout`, even of 0ms, is already too late — so the
 * first tick of a pattern fires synchronously and later ones are best effort.
 * The moments the stage plays on its own (mixing, glow, reveal) have no tap
 * behind them and stay silent on iOS.
 */

/*
 * The iOS tick, done the way that is known to work on iPhones (the
 * ios-haptics technique): a fresh, hidden `<label>` around a switch checkbox,
 * clicked and removed straight away. Only on touch screens — a desktop has
 * nothing to tick.
 */
const touch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches

function iosTick(): void {
  if (!touch) return
  try {
    const label = document.createElement('label')
    label.ariaHidden = 'true'
    label.style.display = 'none'
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.setAttribute('switch', '')
    label.append(input)
    document.head.append(label)
    label.click()
    label.remove()
  } catch {
    // No haptics is never worth an error.
  }
}

/** `pattern`: on/off durations in ms, like `navigator.vibrate`. */
export function vibrate(pattern: number[]): void {
  if (typeof navigator.vibrate === 'function' && navigator.vibrate(pattern)) return
  iosTick()
  let at = 0
  pattern.forEach((duration, index) => {
    if (index > 0 && index % 2 === 0) setTimeout(iosTick, at)
    at += duration
  })
}

/**
 * The app's haptic vocabulary — one name per moment, strength rising toward
 * the reveal. Frequent touches get the lightest, shortest ticks; the climax
 * gets the one long buzz. Keep new moments in this table rather than
 * inventing patterns at call sites.
 */
export const haptic = {
  /** Toggling a chip, a switch, opening a value list. */
  select: () => vibrate([7]),
  /** A deliberate press: the shake CTA, accepting an update. */
  press: () => vibrate([12]),
  /** Re-rolling one attribute. */
  reroll: () => vibrate([12]),
  /** Saving: a small double tick. */
  save: () => vibrate([10, 40, 16]),
  /** The charge crossing a quarter while shaking: 1, 2, 3 → stronger. */
  charge: (quarter: number) => vibrate([6 + quarter * 4]),
  /** The meter is full and the colours start to run. */
  mix: () => vibrate([28, 45, 28, 45, 40]),
  /**
   * The glow building over its 1.5s: pulses closing in and lengthening,
   * ending ~0.25s before the flash so the reveal buzz lands clean.
   */
  glow: () => vibrate([16, 300, 20, 240, 26, 180, 32, 130, 40, 90, 50, 60, 64]),
  /** The flash: the one strong buzz. */
  reveal: () => vibrate([90, 40, 160]),
}
