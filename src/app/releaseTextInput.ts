/**
 * iOS Safari answers a shake with "Undo Typing" whenever a text field has
 * undoable edits — exactly what the shake screen asks the player to do. Before
 * any screen that listens for shakes: blur the focused field (which also
 * drops the keyboard) and clear every text field's undo history. WebKit
 * clears a field's undo stack when its value is written from script, so each
 * field is rewritten with its own value — nothing the player typed changes.
 */
export function releaseTextInput(): void {
  const active = document.activeElement
  if (active instanceof HTMLElement && active !== document.body) active.blur()
  for (const field of document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')) {
    if (field instanceof HTMLInputElement && !TEXT_TYPES.has(field.type)) continue
    const value = field.value
    field.value = ''
    field.value = value
  }
}

const TEXT_TYPES = new Set(['text', 'search', 'email', 'url', 'tel', 'password', 'number'])
