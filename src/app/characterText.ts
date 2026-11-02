/*
 * A character as text, for leaving the app: the share sheet's plain lines,
 * and Markdown for pasting into notes, a doc or a chat that renders it.
 * Both 결과 and 보관함 build from the same entries.
 */

export interface CharacterLine {
  label: string
  value: string
  detail?: string | null | undefined
}

export const UNNAMED = '이름 없는 캐릭터'

/** The link that opens this character again — a roll key reproduces all of it. */
export function characterUrl(key: string): string {
  return `${location.origin}/result?k=${encodeURIComponent(key)}`
}

export function characterPlain(name: string | null | undefined, lines: readonly CharacterLine[]): string {
  return [name ?? '', ...lines.map((l) => `${l.label}: ${l.value}`)].filter(Boolean).join('\n')
}

/** `# 이름`, then one bullet per attribute — the value bold-labelled, its line after a dash. */
export function characterMarkdown(name: string | null | undefined, lines: readonly CharacterLine[], url: string): string {
  const bullets = lines.map((l) => `- **${l.label}**: ${l.value}${l.detail ? ` — ${l.detail}` : ''}`)
  return [`# ${name || UNNAMED}`, '', ...bullets, '', `[charaktail에서 열기](${url})`].join('\n')
}

/** The share sheet where there is one; otherwise the text and link go to the clipboard. Resolves to 'copied' then. */
export async function shareCharacter(name: string | null | undefined, lines: readonly CharacterLine[], url: string): Promise<'shared' | 'copied'> {
  const text = characterPlain(name, lines)
  if (navigator.share) {
    await navigator.share({ title: 'charaktail 캐릭터', text, url }).catch(() => {})
    return 'shared'
  }
  await navigator.clipboard?.writeText(`${text}\n${url}`)
  return 'copied'
}

/** The same character as data: name, link, and each attribute by id with its value and line. */
export function characterJson(name: string | null | undefined, key: string, lines: readonly (CharacterLine & { id: string })[], url: string): string {
  const data = {
    name: name || null,
    key,
    url,
    attributes: lines.map((l) => ({ id: l.id, label: l.label, value: l.value, ...(l.detail ? { detail: l.detail } : {}) })),
  }
  return JSON.stringify(data, null, 2)
}

/** Hands the browser a file to save — 별사람.json. */
export function downloadText(filename: string, text: string, type: string): void {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** A file name from a character's name, safe on every system. */
export function fileNameFor(name: string | null | undefined, ext: string): string {
  const base = (name || 'charaktail-캐릭터').replace(/[\\/:*?"<>|]+/g, '').trim() || 'charaktail-캐릭터'
  return `${base}.${ext}`
}
