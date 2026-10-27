import { Link } from '@tanstack/react-router'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

import { BackIcon } from '../icons'
import { seq } from '../ui'
import type { SavedQuery } from '../../__generated__/SavedQuery.graphql'

/** Kept characters. Each is only a roll key — the list re-derives the rest. */
export function Saved() {
  const data = useLazyLoadQuery<SavedQuery>(
    graphql`
      query SavedQuery {
        saved {
          savedAt
          roll {
            key
            name
            headline
            entries {
              attribute {
                key
                color
              }
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-only' },
  )
  const saved = data.saved ?? []

  return (
    <div data-stage-floor className="space-y-3.5">
      <div className="ms-seq flex items-center gap-2" style={seq(0)}>
        <Link to="/" className="press -ml-2 grid size-9 place-items-center rounded-full text-muted hover:text-ink" aria-label="처음으로">
          <BackIcon />
        </Link>
        <div>
          <p className="eyebrow">보관함</p>
          <h2 className="headline">모아 둔 캐릭터 {saved.length}명</h2>
        </div>
      </div>

      {saved.length === 0 ? (
        <p className="ms-seq rounded-[14px] bg-white/[0.04] px-4 py-6 text-center text-[13px] text-muted" style={seq(1)}>
          결과 화면의 별을 누르면 여기에 모여요.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {saved.map((entry, index) => (
            <li key={entry.roll?.key} className="ms-item" style={seq(index + 1)}>
              <Link
                to="/result"
                search={{ k: entry.roll?.key ?? '' }}
                className="press result-row flex items-center gap-3"
              >
                <span className="flex -space-x-1">
                  {(entry.roll?.entries ?? []).slice(0, 6).map((e) => (
                    <span key={e.attribute?.key} className="size-3.5 rounded-full ring-2 ring-[var(--ms-surface)]" style={{ background: e.attribute?.color ?? '#888' }} />
                  ))}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">{entry.roll?.name ?? '이름 없는 캐릭터'}</span>
                  <span className="block truncate text-[11.5px] text-faint">
                    {entry.roll?.headline} · {entry.savedAt}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
