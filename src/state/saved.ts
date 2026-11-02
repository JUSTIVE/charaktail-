import { Cell } from './cell'
import { FOLDER_NAME_MAX, FolderList, revive, SavedList, type SavedCharacter, type SavedFolder } from './schema'

export type { SavedCharacter, SavedFolder }

export const savedCell = new Cell<readonly SavedCharacter[]>([], 'charaktail:saved', revive(SavedList))

/** 보관함's folders, in the order they were made. */
export const foldersCell = new Cell<readonly SavedFolder[]>([], 'charaktail:folders', revive(FolderList))

export function toggleSaved(key: string): void {
  savedCell.set((list) =>
    list.some((s) => s.key === key) ? list.filter((s) => s.key !== key) : [{ key, savedAt: Date.now() }, ...list],
  )
}

function checkName(name: string, except?: string): string | null {
  if (name === '') return '폴더 이름을 입력해 주세요.'
  if (name.length > FOLDER_NAME_MAX) return `폴더 이름은 ${FOLDER_NAME_MAX}자까지예요.`
  if (foldersCell.read().some((f) => f.name === name && f.id !== except)) return '같은 이름의 폴더가 있어요.'
  return null
}

/** Makes a folder. Returns its id, or why it could not be made. */
export function addFolder(name: string): { id: string } | { error: string } {
  const trimmed = name.trim()
  const error = checkName(trimmed)
  if (error) return { error }
  const id = `f${Date.now().toString(36)}${Math.floor(Math.random() * 36 ** 2).toString(36)}`
  foldersCell.set((list) => [...list, { id, name: trimmed, createdAt: Date.now() }])
  return { id }
}

/** Returns why the name was refused, or null. */
export function renameFolder(id: string, name: string): string | null {
  const trimmed = name.trim()
  const error = checkName(trimmed, id)
  if (error) return error
  foldersCell.set((list) => list.map((f) => (f.id === id ? { ...f, name: trimmed } : f)))
  return null
}

/** Deletes the folder only — the characters in it stay in 보관함, unfiled. */
export function removeFolder(id: string): void {
  foldersCell.set((list) => list.filter((f) => f.id !== id))
  savedCell.set((list) => list.map(({ folder, ...rest }) => (folder === id ? rest : { ...rest, ...(folder ? { folder } : {}) })))
}

/** Files a saved character in a folder, or takes it out with null. */
export function moveToFolder(key: string, folder: string | null): void {
  savedCell.set((list) =>
    list.map((s) => {
      if (s.key !== key) return s
      const { folder: _, ...rest } = s
      return folder ? { ...rest, folder } : rest
    }),
  )
}
