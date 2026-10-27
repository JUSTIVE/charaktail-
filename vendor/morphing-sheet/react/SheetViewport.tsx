import type { CSSProperties, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'

import type { SheetSlot } from '../core/stack.js'
import type { ContentPhase, SheetEdge, SheetPlacement, SheetTier, StackPhase } from '../core/types.js'
import type { AnchorPoint, QueuedOp, SheetDescriptor } from './types.js'

type SlotStyle = CSSProperties & {
  viewTransitionName?: string
  viewTransitionClass?: string
  positionAnchor?: string
  '--ms-depth'?: number
  '--ms-slot-inline'?: string
}

interface SheetViewportProps {
  stackId: string
  tier: SheetTier
  /** True while this region's own morph runs — the only time names exist. */
  morphing: boolean
  adjacent?: readonly SheetEdge[] | undefined
  slots: readonly SheetSlot<SheetDescriptor>[]
  placement: SheetPlacement
  phase: StackPhase
  /** Only the top slot animates its content; the rest sit idle underneath. */
  contentPhase: ContentPhase
  /** Slots kept mounted for the length of their fade-out. */
  exitingSlotIds: readonly string[]
  /** Slots that just joined the stack and owe the viewer a fade-in. */
  enteringSlotIds: readonly string[]
  /** Modal regions dim the page and own focus; persistent ones sit in the layout. */
  modal: boolean
  /** Render in the normal flow instead of a fixed overlay. */
  inline: boolean
  topSlotRef: RefObject<HTMLElement | null>
  topContentRef: RefObject<HTMLDivElement | null>
  /** Natural-size layer of the top slot's active view — what resizing observes. */
  topFitRef: RefObject<HTMLDivElement | null>
  /** Anchor points per slot id, for popover-style placement. */
  anchors: ReadonlyMap<string, AnchorPoint>
  /** Ops waiting in the region's queue — non-empty only while the inspector
   * shows them (#105). Their views are drawn as inert ghosts. */
  queued?: readonly QueuedOp[] | undefined
  onScrimClick?: (() => void) | undefined
  container?: Element | DocumentFragment | null | undefined
}

/**
 * Renders one sheet region.
 *
 * Two rules carry the design: the `view-transition-name` belongs to the slot
 * frame (so it is the *area* that morphs, never the content), and covered views
 * are hidden rather than unmounted (so their state is still there on the way
 * back).
 */
export function SheetViewport({
  stackId,
  tier,
  morphing,
  adjacent,
  slots,
  placement,
  phase,
  contentPhase,
  exitingSlotIds,
  enteringSlotIds,
  modal,
  inline,
  topSlotRef,
  topContentRef,
  topFitRef,
  anchors,
  queued = [],
  onScrimClick,
  container,
}: SheetViewportProps): ReactNode {
  const ghosts = queued.filter((op) => op.descriptor !== undefined)
  // A first push still in the queue has no slot yet, but it is exactly what
  // the queue view exists to show.
  if (slots.length === 0 && ghosts.length === 0) return null

  const topIndex = slots.length - 1

  const tree = (
    <div
      className="ms-viewport"
      data-stack={stackId}
      data-tier={tier}
      data-adjacent={adjacent && adjacent.length > 0 ? adjacent.join(' ') : undefined}
      data-placement={placement}
      data-phase={phase}
      data-depth={slots.length}
      data-modal={modal ? 'true' : 'false'}
      data-inline={inline ? 'true' : 'false'}
      // Every remaining slot is on its way out, so the scrim leaves with them.
      data-clearing={exitingSlotIds.length > 0 && exitingSlotIds.length === slots.length ? 'true' : undefined}
      data-queue={queued.length > 0 ? queued.map((op) => (op.running ? `${op.kind}*` : op.kind)).join(' ') : undefined}
    >
      {modal && slots.length > 0 ? <div className="ms-scrim" aria-hidden onClick={onScrimClick} /> : null}

      {slots.map((slot, index) => {
        const depth = topIndex - index
        const isTop = depth === 0
        const activeView = slot.views[slot.views.length - 1]

        const anchor = anchors.get(slot.id)
        const style: SlotStyle = {
          '--ms-depth': depth,
          // Anchored slots pin to their trigger; the grid placement rules stop
          // applying the moment position leaves the grid flow.
          ...(anchor === undefined
            ? null
            : anchor.name !== null
              ? {
                  // The browser owns the geometry from here (#96): it keeps
                  // the sheet on its trigger through scroll and resize, flips
                  // it near an edge, and hides it once the anchor is scrolled
                  // out of view. The stylesheet carries those rules; only the
                  // name is per-slot.
                  //
                  // `fixed`, not `absolute`, and that is the whole trick: an
                  // anchor is only acceptable when the positioned element's
                  // containing block is an ancestor of the anchor's. This
                  // viewport is portalled to the body, so as an absolute slot
                  // its containing block sits outside the anchor's chain and
                  // the browser silently ignores the attachment. Fixed makes
                  // the containing block the viewport itself, which is an
                  // ancestor of everything.
                  position: 'fixed',
                  // The gap rides inline with the rest: the region's own
                  // placement margin would otherwise win on specificity.
                  margin: '8px 0',
                  positionAnchor: anchor.name,
                }
              : {
                  position: 'absolute',
                  left: anchor.x,
                  top: anchor.y,
                  margin: 0,
                  // The flip rides `translate`, not `transform`: the arrival
                  // and exit keyframes animate `transform` with fill `both`,
                  // which would otherwise override the inline flip for the
                  // whole animation and then hold it at `none` forever (#82).
                  translate: anchor.above ? '0 -100%' : undefined,
                }),
          // Width belongs to the view, not the slot, so a morph can change it.
          ...(activeView?.payload.width === undefined
            ? null
            : { '--ms-slot-inline': activeView.payload.width }),
          // The name exists only on the morphing region's top slot, and only
          // while its morph runs. Everything else stays out of the capture and
          // sits still in the root snapshot — parents and siblings never morph
          // along. Namespaced by stack in case two regions ever overlap a run.
          ...(isTop && morphing
            ? {
                viewTransitionName: `ms-${stackId}-slot-${index}`,
                viewTransitionClass: 'ms-slot',
              }
            : null),
        }

        return (
          <section
            key={slot.id}
            ref={isTop ? topSlotRef : undefined}
            className="ms-slot"
            style={style}
            data-depth={depth}
            data-anchored={anchor === undefined ? undefined : anchor.name === null ? 'point' : 'css'}
            data-exiting={exitingSlotIds.includes(slot.id) ? 'true' : undefined}
            data-entering={enteringSlotIds.includes(slot.id) ? 'true' : undefined}
            role={modal ? 'dialog' : undefined}
            aria-modal={modal ? isTop : undefined}
            aria-label={typeof activeView?.payload.title === 'string' ? activeView.payload.title : undefined}
            tabIndex={modal ? -1 : undefined}
            inert={modal ? !isTop : undefined}
          >
            <div
              ref={isTop ? topContentRef : undefined}
              className="ms-slot-content"
              data-content-state={isTop ? contentPhase : 'idle'}
            >
              {slot.views.map((view, viewIndex) => {
                // By position, never by id: the visible view is the last one
                // (spec §3), and comparing ids would mark two of them active
                // if a duplicate ever reached the stack (#92).
                const isActive = viewIndex === slot.views.length - 1
                return (
                  <article
                    key={view.id}
                    className={view.payload.className ? `ms-view ${view.payload.className}` : 'ms-view'}
                    data-active={isActive}
                    hidden={!isActive}
                    inert={!isActive}
                  >
                    {view.payload.title ? (
                      <header className="ms-view-header">{view.payload.title}</header>
                    ) : null}
                    <div className="ms-view-body ms-scroll">
                      {/* Never clamped by the slot, even when the body scrolls:
                          its size is the content's natural size (#36). */}
                      <div className="ms-view-fit" ref={isTop && isActive ? topFitRef : undefined}>
                        {view.payload.content}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}

      {ghosts.length > 0 ? (
        <div className="ms-queue" aria-hidden inert>
          {ghosts.map((op, index) => {
            const title = op.descriptor?.title
            return (
              <article
                key={op.key}
                className="ms-queued"
                data-kind={op.kind}
                data-running={op.running}
                data-ms-queued-label={[
                  `${stackId} · queued ${index + 1}/${ghosts.length}`,
                  op.kind,
                  op.running ? 'running' : 'waiting',
                  typeof title === 'string' ? title : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
                style={
                  {
                    '--ms-queue-index': index,
                    '--ms-slot-inline': op.descriptor?.width,
                  } as CSSProperties
                }
              >
                {title ? <header className="ms-view-header">{title}</header> : null}
                <div className="ms-view-body">
                  <div className="ms-view-fit">{op.descriptor?.content}</div>
                </div>
              </article>
            )
          })}
        </div>
      ) : null}
    </div>
  )

  // A persistent region belongs in the layout it was declared in; only overlays
  // get portalled out. Resolved during render so a slot exists in the very
  // commit the view transition captures.
  if (inline) return tree
  const target = container ?? (typeof document === 'undefined' ? null : document.body)
  return target === null ? null : createPortal(tree, target)
}
