import { useEffect, useState } from 'react'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../graph/useLocalQuery'
import { dismissOfflineReady, installUpdate } from '../state/app'
import type { UpdateToastQuery } from '../__generated__/UpdateToastQuery.graphql'

/**
 * The installed app's news, as a pill under the top bar.
 *
 * Update waiting → "새 버전이 도착했어요": a pill whose rim shimmers in the
 * palette. Tapping it pops the pill like a drop, then the new version loads.
 * Offline ready → a one-off note that leaves by itself.
 */
export function UpdateToast() {
  const data = useLocalQuery<UpdateToastQuery>(
    graphql`
      query UpdateToastQuery {
        app {
          updateReady
          offlineReady
        }
      }
    `,
    {},
  )
  const [popping, setPopping] = useState(false)
  const update = data.app?.updateReady ?? false
  const offline = data.app?.offlineReady ?? false

  useEffect(() => {
    if (!offline) return
    const timer = setTimeout(dismissOfflineReady, 3200)
    return () => clearTimeout(timer)
  }, [offline])

  if (update) {
    return (
      <div className="update-toast" role="status">
        <button
          type="button"
          className="update-pill press"
          data-popping={popping || undefined}
          onClick={() => {
            if (popping) return
            setPopping(true)
            // Let the pop play, then swap versions (the page reloads).
            setTimeout(() => void installUpdate(), 420)
          }}
        >
          <span aria-hidden className="update-dot" />
          새 버전이 도착했어요
          <span className="update-cta">업데이트</span>
        </button>
      </div>
    )
  }
  if (offline) {
    return (
      <div className="update-toast" role="status">
        <span className="update-pill update-pill-quiet">오프라인에서도 쓸 수 있어요</span>
      </div>
    )
  }
  return null
}
