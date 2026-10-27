/*
 * Vibration. Android exposes `navigator.vibrate`; iOS Safari does not, but
 * since 17.4 toggling a native `<input type="checkbox" switch>` plays a system
 * haptic tick — so a pattern on iOS becomes a few ticks spaced to match.
 */

let switchLabel: HTMLLabelElement | null = null

function iosTick(): void {
  if (!switchLabel) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.setAttribute('switch', '')
    input.id = 'charaktail-haptic'
    switchLabel = document.createElement('label')
    switchLabel.htmlFor = input.id
    switchLabel.setAttribute('aria-hidden', 'true')
    switchLabel.style.cssText = 'position:fixed;inset:auto;width:1px;height:1px;opacity:0;pointer-events:none'
    switchLabel.append(input)
    document.body.append(switchLabel)
  }
  switchLabel.click()
}

/** `pattern`: on/off durations in ms, like `navigator.vibrate`. */
export function vibrate(pattern: number[]): void {
  if (typeof navigator.vibrate === 'function' && navigator.vibrate(pattern)) return
  let at = 0
  pattern.forEach((duration, index) => {
    if (index % 2 === 0) setTimeout(iosTick, at)
    at += duration
  })
}
