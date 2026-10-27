import { useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

import { delay, readDurationToken, waitForAnimations } from '../core/animation.js'
import { isQueueShown, prefersReducedMotion, supportsAnchorPositioning, supportsViewTransitions } from '../core/env.js'
import { setMorphClass, setMorphName } from '../core/names.js'
import { setMorphDirection, setMorphKind, setMorphTier, setStackPhase } from '../core/flags.js'
import { trapFocus } from '../core/focus-trap.js'
import { lockScroll } from '../core/scroll-lock.js'
import {
  createId,
  createStackState,
  popView,
  pushView,
  replaceView,
  resetStack,
  withMaxDepth,
  type SheetStackState,
} from '../core/stack.js'
import { startMorphTransition } from '../core/transition.js'
import type {
  ContentPhase,
  MorphDirection,
  MorphTransitionHandle,
  SheetEdge,
  SheetPlacement,
  SheetTier,
  StackPhase,
} from '../core/types.js'
import {
  createSheetStackRegistry,
  SheetStackContext,
  SheetStackRegistryContext,
  type SheetStackRegistry,
} from './context.js'
import { SheetViewport } from './SheetViewport.js'
import type {
  AnchorPoint,
  PushOptions,
  QueuedOp,
  SheetDescriptor,
  SheetStackActions,
  SheetStackApi,
} from './types.js'

function subscribeRootAttributes(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-ms-exploded', 'data-ms-xray-queued'],
  })
  return () => observer.disconnect()
}

/** Whether the inspector wants queued views drawn — set on <html>, so every
 * region follows one switch without the inspector reaching into providers. */
function useQueueShown(): boolean {
  return useSyncExternalStore(subscribeRootAttributes, isQueueShown, () => false)
}

/**
 * Curated depth limit per tier — how many layers may stack before pushes start
 * morphing the top one. The floor is a single backdrop that only ever
 * morphs, non-modal task surfaces stack a handful, momentary surfaces
 * (toast-like) practically always stack.
 * Modality overrides the tier: a modal region keeps exactly one sheet, and
 * every further request morphs it in place.
 */
const TIER_DEPTH: Record<SheetTier, number> = { base: 1, structure: 5, element: 100 }

/** The id of the view a region is currently showing, or null when empty.
 *  What lets a trigger tell "open me" from "close me" without subscribing to
 *  the region's state (#92). */
function activeViewId(state: SheetStackState<SheetDescriptor>): string | null {
  const top = state.slots[state.slots.length - 1]
  return top?.views[top.views.length - 1]?.id ?? null
}

let anchorSequence = 0

/**
 * Attaches a slot to its trigger.
 *
 * Where CSS anchor positioning exists the trigger takes an `anchor-name` and
 * the browser does the rest — including following it through a scroll, which
 * is the one thing a resolved point cannot do (#96). The coordinates are still
 * computed for engines without it: placed under the anchor, flipped above near
 * the viewport's foot, clamped horizontally, resolved once at push time.
 */
function resolveAnchor(element: HTMLElement, width: string | undefined): AnchorPoint {
  const rect = element.getBoundingClientRect()
  const estimated = width?.endsWith('px') ? Number.parseFloat(width) : 320
  const x = Math.min(Math.max(rect.left, 8), Math.max(window.innerWidth - estimated - 8, 8))
  const above = rect.bottom > window.innerHeight * 0.62

  let name: string | null = null
  if (supportsAnchorPositioning()) {
    // An element that already anchors a sheet keeps its name: renaming it now
    // would cut the open slot loose before the retarget commits (#111).
    const existing = element.style.getPropertyValue('anchor-name')
    if (existing !== '') name = existing
    else {
      anchorSequence += 1
      name = `--ms-anchor-${anchorSequence}`
      element.style.setProperty('anchor-name', name)
    }
  }
  return { x, y: above ? rect.top - 8 : rect.bottom + 8, above, name }
}

export interface SheetStackProviderProps {
  children: ReactNode
  /** Name other regions use to reach this stack via `useSheetStackActions()`. */
  id?: string
  /**
   * Which of the three bands this region lives in. base — the app's floor
   * (sidebar, inspector); structure — task surfaces (dialogs, panels); element
   * — momentary surfaces (palettes, popovers). The tier curates modality,
   * depth, z-band and motion mass; every region keeps its own stack.
   */
  tier?: SheetTier
  /**
   * Edges where this region sits flush against a sibling sheet. Touching edges
   * drop to a smaller radius so the pair reads as one grouped surface.
   */
  adjacent?: readonly SheetEdge[]
  /**
   * Modal regions dim the page, trap focus, lock scrolling and close on Escape.
   * A persistent region — a sidebar, an inspector — does none of that: it is
   * part of the layout, and only its morph behaviour comes from the system.
   */
  modal?: boolean
  /** Render into the surrounding layout rather than portalling to an overlay. */
  inline?: boolean
  /** Views the region starts with. A persistent region needs at least one. */
  initialViews?: readonly SheetDescriptor[]
  /**
   * Whether Escape and outside presses dismiss this region. Defaults to true
   * for the element tier (palettes, popovers); a toast region turns it off.
   */
  lightDismiss?: boolean
  /** How many sheet layers may exist at once. Beyond this, pushes morph the top layer. */
  maxDepth?: number
  placement?: SheetPlacement
  /** Bypass view transitions — useful for A/B-ing the morph against a plain swap. */
  disabled?: boolean
  closeOnEscape?: boolean
  closeOnScrimClick?: boolean
  lockScrollWhileOpen?: boolean
  trapFocusWhileOpen?: boolean
  container?: Element | DocumentFragment | null
}

/**
 * Owns the sheet stack and the choreography around it.
 *
 * Layer changes are plain fades. Depth-capped pushes are morphs, and a morph is
 * always three beats: content out, frame morphs under a view transition,
 * content in. See docs/spec.md §5.
 */
export function SheetStackProvider({
  children,
  id = 'sheets',
  tier = 'structure',
  adjacent,
  modal: modalProp,
  inline: inlineProp,
  initialViews,
  maxDepth: maxDepthProp,
  placement = 'bottom',
  disabled = false,
  closeOnEscape = true,
  lightDismiss: lightDismissProp,
  closeOnScrimClick = true,
  lockScrollWhileOpen = true,
  trapFocusWhileOpen = true,
  container,
}: SheetStackProviderProps): ReactNode {
  // The tier decides the defaults; explicit props stay the escape hatch.
  const modal = modalProp ?? tier === 'structure'
  const inline = inlineProp ?? tier === 'base'
  const maxDepth = maxDepthProp ?? (modal ? 1 : TIER_DEPTH[tier])
  const lightDismiss = lightDismissProp ?? tier === 'element'

  const [state, setState] = useState<SheetStackState<SheetDescriptor>>(() => {
    // Seeded synchronously: a persistent region has to be on screen in its
    // first paint, with no enter animation to explain.
    const empty = createStackState<SheetDescriptor>(maxDepth)
    if (!initialViews || initialViews.length === 0) return empty
    return {
      ...empty,
      slots: initialViews.map((view) => ({
        id: createId('slot'),
        views: [{ id: view.id ?? createId('view'), payload: view }],
      })),
    }
  })
  const [phase, setPhase] = useState<StackPhase>('idle')
  const [contentPhase, setContentPhase] = useState<ContentPhase>('idle')
  const [exitingSlotIds, setExitingSlotIds] = useState<readonly string[]>([])
  // True only while this region's own morph runs — it gates the
  // view-transition-name, so sheets that are not morphing never get captured
  // as transition groups (parents and siblings stay perfectly still).
  const [morphing, setMorphing] = useState(false)
  const [enteringSlotIds, setEnteringSlotIds] = useState<readonly string[]>([])

  // Queued operations read the stack through this ref: `setState` has not
  // committed yet when the next step of a sequence needs the new value.
  const stateRef = useRef(state)
  stateRef.current = state
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const topSlotRef = useRef<HTMLElement | null>(null)
  const topContentRef = useRef<HTMLDivElement | null>(null)
  const topFitRef = useRef<HTMLDivElement | null>(null)
  const morphRef = useRef<MorphTransitionHandle | null>(null)
  // Trigger elements remembered per slot, so closing a layer can morph back
  // into the button it grew out of. While its sheet is up, a trigger is
  // hidden (#34) — the button became the sheet, so it must not also exist
  // behind it. visibility keeps its layout slot warm for the return morph.
  const triggersRef = useRef(new Map<string, HTMLElement>())

  // Popover anchor points per slot id (#37). Mutated at push time; the state
  // commit that mounts the slot re-renders the viewport with the fresh map.
  const anchorsRef = useRef(new Map<string, AnchorPoint>())
  // The elements those anchor names live on, so the name comes back off when the
  // slot goes (#96) — an orphaned anchor-name would keep the trigger a
  // positioning target for nothing.
  const anchorHostsRef = useRef(new Map<string, HTMLElement>())
  const releaseAnchor = useCallback((slotId: string): void => {
    anchorHostsRef.current.get(slotId)?.style.removeProperty('anchor-name')
    anchorHostsRef.current.delete(slotId)
    anchorsRef.current.delete(slotId)
  }, [])
  /** Points a slot at a new anchor. The previous host gives its name up in
   * the same step, never before: until then the slot still positions off it. */
  const retargetAnchor = useCallback(
    (slotId: string, point: AnchorPoint, host: HTMLElement | null): void => {
      const previous = anchorHostsRef.current.get(slotId)
      if (previous && previous !== host) previous.style.removeProperty('anchor-name')
      anchorsRef.current.set(slotId, point)
      if (host) anchorHostsRef.current.set(slotId, host)
    },
    [],
  )

  const restoreTriggersRef = useRef<() => void>(() => {})
  const restoreTriggers = useCallback((): void => {
    for (const trigger of triggersRef.current.values()) {
      trigger.style.removeProperty('visibility')
    }
    triggersRef.current.clear()
  }, [])
  restoreTriggersRef.current = restoreTriggers
  const queueRef = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    setState((current) => (current.maxDepth === maxDepth ? current : withMaxDepth(current, maxDepth)))
  }, [maxDepth])

  useEffect(
    () => () => {
      morphRef.current?.skip()
      restoreTriggersRef.current()
      setStackPhase(null)
      setMorphDirection(null)
      setMorphTier(null)
      setMorphKind(null)
    },
    [],
  )

  const commit = useCallback((next: SheetStackState<SheetDescriptor>): void => {
    stateRef.current = next
    setState(next)
  }, [])

  const runLayerEnter = useCallback(
    async (next: SheetStackState<SheetDescriptor>): Promise<void> => {
      const arrived = next.slots[next.slots.length - 1]
      setStackPhase('layer-entering')
      flushSync(() => {
        setPhase('layer-entering')
        setEnteringSlotIds(arrived ? [arrived.id] : [])
        commit(next)
      })
      // The content beat starts delayed, so wait on the animations themselves
      // rather than on a single token.
      await waitForAnimations(
        topSlotRef.current,
        readDurationToken(topSlotRef.current ?? document.documentElement, '--ms-layer-enter', 260) + 800,
      )
      setEnteringSlotIds([])
      setPhase('idle')
      setStackPhase(null)
    },
    [commit],
  )

  const runLayerExit = useCallback(
    async (next: SheetStackState<SheetDescriptor>, leaving: readonly string[]): Promise<void> => {
      setStackPhase('layer-exiting')
      // The slot has to stay mounted for the length of its fade, so the state
      // change is split: mark it leaving now, drop it once the fade is done.
      flushSync(() => {
        setPhase('layer-exiting')
        setExitingSlotIds(leaving)
      })
      await delay(readDurationToken(topSlotRef.current ?? document.documentElement, '--ms-layer-exit', 200))
      flushSync(() => {
        commit(next)
        setExitingSlotIds([])
      })
      setPhase('idle')
      setStackPhase(null)
    },
    [commit],
  )

  /** True when a view transition cannot or should not run right now. */
  const vtDegraded = useCallback(
    (): boolean => disabled || !supportsViewTransitions() || prefersReducedMotion(),
    [disabled],
  )

  /**
   * Directive #29 — a trigger-born arrival. The trigger briefly owns the slot's
   * view-transition-name, so the browser interpolates button box → sheet box;
   * the content then lands with the usual entering beat.
   */
  const runLayerEnterFromTrigger = useCallback(
    async (next: SheetStackState<SheetDescriptor>, trigger: HTMLElement): Promise<void> => {
      const arrived = next.slots[next.slots.length - 1]
      if (!arrived || vtDegraded()) {
        if (arrived) {
          triggersRef.current.set(arrived.id, trigger)
          trigger.style.visibility = 'hidden'
        }
        await runLayerEnter(next)
        return
      }
      triggersRef.current.set(arrived.id, trigger)

      const name = `ms-${id}-slot-${next.slots.length - 1}`
      setMorphName(trigger, name)
      setMorphClass(trigger, 'ms-slot')
      setStackPhase('morphing')
      setMorphDirection('forward')
      setMorphTier(tier)
      setMorphKind('arrive')

      const handle = startMorphTransition(
        () => {
          // Old state is captured; the name moves from the trigger to the slot
          // (via the `morphing` gate) inside this update.
          setMorphName(trigger, null)
          setMorphClass(trigger, null)
          // The button became the sheet; it must not linger behind it (#34).
          trigger.style.visibility = 'hidden'
          flushSync(() => {
            setPhase('morphing')
            setMorphing(true)
            setContentPhase('hidden')
            commit(next)
          })
        },
        { types: ['morph', 'open'], disabled },
      )
      morphRef.current = handle
      await handle.finished
      morphRef.current = null

      flushSync(() => {
        setContentPhase('entering')
        setMorphing(false)
      })
      topSlotRef.current?.focus({ preventScroll: true })
      await waitForAnimations(
        topContentRef.current,
        readDurationToken(topContentRef.current ?? document.documentElement, '--ms-content-in', 190) + 800,
      )
      setContentPhase('idle')
      setPhase('idle')
      setStackPhase(null)
      setMorphDirection(null)
      setMorphTier(null)
      setMorphKind(null)
    },
    [commit, disabled, id, tier, runLayerEnter, vtDegraded],
  )

  /** The symmetric close: the sheet folds back into the button it came from. */
  const runLayerExitToTrigger = useCallback(
    async (
      next: SheetStackState<SheetDescriptor>,
      leavingId: string,
      leavingIndex: number,
      trigger: HTMLElement,
    ): Promise<void> => {
      triggersRef.current.delete(leavingId)
      if (!trigger.isConnected || vtDegraded()) {
        trigger.style.removeProperty('visibility')
        await runLayerExit(next, [leavingId])
        return
      }

      const root = topContentRef.current ?? document.documentElement
      setStackPhase('morphing')
      setMorphDirection('back')
      setMorphTier(tier)
      setMorphKind('depart')

      // Content steps out first — same grammar as every other morph.
      flushSync(() => {
        setPhase('morphing')
        setContentPhase('exiting')
        setMorphing(true)
      })
      await waitForAnimations(topContentRef.current, readDurationToken(root, '--ms-content-out', 110) + 160)

      const name = `ms-${id}-slot-${leavingIndex}`
      const handle = startMorphTransition(
        () => {
          // Old capture holds the named slot; the trigger claims the name for
          // the new state, so the frame lands on the button.
          // Back on stage for the new capture: the sheet folds into a
          // visible button, not an empty slot.
          trigger.style.removeProperty('visibility')
          setMorphName(trigger, name)
          setMorphClass(trigger, 'ms-slot')
          flushSync(() => {
            commit(next)
            setContentPhase('idle')
            setMorphing(false)
          })
        },
        { types: ['morph', 'back'], disabled },
      )
      morphRef.current = handle
      await handle.finished
      morphRef.current = null

      setMorphName(trigger, null)
      setMorphClass(trigger, null)
      setPhase('idle')
      setStackPhase(null)
      setMorphDirection(null)
      setMorphTier(null)
      setMorphKind(null)
    },
    [commit, disabled, id, tier, runLayerExit, vtDegraded],
  )

  // #80 — every user intent takes a ticket; a queued swap-morph that has been
  // overtaken by a newer intent commits its state without choreography. The
  // final op always holds the newest ticket and plays the full beats, so a
  // user pacing their clicks sees exactly what they always saw — only storms
  // converge instantly instead of replaying every intermediate morph.
  const opTicketRef = useRef(0)

  const runMorph = useCallback(
    async (
      next: SheetStackState<SheetDescriptor>,
      direction: MorphDirection,
      ticket?: number,
      /**
       * Runs in the same step that commits `next` — whichever of the three
       * commit paths that turns out to be. Anything that moves the frame (an
       * anchor retarget) belongs here: applied earlier, the frame jumps to
       * its new place while the old content is still stepping out of it.
       */
      onCommit?: () => void,
    ): Promise<void> => {
      const superseded = () => ticket !== undefined && opTicketRef.current !== ticket
      // Already overtaken while waiting in the queue: land the state and
      // yield the stage to the op that overtook us.
      if (superseded()) {
        onCommit?.()
        commit(next)
        return
      }
      const root = topContentRef.current ?? document.documentElement
      setMorphDirection(direction)
      setMorphTier(tier)
      setMorphKind('swap')
      setStackPhase('morphing')

      // 1 — content leaves first, so the frame morphs over an empty surface
      //     instead of smearing two different layouts together.
      // The name has to exist before the old-state capture, so it turns on in
      // the same commit as the content-out beat.
      flushSync(() => {
        setPhase('morphing')
        setContentPhase('exiting')
        setMorphing(true)
      })
      await waitForAnimations(
        topContentRef.current,
        readDurationToken(root, '--ms-content-out', 140) + 160,
      )

      // Overtaken while the content was stepping out: skip the transition and
      // the return beat — the newer op will play the only morph that matters.
      if (superseded()) {
        flushSync(() => {
          onCommit?.()
          commit(next)
          setContentPhase('idle')
          setMorphing(false)
        })
        setPhase('idle')
        setStackPhase(null)
        setMorphDirection(null)
        setMorphTier(null)
        setMorphKind(null)
        return
      }

      // 2 — the frame's geometry change is the view transition.
      const handle = startMorphTransition(
        () => {
          // The morph owns the geometry from here; the measured height (#36)
          // must not clamp the state the new snapshot is taken from.
          topSlotRef.current?.style.removeProperty('block-size')
          flushSync(() => {
            onCommit?.()
            commit(next)
            setContentPhase('hidden')
          })
        },
        { types: ['morph', direction], disabled },
      )
      morphRef.current = handle
      await handle.finished
      morphRef.current = null

      // 3 — content returns onto the settled frame. The transition is over,
      //     so the name comes off in the same commit.
      flushSync(() => {
        setContentPhase('entering')
        setMorphing(false)
      })
      topSlotRef.current?.focus({ preventScroll: true })
      await waitForAnimations(
        topContentRef.current,
        readDurationToken(root, '--ms-content-in', 220) + 800,
      )

      setContentPhase('idle')
      setPhase('idle')
      setStackPhase(null)
      setMorphDirection(null)
      setMorphTier(null)
      setMorphKind(null)
    },
    [commit, disabled, tier],
  )

  // What is waiting in the queue (#105). Always kept in a ref — it is two
  // array writes per op — but only published as state while the inspector is
  // showing it, so a measured run never pays for the extra renders.
  const queueShown = useQueueShown()
  const queueShownRef = useRef(queueShown)
  queueShownRef.current = queueShown
  const pendingRef = useRef<QueuedOp[]>([])
  const pendingKeyRef = useRef(0)
  const [pending, setPending] = useState<readonly QueuedOp[]>([])
  const publishPending = useCallback((next: QueuedOp[]): void => {
    pendingRef.current = next
    if (queueShownRef.current) setPending(next)
  }, [])
  useEffect(() => {
    setPending(queueShown ? pendingRef.current : [])
  }, [queueShown])

  const enqueue = useCallback((
    task: () => Promise<void>,
    meta: Pick<QueuedOp, 'kind' | 'descriptor'>,
  ): Promise<void> => {
    // The latest intent wins: an in-flight morph is cut short rather than
    // queued behind, but its promises still settle so nothing is half-applied.
    morphRef.current?.skip()
    const key = ++pendingKeyRef.current
    publishPending([...pendingRef.current, { key, ...meta, running: false }])
    const run = async (): Promise<void> => {
      publishPending(pendingRef.current.map((op) => (op.key === key ? { ...op, running: true } : op)))
      try {
        await task()
      } finally {
        publishPending(pendingRef.current.filter((op) => op.key !== key))
      }
    }
    const next = queueRef.current.then(run, run)
    queueRef.current = next.then(
      () => undefined,
      () => undefined,
    )
    return next
  }, [publishPending])

  // The outermost provider owns the registry; nested regions share it. That is
  // what lets one region reach another, and what the cross-tier rules read.
  const inherited = useContext(SheetStackRegistryContext)
  const ownRegistry = useRef<SheetStackRegistry | null>(null)
  if (inherited === null && ownRegistry.current === null) {
    ownRegistry.current = createSheetStackRegistry()
  }
  const registry = inherited ?? ownRegistry.current

  const anyElementOpen = useCallback((): boolean => {
    if (!registry) return false
    return registry.all().some(
      (entry) => entry.tier === 'element' && entry.lightDismiss && entry.getDepth() > 0,
    )
  }, [registry])

  const push = useCallback(
    (descriptor: SheetDescriptor, options?: PushOptions): Promise<void> => {
      // Opening a task surface dismisses every momentary one: a palette or
      // popover never survives the arrival of a dialog.
      if (tier === 'structure' && registry) {
        for (const entry of registry.all()) {
          // Only dismissable element surfaces yield to an arriving dialog;
          // toasts and other persistent regions ride it out (#43).
          if (entry.tier === 'element' && entry.lightDismiss && entry.getDepth() > 0) {
            void entry.actions.reset()
          }
        }
      }
      const ticket = ++opTicketRef.current
      const from = options?.from ?? null
      const anchorElement = options?.anchor ?? null
      // Resolved before the enqueue: the anchor's rect must be read while the
      // trigger is where the user pressed it, not after earlier work settles.
      const anchorPoint = anchorElement ? resolveAnchor(anchorElement, descriptor.width) : null
      return enqueue(async () => {
        // Idempotent by id (#92). Pushing the view that is already on screen
        // has nothing to morph to, and two views sharing an id break the
        // invariant the renderer keys on — both would read as active and the
        // sub-stack would grow a copy per press.
        if (descriptor.id !== undefined && descriptor.id === activeViewId(stateRef.current)) return
        const result = pushView(stateRef.current, descriptor, descriptor.id)
        const arrivedSlot = result.state.slots[result.state.slots.length - 1]
        const attach = (): void => {
          if (!anchorPoint || !arrivedSlot) return
          retargetAnchor(arrivedSlot.id, anchorPoint, anchorElement)
        }
        if (result.transition.kind === 'layer-enter') {
          // A new slot has no old content to show at the new place.
          attach()
          if (from) await runLayerEnterFromTrigger(result.state, from)
          else await runLayerEnter(result.state)
        } else if (result.transition.kind === 'morph') {
          // A morph in place keeps the slot, so the anchor moves at commit.
          await runMorph(result.state, result.transition.direction, ticket, attach)
        } else {
          attach()
        }
      }, { kind: 'push', descriptor })
    },
    [enqueue, runLayerEnter, runLayerEnterFromTrigger, runMorph, retargetAnchor, tier, registry],
  )

  const replace = useCallback(
    (descriptor: SheetDescriptor, options?: PushOptions): Promise<void> => {
      const ticket = ++opTicketRef.current
      const from = options?.from ?? null
      const anchorElement = options?.anchor ?? null
      // Read while the trigger is still where the user pressed it (#37), which
      // is what lets an open popover retarget to another anchor without
      // growing history (#92).
      const anchorPoint = anchorElement ? resolveAnchor(anchorElement, descriptor.width) : null
      return enqueue(async () => {
        const current = stateRef.current
        // Idempotent by id, so state-driven callers can fire it on every change.
        if (descriptor.id !== undefined && descriptor.id === activeViewId(current)) return
        const result = replaceView(current, descriptor, descriptor.id)
        const slot = result.state.slots[result.state.slots.length - 1]
        const attach = (): void => {
          if (!anchorPoint || !slot) return
          retargetAnchor(slot.id, anchorPoint, anchorElement)
        }
        if (result.transition.kind === 'morph') {
          // Retargeting (#97, #111): the frame stays on the old trigger until
          // the commit, so the old content leaves from where it was and never
          // shows up at the new place. Under a view transition the frame then
          // morphs across; without one it moves while its content is hidden.
          await runMorph(result.state, 'forward', ticket, attach)
        } else if (result.transition.kind === 'layer-enter') {
          attach()
          // An empty stack makes this a first push, so it can still be born
          // out of its trigger.
          if (from) await runLayerEnterFromTrigger(result.state, from)
          else await runLayerEnter(result.state)
        } else {
          attach()
        }
      }, { kind: 'replace', descriptor })
    },
    [enqueue, runMorph, runLayerEnter, runLayerEnterFromTrigger, retargetAnchor],
  )

  const pop = useCallback(
    (): Promise<void> => {
      const ticket = ++opTicketRef.current
      return enqueue(async () => {
        const current = stateRef.current
        const result = popView(current)
        if (result.transition.kind === 'morph') {
          await runMorph(result.state, result.transition.direction, ticket)
        } else if (result.transition.kind === 'layer-exit') {
          const leaving = current.slots[current.slots.length - 1]
          if (!leaving) return
          const trigger = triggersRef.current.get(leaving.id)
          if (trigger) {
            await runLayerExitToTrigger(result.state, leaving.id, current.slots.length - 1, trigger)
          } else {
            await runLayerExit(result.state, [leaving.id])
          }
          // Only now: the slot stays mounted for its whole fade, and a slot
          // that loses its anchor mid-fade snaps back to the region's default
          // placement and leaves from the wrong place (#82).
          releaseAnchor(leaving.id)
        }
      }, { kind: 'pop' })
    },
    [enqueue, runLayerExit, runLayerExitToTrigger, runMorph, releaseAnchor],
  )

  const reset = useCallback(
    (): Promise<void> => {
      opTicketRef.current += 1
      return enqueue(async () => {
        const current = stateRef.current
        const result = resetStack(current)
        if (result.transition.kind === 'none') return
        restoreTriggers()
        await runLayerExit(
          result.state,
          current.slots.map((slot) => slot.id),
        )
        // Cleared after the fade, not before it (#82) — light dismiss drains
        // popovers through this path, so it is the common case.
        for (const id of [...anchorHostsRef.current.keys()]) releaseAnchor(id)
        anchorsRef.current.clear()
      }, { kind: 'reset' })
    },
    [enqueue, runLayerExit, restoreTriggers, releaseAnchor],
  )

  const actions = useMemo<SheetStackActions>(
    () => ({
      push,
      replace,
      pop,
      reset,
      getDepth: () => stateRef.current.slots.length,
      getActiveViewId: () => activeViewId(stateRef.current),
    }),
    [push, replace, pop, reset],
  )

  const registryEntry = useMemo(
    () => ({ id, tier, lightDismiss, actions, getDepth: actions.getDepth }),
    [id, tier, lightDismiss, actions],
  )
  // Written during render so the entry exists before any child's first effect —
  // and re-written in the effect, because StrictMode runs the cleanup (which
  // removes the entry) and a cleanup-only registration would stay removed.
  registry?.set(registryEntry)
  useEffect(() => {
    if (!registry) return
    registry.set(registryEntry)
    return () => registry.remove(id)
  }, [registry, registryEntry, id])

  const hasSheets = state.slots.length > 0
  const topSlotId = state.slots[state.slots.length - 1]?.id ?? null

  // #36 — content-driven resizes glide. The observer watches the fit layer
  // (natural content size, immune to the slot's own clamp), and each change
  // re-measures the slot at auto before pinning the new pixel height — so the
  // transition runs px→px while max-block-size keeps its authority. Inline
  // regions stretch to their column and are exempt.
  const topViewId = (() => {
    const top = state.slots[state.slots.length - 1]
    return top?.views[top.views.length - 1]?.id ?? null
  })()

  const settleHeight = useCallback((): void => {
    if (phaseRef.current !== 'idle') return
    const slot = topSlotRef.current
    if (!slot) return
    const previous = slot.style.blockSize
    slot.style.blockSize = ''
    const natural = slot.offsetHeight
    if (previous !== '') {
      // Restore the old pin and force a style flush, so the browser sees a
      // px→px change and runs the transition instead of snapping.
      slot.style.blockSize = previous
      void slot.offsetHeight
    }
    slot.style.blockSize = `${natural}px`
  }, [])

  useEffect(() => {
    if (inline || topViewId === null) return
    const fit = topFitRef.current
    const slot = topSlotRef.current
    if (!fit || !slot) return

    let frame = 0
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(settleHeight)
    })
    observer.observe(fit)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      slot.style.removeProperty('block-size')
    }
  }, [inline, topViewId, settleHeight])

  // Re-pin once a morph settles: the observer only reports size changes, and
  // the morph may have landed on exactly the size it left.
  useEffect(() => {
    if (inline || phase !== 'idle') return
    settleHeight()
  }, [inline, phase, settleHeight])

  useEffect(() => {
    if (!modal || !lockScrollWhileOpen || !hasSheets) return
    return lockScroll()
  }, [modal, hasSheets, lockScrollWhileOpen])

  useEffect(() => {
    if (!modal || !trapFocusWhileOpen || topSlotId === null) return
    const element = topSlotRef.current
    if (!element) return
    return trapFocus(element)
  }, [modal, topSlotId, trapFocusWhileOpen])

  useEffect(() => {
    if (!modal || !closeOnEscape || !hasSheets) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return
      // Escape drains the highest occupied tier first.
      if (tier !== 'element' && anyElementOpen()) return
      event.preventDefault()
      void pop()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [modal, closeOnEscape, hasSheets, pop, tier, anyElementOpen])

  // Momentary surfaces dismiss lightly: Escape and any press outside them.
  useEffect(() => {
    if (tier !== 'element' || !lightDismiss || !hasSheets) return

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape' || !closeOnEscape) return
      event.preventDefault()
      void reset()
    }
    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target instanceof Element ? event.target : null
      if (!target) return
      // The region itself, and anything marked as a toggle for it, don't count
      // as outside — otherwise the closing press would race the reopening click.
      if (target.closest(`[data-stack="${id}"]`) || target.closest('[data-ms-no-dismiss]')) return
      void reset()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [tier, lightDismiss, hasSheets, closeOnEscape, reset, id])

  const value = useMemo<SheetStackApi>(() => {
    const top = state.slots[state.slots.length - 1]
    return {
      id,
      tier,
      modal,
      slots: state.slots,
      depth: state.slots.length,
      maxDepth: state.maxDepth,
      phase,
      placement,
      willMorph: state.slots.length >= state.maxDepth,
      willMorphBack: (top?.views.length ?? 0) > 1,
      ...actions,
    }
  }, [id, tier, modal, state, phase, placement, actions])

  const region = (
    <SheetStackContext.Provider value={value}>
      {children}
      <SheetViewport
        stackId={id}
        tier={tier}
        adjacent={adjacent}
        modal={modal}
        inline={inline}
        slots={state.slots}
        morphing={morphing}
        placement={placement}
        phase={phase}
        contentPhase={contentPhase}
        exitingSlotIds={exitingSlotIds}
        enteringSlotIds={enteringSlotIds}
        topSlotRef={topSlotRef}
        topContentRef={topContentRef}
        topFitRef={topFitRef}
        anchors={anchorsRef.current}
        queued={pending}
        onScrimClick={closeOnScrimClick ? () => void pop() : undefined}
        container={container}
      />
    </SheetStackContext.Provider>
  )

  return inherited === null && registry !== null ? (
    <SheetStackRegistryContext.Provider value={registry}>{region}</SheetStackRegistryContext.Provider>
  ) : (
    region
  )
}
