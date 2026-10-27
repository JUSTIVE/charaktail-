import { isBrowser } from './env.js'

/*
 * Overlay scrollbars (#56): zero rail thickness, a minimal handle floating
 * over the content, Apple-style. Native bars on `.ms-scroll` elements are
 * hidden by the stylesheet; this module draws the handle — visible while
 * scrolling or hovering, draggable, fading out after a beat.
 *
 * The handle lives inside the scroller as a sticky zero-height wrapper, so it
 * needs no positioned ancestor and costs no layout.
 */

interface ThumbState {
  wrapper: HTMLElement
  thumb: HTMLElement
  hideTimer: ReturnType<typeof setTimeout> | null
  dragging: boolean
  dragStartY: number
  dragStartScroll: number
}

const MIN_THUMB = 28
const INSET = 3
const HIDE_AFTER = 900

const states = new WeakMap<HTMLElement, ThumbState>()

function ensure(scroller: HTMLElement): ThumbState {
  let state = states.get(scroller)
  if (state) return state

  const wrapper = document.createElement('div')
  wrapper.className = 'ms-scrollbar'
  wrapper.setAttribute('aria-hidden', 'true')
  const thumb = document.createElement('div')
  thumb.className = 'ms-scrollbar-thumb'
  wrapper.appendChild(thumb)
  scroller.prepend(wrapper)

  state = { wrapper, thumb, hideTimer: null, dragging: false, dragStartY: 0, dragStartScroll: 0 }
  states.set(scroller, state)

  thumb.addEventListener('pointerdown', (event) => {
    const current = states.get(scroller)
    if (!current) return
    thumb.setPointerCapture(event.pointerId)
    current.dragging = true
    current.dragStartY = event.clientY
    current.dragStartScroll = scroller.scrollTop
    event.preventDefault()
  })
  thumb.addEventListener('pointermove', (event) => {
    const current = states.get(scroller)
    if (!current?.dragging) return
    const track = scroller.clientHeight - INSET * 2
    const range = scroller.scrollHeight - scroller.clientHeight
    const thumbHeight = thumb.offsetHeight
    const travel = track - thumbHeight
    if (travel <= 0 || range <= 0) return
    scroller.scrollTop = current.dragStartScroll + ((event.clientY - current.dragStartY) * range) / travel
  })
  const endDrag = () => {
    const current = states.get(scroller)
    if (current) current.dragging = false
    scheduleHide(scroller)
  }
  thumb.addEventListener('pointerup', endDrag)
  thumb.addEventListener('pointercancel', endDrag)

  return state
}

function scheduleHide(scroller: HTMLElement): void {
  const state = states.get(scroller)
  if (!state) return
  if (state.hideTimer) clearTimeout(state.hideTimer)
  state.hideTimer = setTimeout(() => {
    if (!state.dragging) state.thumb.removeAttribute('data-visible')
  }, HIDE_AFTER)
}

function update(scroller: HTMLElement): void {
  const range = scroller.scrollHeight - scroller.clientHeight
  if (range <= 1) {
    const existing = states.get(scroller)
    existing?.thumb.removeAttribute('data-visible')
    return
  }
  const state = ensure(scroller)
  const track = scroller.clientHeight - INSET * 2
  const thumbHeight = Math.max((scroller.clientHeight / scroller.scrollHeight) * track, MIN_THUMB)
  const offset = INSET + (scroller.scrollTop / range) * (track - thumbHeight)
  state.thumb.style.blockSize = `${Math.round(thumbHeight)}px`
  state.thumb.style.transform = `translateY(${Math.round(offset)}px)`
  state.thumb.setAttribute('data-visible', 'true')
  scheduleHide(scroller)
}

function findScroller(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null
  const scroller = target.closest('.ms-scroll')
  return scroller instanceof HTMLElement ? scroller : null
}

/**
 * Installs the delegated behavior once per document. Any element carrying
 * `ms-scroll` — the library adds it to every sheet body — gets the overlay
 * handle. Returns an uninstaller.
 */
export function installOverlayScrollbars(root: Document = document): () => void {
  if (!isBrowser()) return () => {}

  const onScroll = (event: Event): void => {
    const scroller = findScroller(event.target)
    if (scroller) update(scroller)
  }
  const onPointerOver = (event: Event): void => {
    const scroller = findScroller(event.target)
    if (scroller) update(scroller)
  }

  root.addEventListener('scroll', onScroll, true)
  root.addEventListener('pointerover', onPointerOver, true)
  return () => {
    root.removeEventListener('scroll', onScroll, true)
    root.removeEventListener('pointerover', onPointerOver, true)
  }
}
