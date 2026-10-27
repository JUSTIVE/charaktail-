import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'

/*
 * The sheet inspector (#26, promoted to the library by #74). It lives OUTSIDE
 * the sheet system on purpose: its modal is a plain overlay, never a region,
 * so the tool cannot disturb what it observes. Hierarchy data is read from the
 * rendered DOM — what is on screen is the truth being debugged. Styling is
 * self-contained (.ms-inspector-* in the library stylesheet); no app tokens.
 */

interface SlotInfo {
  key: string
  stackId: string
  tier: string
  depth: number
  viewCount: number
  entering: boolean
  exiting: boolean
  rect: { top: number; left: number; width: number; height: number }
}

interface RegionInfo {
  stackId: string
  tier: string
  modal: boolean
  inline: boolean
  placement: string
  phase: string
  slots: SlotInfo[]
}

interface ItemInfo {
  key: string
  rect: { top: number; left: number; width: number; height: number }
}

interface Hierarchy {
  regions: RegionInfo[]
  items: ItemInfo[]
  morph: { phase: string | null; direction: string | null; tier: string | null }
}

const TIER_ORDER: Record<string, number> = { base: 0, structure: 1, element: 2 }

export const tierColor: Record<string, string> = {
  base: '#10b981',
  structure: '#6366f1',
  element: '#f59e0b',
}

function read(): Hierarchy {
  const regions = Array.from(document.querySelectorAll<HTMLElement>('.ms-viewport')).map((viewport) => {
    const stackId = viewport.dataset['stack'] ?? '?'
    const tier = viewport.dataset['tier'] ?? '?'
    return {
      stackId,
      tier,
      modal: viewport.dataset['modal'] === 'true',
      inline: viewport.dataset['inline'] === 'true',
      placement: viewport.dataset['placement'] ?? '?',
      phase: viewport.dataset['phase'] ?? 'idle',
      slots: Array.from(viewport.querySelectorAll<HTMLElement>(':scope > .ms-slot')).map((slot, index) => {
        const box = slot.getBoundingClientRect()
        return {
          key: `${stackId}-${index}`,
          stackId,
          tier,
          depth: Number(slot.dataset['depth'] ?? 0),
          viewCount: slot.querySelectorAll(':scope .ms-view').length,
          entering: slot.dataset['entering'] === 'true',
          exiting: slot.dataset['exiting'] === 'true',
          rect: { top: box.top, left: box.left, width: box.width, height: box.height },
        }
      }),
    }
  })
  regions.sort((a, b) => (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9))

  const items = Array.from(document.querySelectorAll<HTMLElement>('.ms-item')).map((item, index) => {
    const box = item.getBoundingClientRect()
    return { key: `item-${index}`, rect: { top: box.top, left: box.left, width: box.width, height: box.height } }
  })

  const root = document.documentElement
  return {
    regions,
    items,
    morph: {
      phase: root.getAttribute('data-ms-phase'),
      direction: root.getAttribute('data-ms-direction'),
      tier: root.getAttribute('data-ms-tier'),
    },
  }
}

/** Polling on purpose: a debug surface has no business observing style
 * mutations at animation frequency. */
function useSheetHierarchy(active: boolean): Hierarchy {
  const [hierarchy, setHierarchy] = useState<Hierarchy>({
    regions: [],
    items: [],
    morph: { phase: null, direction: null, tier: null },
  })

  useEffect(() => {
    if (!active) return
    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setHierarchy(read()))
    }
    refresh()
    const interval = setInterval(refresh, 160)
    window.addEventListener('resize', refresh)
    window.addEventListener('scroll', refresh, true)
    return () => {
      clearInterval(interval)
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)
      window.removeEventListener('scroll', refresh, true)
    }
  }, [active])

  return hierarchy
}

type Corner = 'tl' | 'tr' | 'bl' | 'br'
type Mode = 'docked' | 'dragging' | 'settling'

const MARGIN = 14
const SIZE = 40
const corners: Corner[] = ['tl', 'tr', 'bl', 'br']

function cornerPoint(corner: Corner): { x: number; y: number } {
  const right = window.innerWidth - MARGIN - SIZE
  const bottom = window.innerHeight - MARGIN - SIZE
  switch (corner) {
    case 'tl': return { x: MARGIN, y: MARGIN }
    case 'tr': return { x: right, y: MARGIN }
    case 'bl': return { x: MARGIN, y: bottom }
    case 'br': return { x: right, y: bottom }
  }
}

/** Apple's momentum projection: where the flick would coast to. */
function project(velocity: number, deceleration = 0.998): number {
  return ((velocity / 1000) * deceleration) / (1 - deceleration)
}

const cornerStyles: Record<Corner, CSSProperties> = {
  tl: { top: MARGIN, left: MARGIN },
  tr: { top: MARGIN, right: MARGIN },
  bl: { bottom: MARGIN, left: MARGIN },
  br: { bottom: MARGIN, right: MARGIN },
}

/** Drop it anywhere outside your providers; it needs nothing from the app. */
export function SheetInspector() {
  const [corner, setCorner] = useState<Corner>(() => {
    const saved = typeof localStorage === 'undefined' ? null : localStorage.getItem('ms-inspector-corner')
    return corners.includes(saved as Corner) ? (saved as Corner) : 'br'
  })
  const [mode, setMode] = useState<Mode>('docked')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [open, setOpen] = useState(false)
  const [exploded, setExploded] = useState(false)
  const [overlay, setOverlay] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem('ms-inspector-overlay') === 'true',
  )

  const dragRef = useRef<{
    pointerId: number
    grabX: number
    grabY: number
    moved: boolean
    samples: { x: number; y: number; t: number }[]
  } | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => localStorage.setItem('ms-inspector-corner', corner), [corner])
  useEffect(() => localStorage.setItem('ms-inspector-overlay', String(overlay)), [overlay])

  const hierarchy = useSheetHierarchy(open || overlay)
  const root = useInspectorRoot()

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    button.setPointerCapture(event.pointerId)
    const box = button.getBoundingClientRect()
    dragRef.current = {
      pointerId: event.pointerId,
      grabX: event.clientX - box.left,
      grabY: event.clientY - box.top,
      moved: false,
      samples: [{ x: event.clientX, y: event.clientY, t: performance.now() }],
    }
    setPos({ x: box.left, y: box.top })
  }, [])

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    const x = event.clientX - drag.grabX
    const y = event.clientY - drag.grabY
    if (!drag.moved) {
      const first = drag.samples[0]
      if (first && Math.hypot(event.clientX - first.x, event.clientY - first.y) < 6) return
      drag.moved = true
      setMode('dragging')
    }
    drag.samples.push({ x: event.clientX, y: event.clientY, t: performance.now() })
    if (drag.samples.length > 6) drag.samples.shift()
    setPos({ x, y })
  }, [])

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || event.pointerId !== drag.pointerId) return
    dragRef.current = null
    if (!drag.moved) return

    const newest = drag.samples[drag.samples.length - 1]
    const oldest = drag.samples[0]
    const dt = newest && oldest ? Math.max(newest.t - oldest.t, 1) : 1
    const vx = newest && oldest ? ((newest.x - oldest.x) / dt) * 1000 : 0
    const vy = newest && oldest ? ((newest.y - oldest.y) / dt) * 1000 : 0

    const current = { x: event.clientX - drag.grabX, y: event.clientY - drag.grabY }
    const landing = { x: current.x + project(vx), y: current.y + project(vy) }
    const target = corners.reduce((best, candidate) => {
      const c = cornerPoint(candidate)
      const b = cornerPoint(best)
      return Math.hypot(landing.x - c.x, landing.y - c.y) < Math.hypot(landing.x - b.x, landing.y - b.y)
        ? candidate
        : best
    })

    setCorner(target)
    setPos(cornerPoint(target))
    setMode('settling')
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => setMode('docked'), 420)
  }, [])

  const magnetStyle: CSSProperties =
    mode === 'docked'
      ? cornerStyles[corner]
      : {
          left: pos.x,
          top: pos.y,
          transition:
            mode === 'settling'
              ? 'left 380ms cubic-bezier(0.22, 1, 0.36, 1), top 380ms cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none',
        }

  return createPortal(
    <>
      {overlay ? <HierarchyOverlay hierarchy={hierarchy} /> : null}

      <button
        type="button"
        aria-label="Sheet inspector"
        data-ms-no-dismiss
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => setOpen(true)}
        style={magnetStyle}
        className="ms-inspector-fab"
      >
        <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ overflow: 'visible' }}>
          <path d="M8 2.4 13.8 5.5 8 8.6 2.2 5.5z" />
          <path d="m2.2 9 5.8 3.1L13.8 9" />
          <path d="m2.2 12 5.8 3.1 5.8-3.1" opacity="0.45" />
        </svg>
      </button>

      {open ? (
        <InspectorModal
          hierarchy={hierarchy}
          overlay={overlay}
          onOverlay={setOverlay}
          exploded={exploded}
          onExplode={() => {
            setOpen(false)
            setExploded(!exploded)
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}

      {exploded ? <ExplodedControls onExit={() => setExploded(false)} /> : null}
    </>,
    root,
  )
}

function useInspectorEscape(onClose: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      // Capture + stop: closing the inspector must not also pop a sheet.
      event.stopImmediatePropagation()
      event.preventDefault()
      onClose()
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [onClose, enabled])
}

function InspectorModal({
  hierarchy,
  overlay,
  onOverlay,
  exploded,
  onExplode,
  onClose,
}: {
  hierarchy: Hierarchy
  overlay: boolean
  onOverlay: (next: boolean) => void
  exploded: boolean
  onExplode: () => void
  onClose: () => void
}) {
  useInspectorEscape(onClose)

  return (
    <div
      data-ms-no-dismiss
      className="ms-inspector-scrim"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="Sheet inspector" className="ms-inspector-panel">
        <div className="ms-inspector-head">
          <div>
            <h2>Sheet inspector</h2>
            <p>Plain modal — outside the sheet system, by design.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="ms-inspector-x">
            ×
          </button>
        </div>

        <label className="ms-inspector-toggle">
          <span>
            <strong>Hierarchy overlay</strong>
            <small>Outline every sheet with its region · tier · depth</small>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={overlay}
            onClick={() => onOverlay(!overlay)}
            className="ms-inspector-switch"
          >
            <span />
          </button>
        </label>

        <div className="ms-inspector-toggle">
          <span>
            <strong>Exploded modal queue</strong>
            <small>
              {exploded
                ? 'The page is exploded right now'
                : 'Lift modals, what they cover and what is queued off the page'}
            </small>
          </span>
          <button
            type="button"
            onClick={onExplode}
            className="ms-inspector-action"
          >
            {exploded ? 'Collapse' : 'Explode'}
          </button>
        </div>

        <p className="ms-inspector-eyebrow">Rendered hierarchy · bottom → top</p>
        {hierarchy.regions.length === 0 ? (
          <p className="ms-inspector-empty">No sheet regions on screen.</p>
        ) : (
          <ul className="ms-inspector-tree">
            {hierarchy.regions.map((region) => (
              <li key={region.stackId}>
                <p>
                  <span aria-hidden className="ms-inspector-dot" style={{ background: tierColor[region.tier] ?? '#888' }} />
                  <strong>{region.stackId}</strong>
                  <em>{region.tier}</em>
                  <span className="ms-inspector-meta">
                    {region.modal ? 'modal' : region.inline ? 'inline' : 'overlay'} · {region.placement}
                    {region.phase !== 'idle' ? ` · ${region.phase}` : ''}
                  </span>
                </p>
                <ul>
                  {region.slots.map((slot) => (
                    <li key={slot.key}>
                      slot d{slot.depth} · {slot.viewCount} {slot.viewCount === 1 ? 'view' : 'views'}
                      {slot.entering ? ' · entering' : ''}
                      {slot.exiting ? ' · exiting' : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {hierarchy.items.length > 0 ? (
          <p className="ms-inspector-foot">{hierarchy.items.length} items on the sheet material</p>
        ) : null}
        {hierarchy.morph.phase ? (
          <p className="ms-inspector-foot">
            html: {hierarchy.morph.phase}
            {hierarchy.morph.direction ? ` · ${hierarchy.morph.direction}` : ''}
            {hierarchy.morph.tier ? ` · ${hierarchy.morph.tier}` : ''}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function HierarchyOverlay({ hierarchy }: { hierarchy: Hierarchy }) {
  return (
    <div aria-hidden className="ms-inspector-annotations">
      {hierarchy.items.map((item) => (
        <div
          key={item.key}
          className="ms-inspector-outline"
          style={{
            top: item.rect.top,
            left: item.rect.left,
            width: item.rect.width,
            height: item.rect.height,
            outline: `1px dashed ${tierColor['element']}88`,
          }}
        />
      ))}
      {hierarchy.regions.flatMap((region) =>
        region.slots.map((slot) => {
          const color = tierColor[slot.tier] ?? '#888'
          return (
            <div
              key={slot.key}
              className="ms-inspector-outline"
              style={{
                top: slot.rect.top,
                left: slot.rect.left,
                width: slot.rect.width,
                height: slot.rect.height,
                outline: `1.5px dashed ${color}`,
                background: `${color}0a`,
              }}
            >
              <span className="ms-inspector-chip" style={{ background: color }}>
                {slot.stackId} · {slot.tier} · d{slot.depth} · {slot.viewCount}v
              </span>
            </div>
          )
        }),
      )}
    </div>
  )
}

/**
 * The inspector's own mount point, a sibling of `<body>` rather than a child.
 * Exploding transforms the body; anything fixed inside it would ride along
 * with the page instead of staying on the glass.
 */
function useInspectorRoot(): HTMLElement {
  const [root] = useState(() => {
    const existing = document.querySelector<HTMLElement>(':root > .ms-inspector-root')
    if (existing) return existing
    const node = document.createElement('div')
    node.className = 'ms-inspector-root'
    document.documentElement.appendChild(node)
    return node
  })
  return root
}

/*
 * Exploded modal queue. A modal region keeps one slot and morphs every further
 * request in place, so the views it holds sit hidden under the visible one.
 * Exploding does not draw a picture of that: it turns the real page into the
 * scene. The body becomes the floor, the scrim floats just above it, and every
 * queued view — covered ones unhidden, still inert — is lifted onto its own
 * plane under the slot, which rides on top. Nothing is cloned, so the scene is
 * live by construction and the top view stays usable.
 *
 * No `perspective` anywhere: the projection is orthographic, so a plane keeps
 * its size at every depth. The stylesheet does the lifting (`data-ms-exploded`
 * on <html>); this code only feeds it the world transform and, per view, its
 * depth and a label.
 */

type Projection = 'axonometric' | 'oblique'

const PROJECTION_DEFAULT = { tilt: 56, spin: -38, angle: 38, zoom: 1 }
const MODAL_VIEWPORT = ".ms-viewport[data-modal='true']"

/** Depth and label per queued view. Views are library DOM React never styles,
 * so these writes are not fought over; they are removed on collapse. */
interface QueueTally {
  /** Most views held by one modal slot. */
  views: number
  /** Most planes one region stands up: its slot's plus its queued ghosts. */
  planes: number
  /** Ops waiting across modal regions, pops and resets included. */
  ops: number
}

function tagQueue(covered: boolean): QueueTally {
  const tally: QueueTally = { views: 0, planes: 0, ops: 0 }
  document.querySelectorAll<HTMLElement>(MODAL_VIEWPORT).forEach((viewport) => {
    const stackId = viewport.dataset['stack'] ?? '?'
    let slotPlanes = 0
    tally.ops += (viewport.dataset['queue'] ?? '').split(' ').filter(Boolean).length
    viewport.querySelectorAll<HTMLElement>(':scope > .ms-slot').forEach((slot) => {
      const views = Array.from(slot.querySelectorAll<HTMLElement>(':scope > .ms-slot-content > .ms-view'))
      tally.views = Math.max(tally.views, views.length)
      // Hidden covered views take no planes, so the slot sits one gap up.
      const planes = covered ? views.length : Math.min(views.length, 1)
      slotPlanes = Math.max(slotPlanes, planes)
      slot.style.setProperty('--ms-xray-count', String(planes))
      views.forEach((view, index) => {
        const depth = views.length - 1 - index
        const title = view.querySelector(':scope > .ms-view-header')?.textContent?.trim()
        view.style.setProperty('--ms-xray-depth', String(depth))
        // `hidden` cannot be outranked from a stylesheet — Tailwind's
        // preflight sets `display: none !important` in an earlier layer, and
        // between importants the earlier layer wins — but an inline important
        // outranks every sheet. So `hidden` stays React's, and while covered
        // views are shown every view carries the override from the start: the
        // view a push is about to cover is never display:none for even one
        // frame, which would restart every animation inside it. Inert stays:
        // a covered view is still covered.
        if (covered) view.style.setProperty('display', 'flex', 'important')
        else view.style.removeProperty('display')
        view.dataset['msXray'] = [
          `${stackId} · v${index + 1}/${views.length}`,
          depth === 0 ? 'visible' : 'covered',
          title,
        ]
          .filter(Boolean)
          .join(' · ')
      })
    })
    // Queued ghosts stack above the slot, so they count from its height.
    viewport.style.setProperty('--ms-xray-count', String(slotPlanes))
    const ghosts = viewport.querySelectorAll(':scope > .ms-queue > .ms-queued').length
    tally.planes = Math.max(tally.planes, slotPlanes + ghosts)
  })
  return tally
}

function untagQueue() {
  document.querySelectorAll<HTMLElement>('[data-ms-xray]').forEach((view) => {
    delete view.dataset['msXray']
    view.style.removeProperty('--ms-xray-depth')
    view.style.removeProperty('--ms-xray-w')
    view.style.removeProperty('--ms-xray-h')
    view.style.removeProperty('display')
  })
  document
    .querySelectorAll<HTMLElement>('.ms-slot, .ms-viewport')
    .forEach((node) => node.style.removeProperty('--ms-xray-count'))
}

/** Re-tags whenever a modal region gains or loses a view or its queue moves.
 * Only those attributes are watched: the tags themselves are attribute writes
 * and must not wake the observer that made them. */
function useQueueTags(covered: boolean): QueueTally {
  const [depth, setDepth] = useState<QueueTally>({ views: 0, planes: 0, ops: 0 })
  useLayoutEffect(() => {
    // Tagged here, not during render: the cleanup untags, and StrictMode runs
    // cleanup-then-setup once on mount.
    setDepth(tagQueue(covered))
    // A covered view keeps the size it had while it was on top. The slot's
    // box is recorded onto whichever view is active each time it changes, so
    // when a push covers a view, the last size written is its own — and the
    // slot growing or shrinking for the newcomer no longer reaches it.
    const sizes = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const slot = entry.target as HTMLElement
        const active = slot.querySelector<HTMLElement>(":scope > .ms-slot-content > .ms-view[data-active='true']")
        if (!active) continue
        active.style.setProperty('--ms-xray-w', `${slot.offsetWidth}px`)
        active.style.setProperty('--ms-xray-h', `${slot.offsetHeight}px`)
      }
    })
    const watchSlots = () => {
      document
        .querySelectorAll<HTMLElement>(`${MODAL_VIEWPORT} > .ms-slot`)
        .forEach((slot) => sizes.observe(slot))
    }
    watchSlots()
    let frame = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        watchSlots()
        setDepth(tagQueue(covered))
      })
    })
    observer.observe(document.body, { subtree: true, childList: true, attributeFilter: ['data-queue'] })
    return () => {
      observer.disconnect()
      sizes.disconnect()
      cancelAnimationFrame(frame)
      untagQueue()
    }
  }, [covered])
  return depth
}

function ExplodedControls({ onExit }: { onExit: () => void }) {
  const [covered, setCovered] = useState(true)
  const [showQueue, setShowQueue] = useState(true)
  const tally = useQueueTags(covered)
  const stacked = tally.views
  const depth = tally.planes

  // The providers read this switch off <html> and mount their ghosts.
  useLayoutEffect(() => {
    const root = document.documentElement
    if (showQueue) root.setAttribute('data-ms-xray-queued', '')
    else root.removeAttribute('data-ms-xray-queued')
    return () => root.removeAttribute('data-ms-xray-queued')
  }, [showQueue])
  const [projection, setProjection] = useState<Projection>('axonometric')
  const [gap, setGap] = useState(90)
  const [view, setView] = useState(PROJECTION_DEFAULT)

  // The world transform lives on <html> as variables; the body reads them.
  useLayoutEffect(() => {
    const root = document.documentElement
    const width = window.innerWidth
    const height = window.innerHeight
    // The slider is the widest spacing, not a promise: a deep stack (perf
    // lab swaps into the dozens) closes up so the whole scene stays about a
    // screen tall instead of throwing the page off the top.
    const step = Math.min(gap, Math.max(10, height / (depth + 1)))
    // The scene is one step per view plus one for the scrim.
    const lift = step * (depth + 1)
    let world: string
    if (projection === 'oblique') {
      const radians = (view.angle * Math.PI) / 180
      const shear = { x: Math.cos(radians), y: -Math.sin(radians) }
      const scale =
        view.zoom *
        Math.min(1, (width * 0.92) / (width + Math.abs(shear.x) * lift), (height * 0.92) / (height + Math.abs(shear.y) * lift))
      world = [
        `translate(${-shear.x * lift * scale * 0.5}px, ${-shear.y * lift * scale * 0.5}px)`,
        `scale(${scale})`,
        // Column-major: the third column is where the z axis lands on screen.
        `matrix3d(1,0,0,0, 0,1,0,0, ${shear.x},${shear.y},1,0, 0,0,0,1)`,
      ].join(' ')
    } else {
      const scale = 0.62 * view.zoom
      const rise = lift * Math.sin((view.tilt * Math.PI) / 180) * scale
      world = `translateY(${rise * 0.5}px) scale(${scale}) rotateX(${view.tilt}deg) rotateZ(${view.spin}deg)`
    }
    root.style.setProperty('--ms-xray-world', world)
    root.style.setProperty('--ms-xray-gap', `${step}px`)
    root.setAttribute('data-ms-exploded', projection)
  }, [projection, gap, view, depth])

  useLayoutEffect(
    () => () => {
      const root = document.documentElement
      root.removeAttribute('data-ms-exploded')
      root.style.removeProperty('--ms-xray-world')
      root.style.removeProperty('--ms-xray-gap')
    },
    [],
  )

  // Alt is the orbit modifier: a plain drag or wheel still belongs to the app,
  // which is live underneath.
  useEffect(() => {
    let drag: { x: number; y: number } | null = null
    const onDown = (event: PointerEvent) => {
      if (!event.altKey || (event.target as Element).closest('.ms-inspector-root')) return
      event.preventDefault()
      event.stopPropagation()
      drag = { x: event.clientX, y: event.clientY }
      document.documentElement.setAttribute('data-ms-xray-dragging', '')
    }
    const onMove = (event: PointerEvent) => {
      if (!drag) return
      const dx = event.clientX - drag.x
      const dy = event.clientY - drag.y
      drag = { x: event.clientX, y: event.clientY }
      setView((current) =>
        projection === 'oblique'
          ? { ...current, angle: current.angle - dx * 0.4 }
          : {
              ...current,
              spin: current.spin + dx * 0.35,
              tilt: Math.min(85, Math.max(0, current.tilt - dy * 0.35)),
            },
      )
    }
    const onUp = () => {
      drag = null
      document.documentElement.removeAttribute('data-ms-xray-dragging')
    }
    const onWheel = (event: WheelEvent) => {
      if (!event.altKey) return
      event.preventDefault()
      setView((current) => ({
        ...current,
        zoom: Math.min(2.4, Math.max(0.25, current.zoom * Math.exp(-event.deltaY * 0.0015))),
      }))
    }
    window.addEventListener('pointerdown', onDown, true)
    window.addEventListener('pointermove', onMove, true)
    window.addEventListener('pointerup', onUp, true)
    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    return () => {
      window.removeEventListener('pointerdown', onDown, true)
      window.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('pointerup', onUp, true)
      window.removeEventListener('wheel', onWheel, true)
      document.documentElement.removeAttribute('data-ms-xray-dragging')
    }
  }, [projection])

  return (
    <div data-ms-no-dismiss className="ms-inspector-xray-bar" role="toolbar" aria-label="Exploded modal queue">
      <strong>Exploded</strong>
      <span className="ms-inspector-meta">
        {stacked} {stacked === 1 ? 'view' : 'views'} stacked · {tally.ops} {tally.ops === 1 ? 'op' : 'ops'} queued
      </span>
      <button
        type="button"
        className="ms-inspector-action"
        aria-pressed={covered}
        // Never gated on the current depth: a drill starts from an empty
        // region, and the switch has to be on before the stack grows.
        onClick={() => setCovered(!covered)}
      >
        Covered {covered ? 'on' : 'off'}
      </button>
      <button
        type="button"
        className="ms-inspector-action"
        aria-pressed={showQueue}
        onClick={() => setShowQueue(!showQueue)}
      >
        Queued {showQueue ? 'on' : 'off'}
      </button>
      <div className="ms-inspector-xray-segment" role="radiogroup" aria-label="Projection">
        {(['axonometric', 'oblique'] as const).map((value) => (
          <button key={value} type="button" role="radio" aria-checked={projection === value} onClick={() => setProjection(value)}>
            {value}
          </button>
        ))}
      </div>
      <label className="ms-inspector-xray-range">
        <span>spacing</span>
        <input type="range" min={0} max={240} value={gap} onChange={(event) => setGap(Number(event.target.value))} />
      </label>
      <button type="button" className="ms-inspector-action" onClick={() => setView(PROJECTION_DEFAULT)}>
        Reset
      </button>
      <button type="button" className="ms-inspector-action" onClick={onExit}>
        Collapse
      </button>
      <span className="ms-inspector-xray-hint">alt + drag to orbit · alt + scroll to zoom</span>
    </div>
  )
}
