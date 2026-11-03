/*
 * #187 — the result's cards play in twice on Safari, and nowhere else we can
 * watch. Opening the app once with `?debug=1` turns this recorder on (it stays
 * on until `?debug=0`): from the reveal on, it notes for a few seconds every
 * navigation, every morph beat on the panel and every entrance animation that
 * starts, and the result screen offers the notes to copy.
 */
const FLAG = 'charaktail:debug'
const LOG = 'charaktail:debug-log'

export const debugOn = (() => {
  try {
    const param = new URLSearchParams(location.search).get('debug')
    if (param === '1') localStorage.setItem(FLAG, '1')
    if (param === '0') localStorage.removeItem(FLAG)
    return localStorage.getItem(FLAG) === '1'
  } catch {
    return false
  }
})()

let stop: (() => void) | null = null

/** Starts a fresh recording; ends by itself after `ms`. */
export function recordTimeline(label: string, ms = 4000): void {
  if (!debugOn) return
  stop?.()
  const t0 = performance.now()
  const lines: string[] = [`${label} · ${navigator.userAgent}`]
  const note = (text: string) => lines.push(`${String(Math.round(performance.now() - t0)).padStart(5)} ${text}`)
  const save = () => {
    try {
      localStorage.setItem(LOG, lines.join('\n'))
    } catch {
      // Storage full or blocked: the copy button reports what it has.
    }
  }
  const textOf = (el: Element) => (el.textContent ?? '').replace(/\s+/g, ' ').slice(0, 12)

  const onAnimation = (event: AnimationEvent) => {
    if (!/^ms-|star-pop/.test(event.animationName)) return
    note(`${event.type.replace('animation', '')} ${event.animationName} [${textOf(event.target as Element)}]`)
  }
  const kinds = ['animationstart', 'animationcancel'] as const
  for (const kind of kinds) document.addEventListener(kind, onAnimation, true)

  const observer = new MutationObserver((records) => {
    for (const r of records) {
      const el = r.target as Element
      if (r.type === 'attributes') note(`${r.attributeName}=${el.getAttribute(r.attributeName ?? '') ?? '∅'} <${el.className.toString().split(' ')[0]}>`)
      else if (r.addedNodes.length || r.removedNodes.length) {
        const added = [...r.addedNodes].filter((n) => n instanceof Element).map((n) => textOf(n as Element))
        const removed = [...r.removedNodes].filter((n) => n instanceof Element).map((n) => textOf(n as Element))
        if (added.some(Boolean) || removed.some(Boolean)) note(`dom +[${added.join('|')}] -[${removed.join('|')}] in <${el.className.toString().split(' ')[0]}>`)
      }
    }
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-content-state', 'data-entering', 'data-exiting', 'data-phase'], subtree: true, childList: true })
  const rootObserver = new MutationObserver(() => note(`html phase=${document.documentElement.getAttribute('data-ms-phase') ?? '∅'}`))
  rootObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-ms-phase'] })

  const push = history.pushState.bind(history)
  const replace = history.replaceState.bind(history)
  history.pushState = (...args) => {
    note(`push ${String(args[2]).slice(0, 40)}`)
    push(...args)
  }
  history.replaceState = (...args) => {
    note(`replace ${String(args[2]).slice(0, 40)}`)
    replace(...args)
  }

  const timer = setTimeout(() => stop?.(), ms)
  stop = () => {
    clearTimeout(timer)
    for (const kind of kinds) document.removeEventListener(kind, onAnimation, true)
    observer.disconnect()
    rootObserver.disconnect()
    history.pushState = push
    history.replaceState = replace
    note('end')
    save()
    stop = null
  }
}

export function savedTimeline(): string {
  try {
    return localStorage.getItem(LOG) ?? '(기록 없음 — 흔들어서 결과를 한 번 본 뒤 4초 기다려 주세요)'
  } catch {
    return '(저장소를 읽을 수 없어요)'
  }
}
