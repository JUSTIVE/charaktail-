import { z } from 'zod'

/*
 * The app's state, as schemas — the same discipline as the catalogue. Every
 * persisted cell revives through one of these, so a stale or hand-edited
 * localStorage entry is rejected instead of half-loaded, and every type the
 * app uses for state is inferred from here.
 */

export { Edits } from '../domain/edits'

export const Selection = z.array(z.string().min(1))
export type Selection = z.infer<typeof Selection>

export const NAME_MAX = 20
export const Name = z.string().max(NAME_MAX)

export const SavedCharacter = z.object({
  /** A roll key — the catalogue re-derives everything else. */
  key: z.string().min(1),
  savedAt: z.number(),
})
export type SavedCharacter = z.infer<typeof SavedCharacter>
export const SavedList = z.array(SavedCharacter)

/**
 * The stage's choreography, as the UI sees it.
 *   idle      drops float above the picker, labels on
 *   armed     waiting for a hard shake; charge fills as you shake
 *   mixing    labels gone, colours melt, everything swirls to the centre
 *   glowing   one body, lighting up — ends in a flash and a buzz
 *   revealed  the drops are gone; the result is the character
 */
export const StageMode = z.enum(['idle', 'armed', 'mixing', 'glowing', 'revealed'])
export type StageMode = z.infer<typeof StageMode>

export const MotionAccess = z.enum(['unknown', 'prompt', 'granted', 'denied', 'unsupported'])
export type MotionAccess = z.infer<typeof MotionAccess>

export const StageStatus = z.object({ mode: StageMode, motion: MotionAccess })
export type StageStatus = z.infer<typeof StageStatus>

/** A reviver for `Cell`: the parsed value, or null to fall back to the default. */
export function revive<T>(schema: z.ZodType<T>) {
  return (stored: unknown): T | null => {
    const parsed = schema.safeParse(stored)
    return parsed.success ? parsed.data : null
  }
}
