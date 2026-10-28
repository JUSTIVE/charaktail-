import { useId, type ReactNode } from 'react'

/*
 * A tap the phone can feel. iOS has no vibration API; the one haptic the web
 * gets there is a native switch being toggled — and since iOS 26.5 only when
 * a real finger toggles it, not a script (#117). So the control is covered by
 * a transparent <label> wired to a hidden switch: the tap lands on the label,
 * the browser toggles the switch itself and ticks, and the same tap runs the
 * action. Android and desktop just get the action (and `navigator.vibrate`
 * from the caller, where there is one).
 *
 * The covered control stays in the tab order for keyboards and screen
 * readers; only pointer taps go through the label.
 */
export function HapticTap({
  onTap,
  children,
  disabled = false,
  className = '',
}: {
  onTap: () => void
  children: ReactNode
  /** No label (and no tick) while the control can't be used. */
  disabled?: boolean
  className?: string
}) {
  const id = useId()
  return (
    <span className={`haptic-host ${className}`}>
      {children}
      {/* `switch` is not in React's types yet; set it on the element. */}
      <input id={id} type="checkbox" ref={(el) => el?.setAttribute('switch', '')} className="haptic-switch" tabIndex={-1} aria-hidden="true" />
      {disabled ? null : <label htmlFor={id} className="haptic-hit" aria-hidden="true" onClick={onTap} />}
    </span>
  )
}
