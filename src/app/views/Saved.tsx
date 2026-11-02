import { Link, useSearch } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'

import { router } from '../../router'
import { haptic } from '../../stage/haptics'
import { addFolder, moveToFolder, removeFolder, renameFolder } from '../../state/saved'
import { FOLDER_NAME_MAX } from '../../state/schema'
import { attributeHead } from '../attributeHead'
import { BackIcon, FolderIcon, PlusIcon } from '../icons'
import { Button, seq } from '../ui'
import type { SavedQuery } from '../../__generated__/SavedQuery.graphql'

const toFolder = (f: string | undefined) => void router.navigate({ to: '/saved', search: { f }, replace: true })

/**
 * Kept characters. Each is only a roll key — the list re-derives the rest.
 * Folders sort them: 전체 holds everyone, a folder (`?f=`) the ones filed in
 * it; deleting a folder files its characters back under 전체 only.
 */
export function Saved() {
  const data = useLocalQuery<SavedQuery>(
    graphql`
      query SavedQuery {
        folders {
          key
          name
          count
        }
        saved {
          savedAt
          folder
          roll {
            key
            name
            headline
            entries {
              attribute {
                ...attributeHead_attribute
              }
            }
          }
        }
      }
    `,
    {},
  )
  // Not tied to /saved: this view is still on screen, morphing away, after
  // the route has already left it — a strict read would throw then (#148).
  const search = useSearch({ strict: false }) as { f?: unknown }
  const f = typeof search.f === 'string' ? search.f : undefined
  const folders = data.folders ?? []
  const all = data.saved ?? []
  const current = folders.find((folder) => folder.key === f) ?? null
  const saved = current ? all.filter((entry) => entry.folder === current.key) : all
  const folderName = new Map(folders.map((folder) => [folder.key, folder.name]))
  // Which inline form is open: a new folder, or renaming the current one.
  const [editing, setEditing] = useState<'new' | 'rename' | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div data-stage-floor className="space-y-3.5">
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <Link to="/" className="press -ml-2 grid size-9 place-items-center rounded-full text-muted hover:text-ink" aria-label="처음으로">
          <BackIcon />
        </Link>
        <div className="min-w-0">
          <p className="eyebrow">보관함</p>
          <h2 className="headline truncate">{current ? `${current.name} · ${saved.length}명` : `모아 둔 캐릭터 ${saved.length}명`}</h2>
        </div>
      </div>

      {/* 전체, each folder, and a new one — one row that scrolls sideways. */}
      <div className="ms-seq folder-strip" role="tablist" aria-label="폴더" style={seq(1)}>
        <button type="button" role="tab" aria-selected={!current} className="folder-pill press-soft" onClick={() => { haptic.select(); setEditing(null); toFolder(undefined) }}>
          전체 <span className="tnum opacity-60">{all.length}</span>
        </button>
        {folders.map((folder) => (
          <button
            key={folder.key}
            type="button"
            role="tab"
            aria-selected={current?.key === folder.key}
            className="folder-pill press-soft"
            onClick={() => {
              haptic.select()
              setEditing(null)
              setConfirmDelete(false)
              toFolder(folder.key ?? undefined)
            }}
          >
            <FolderIcon width={14} height={14} className="shrink-0 opacity-70" />
            {folder.name} <span className="tnum opacity-60">{folder.count}</span>
          </button>
        ))}
        <button
          type="button"
          className="folder-pill folder-pill-add press-soft"
          aria-expanded={editing === 'new'}
          onClick={() => {
            haptic.select()
            setEditing(editing === 'new' ? null : 'new')
          }}
        >
          <PlusIcon width={14} height={14} />새 폴더
        </button>
      </div>

      {editing ? (
        <FolderNameForm
          key={editing}
          initial={editing === 'rename' ? (current?.name ?? '') : ''}
          submitLabel={editing === 'rename' ? '바꾸기' : '만들기'}
          onSubmit={(name) => {
            if (editing === 'rename' && current) return renameFolder(current.key ?? '', name)
            const made = addFolder(name)
            if ('error' in made) return made.error
            toFolder(made.id)
            return null
          }}
          onClose={() => setEditing(null)}
        />
      ) : current ? (
        <div className="ms-seq flex gap-2" style={seq(2)}>
          <Button variant="ghost" className="px-2.5 py-1.5 text-[12.5px]" onClick={() => { setConfirmDelete(false); setEditing('rename') }}>
            이름 바꾸기
          </Button>
          <Button
            variant="ghost"
            className={`px-2.5 py-1.5 text-[12.5px] ${confirmDelete ? 'text-[#ff977d]' : ''}`}
            onClick={() => {
              if (!confirmDelete) return setConfirmDelete(true)
              haptic.select()
              setConfirmDelete(false)
              removeFolder(current.key ?? '')
              toFolder(undefined)
            }}
          >
            {confirmDelete ? '한 번 더 누르면 폴더만 지워요' : '폴더 삭제'}
          </Button>
        </div>
      ) : null}

      {saved.length === 0 ? (
        <p className="ms-seq rounded-[14px] bg-white/[0.04] px-4 py-6 text-center text-[13px] text-muted" style={seq(2)}>
          {current ? '목록의 폴더 버튼으로 캐릭터를 이 폴더에 넣어 보세요.' : '결과 화면의 별을 누르면 여기에 모여요.'}
        </p>
      ) : (
        <ul className="space-y-1.5">
          {saved.map((entry, index) => {
            const key = entry.roll?.key ?? ''
            const filed = entry.folder ? folderName.get(entry.folder) : undefined
            return (
              <li key={key} className="ms-item relative" style={seq(index + 2)}>
                <Link to="/result" search={{ k: key }} className="press result-row flex items-center gap-3 pr-12">
                  <span className="flex -space-x-1">
                    {(entry.roll?.entries ?? []).slice(0, 6).map((e, i) => (
                      <span key={i} className="size-3.5 rounded-full ring-2 ring-[var(--ms-surface)]" style={{ background: (e.attribute && attributeHead(e.attribute)?.color) ?? '#888' }} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold">{entry.roll?.name ?? '이름 없는 캐릭터'}</span>
                    <span className="block truncate text-[11.5px] text-faint">
                      {!current && filed ? `${filed} · ` : ''}
                      {entry.roll?.headline} · {entry.savedAt}
                    </span>
                  </span>
                </Link>
                {/* A native picker over the icon: the phone's own sheet lists the folders. */}
                {folders.length > 0 ? (
                  <label className="folder-move press" data-filed={entry.folder ? true : undefined} aria-label={`${entry.roll?.name ?? '캐릭터'} 폴더 옮기기`}>
                    <FolderIcon width={17} height={17} />
                    <select
                      value={entry.folder ?? ''}
                      onChange={(event) => {
                        haptic.select()
                        moveToFolder(key, event.target.value || null)
                      }}
                    >
                      <option value="">폴더 없음</option>
                      {folders.map((folder) => (
                        <option key={folder.key} value={folder.key ?? ''}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/** A folder's name, typed in place: making one, or renaming the open one. */
function FolderNameForm({ initial, submitLabel, onSubmit, onClose }: { initial: string; submitLabel: string; onSubmit: (name: string) => string | null; onClose: () => void }) {
  const [name, setName] = useState(initial)
  const [error, setError] = useState<string | null>(null)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const problem = onSubmit(name)
    setError(problem)
    if (problem) return
    haptic.select()
    onClose()
  }
  return (
    <form className="ms-seq space-y-2" style={seq(2)} onSubmit={submit}>
      <div className="flex items-center gap-2">
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setError(null)
          }}
          maxLength={FOLDER_NAME_MAX}
          placeholder="폴더 이름"
          aria-label="폴더 이름"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="done"
          className="name-field min-w-0 flex-1 py-2.5 text-[16px] outline-none placeholder:text-faint"
        />
        <Button type="submit" variant="primary" className="shrink-0 px-3.5 py-2.5" disabled={name.trim() === ''}>
          {submitLabel}
        </Button>
        <Button variant="ghost" className="shrink-0 px-2.5 py-2.5" onClick={onClose}>
          취소
        </Button>
      </div>
      {error ? <p className="text-[12px] text-[#ff977d]">{error}</p> : null}
    </form>
  )
}
