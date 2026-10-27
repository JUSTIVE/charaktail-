import { useState, type CSSProperties } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { useSheetStackActions } from 'morphing-sheet/react'

import { decodeRollKey, encodeRollKey } from '../../domain/roll'
import { router } from '../../router'
import { toggleSaved } from '../../state/saved'
import { vibrate } from '../../stage/haptics'
import { ShareIcon, ShakeIcon, ShuffleIcon, StarIcon } from '../icons'
import { Button, Dot, seq, Swatches } from '../ui'
import { PoolSheet } from './PoolSheet'
import type { ResultQuery } from '../../__generated__/ResultQuery.graphql'

/**
 * Step three: the character. The roll key in the URL is the whole character —
 * every value below is a resolver re-deriving it from (seed, attributes,
 * nonces). Re-rolling one attribute only bumps its nonce in the key.
 */
export function Result() {
  const key = useRouterState({ select: (s) => (s.location.search as { k?: string }).k ?? '' })
  const dialogs = useSheetStackActions('dialogs')
  const [shared, setShared] = useState(false)
  const data = useLazyLoadQuery<ResultQuery>(
    graphql`
      query ResultQuery($key: String!) {
        roll(key: $key) {
          key
          seed
          saved
          entries {
            attribute {
              key
              label
              color
            }
            value
            detail
            swatches
            possible
          }
        }
      }
    `,
    { key },
    { fetchPolicy: 'store-only' },
  )
  const roll = data.roll

  if (!roll) {
    return (
      <div data-stage-floor className="space-y-3 text-center">
        <p className="headline">이 링크로는 캐릭터를 찾을 수 없어요</p>
        <Button variant="primary" onClick={() => void router.navigate({ to: '/' })}>
          처음부터 뽑기
        </Button>
      </div>
    )
  }

  const reroll = (attributeId: string) => {
    const request = decodeRollKey(key)
    if (!request) return
    const nonces = { ...request.nonces, [attributeId]: (request.nonces?.[attributeId] ?? 0) + 1 }
    vibrate([12])
    void router.navigate({ to: '/result', search: { k: encodeRollKey({ ...request, nonces }) }, replace: true })
  }

  const share = async () => {
    const url = location.href
    const text = (roll.entries ?? []).map((e) => `${e.attribute?.label}: ${e.value}`).join('\n')
    if (navigator.share) {
      await navigator.share({ title: 'charaktail 캐릭터', text, url }).catch(() => {})
      return
    }
    await navigator.clipboard?.writeText(`${text}\n${url}`)
    setShared(true)
    setTimeout(() => setShared(false), 1600)
  }

  const attributeIds = decodeRollKey(key)?.attributeIds ?? []

  return (
    <div data-stage-floor className="space-y-3.5">
      <div className="ms-seq flex items-end justify-between gap-3" style={seq(0)}>
        <div>
          <p className="eyebrow">STEP 3 · 완성 · #{roll.seed}</p>
          <h2 className="display mt-1">새 캐릭터가 태어났어요</h2>
        </div>
        <button
          type="button"
          onClick={() => toggleSaved(roll.key ?? key)}
          aria-pressed={roll.saved ?? false}
          aria-label={roll.saved ? '보관함에서 빼기' : '보관함에 담기'}
          className="press grid size-10 shrink-0 place-items-center rounded-full text-muted hover:text-ink aria-pressed:text-[#ffd34d]"
        >
          <StarIcon filled={roll.saved ?? false} />
        </button>
      </div>

      <ul className="result-list space-y-1.5">
        {(roll.entries ?? []).map((entry, index) => {
          const attribute = entry.attribute
          return (
            <li key={attribute?.key} className="ms-seq result-row" style={{ ...seq(index + 1), '--row': attribute?.color } as CSSProperties}>
              <button
                type="button"
                className="press flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={(event) =>
                  void dialogs.push(
                    {
                      id: `pool-${attribute?.key}`,
                      title: `${attribute?.label}`,
                      width: '440px',
                      content: <PoolSheet color={attribute?.color ?? '#888'} value={entry.value ?? ''} detail={entry.detail ?? null} possible={entry.possible ?? []} />,
                    },
                    { from: event.currentTarget },
                  )
                }
              >
                <Dot color={attribute?.color ?? '#888'} />
                <span className="w-[4.5rem] shrink-0 text-[12px] font-medium text-muted">{attribute?.label}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[16px] font-bold tracking-[-0.01em]">{entry.value}</span>
                    <Swatches colors={entry.swatches ?? []} />
                  </span>
                  {entry.detail ? <span className="block truncate text-[11.5px] text-faint">{entry.detail}</span> : null}
                </span>
              </button>
              <button
                type="button"
                aria-label={`${attribute?.label} 다시 뽑기`}
                onClick={() => reroll(attribute?.key ?? '')}
                className="press grid size-9 shrink-0 place-items-center rounded-full text-faint hover:bg-white/5 hover:text-ink"
              >
                <ShuffleIcon width={16} height={16} />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="ms-seq flex items-center gap-2 pt-1" style={seq((roll.entries?.length ?? 0) + 1)}>
        <Button onClick={() => void share()}>
          <ShareIcon width={16} height={16} />
          {shared ? '복사됨' : '공유'}
        </Button>
        <Button
          variant="primary"
          className="ml-auto px-5"
          onClick={() => void router.navigate({ to: '/shake', search: { a: attributeIds.join('.') } })}
        >
          <ShakeIcon width={17} height={17} />
          다시 흔들기
        </Button>
      </div>
    </div>
  )
}
