import { isBrowser } from './env.js'

let locks = 0
let restore: (() => void) | null = null

/**
 * Locks background scrolling while a sheet is open. Reference counted, so
 * nested or overlapping sheets unlock only once the last one closes.
 */
export function lockScroll(): () => void {
  if (!isBrowser()) return () => {}

  locks += 1
  if (locks === 1) {
    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    restore = () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }

  let released = false
  return () => {
    if (released) return
    released = true
    locks -= 1
    if (locks === 0) {
      restore?.()
      restore = null
    }
  }
}
