import { isBrowser } from './env.js'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function focusableWithin(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  )
}

/**
 * Keeps Tab focus inside `container` and returns focus to wherever it was when
 * the trap is released.
 */
export function trapFocus(container: HTMLElement): () => void {
  if (!isBrowser()) return () => {}

  const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
  const initial = focusableWithin(container)[0] ?? container
  initial.focus({ preventScroll: true })

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return

    const focusable = focusableWithin(container)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) {
      event.preventDefault()
      return
    }

    const active = document.activeElement
    if (event.shiftKey && (active === first || !container.contains(active))) {
      event.preventDefault()
      last.focus({ preventScroll: true })
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus({ preventScroll: true })
    }
  }

  document.addEventListener('keydown', onKeyDown, true)

  return () => {
    document.removeEventListener('keydown', onKeyDown, true)
    previouslyFocused?.focus({ preventScroll: true })
  }
}
