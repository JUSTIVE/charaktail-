import { useState, type CSSProperties } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../../graph/useLocalQuery'
import { useSheetStackActions } from 'morphing-sheet/react'

import { decodeRollKey, encodeRollKey } from '../../domain/roll'
import { router } from '../../router'
import { toggleLock } from '../../state/locks'
import { toggleSaved } from '../../state/saved'
import { haptic } from '../../stage/haptics'
import { LockIcon, ShareIcon, ShakeIcon, ShuffleIcon, StarIcon } from '../icons'
import { attributeHead } from '../attributeHead'
import { HairArt } from '../hairArt'
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
  const data = useLocalQuery<ResultQuery>(
    graphql`
      query ResultQuery($key: String!) {
        roll(key: $key) {
          key
          name
          seed
          saved
          entries {
            attribute {
              ...attributeHead_attribute
            }
            value
            detail
            swatches
            possible
          }
        }
        stage {
          motion
        }
      }
    `,
    { key },
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
    haptic.reroll()
    void router.navigate({ to: '/result', search: { k: encodeRollKey({ ...request, nonces }) }, replace: true })
  }

  const share = async () => {
    const url = location.href
    const lines = (roll.entries ?? []).map((e) => `${(e.attribute && attributeHead(e.attribute)?.label) ?? ''}: ${e.value}`)
    const text = [roll.name ?? '', ...lines].filter(Boolean).join('\n')
    if (navigator.share) {
      await navigator.share({ title: 'charaktail 캐릭터', text, url }).catch(() => {})
      return
    }
    await navigator.clipboard?.writeText(`${text}\n${url}`)
    setShared(true)
    setTimeout(() => setShared(false), 1600)
  }

  return (
    <div data-stage-floor className="result-root">
      <div className="ms-seq flex items-start justify-between gap-3" style={seq(0)}>
        <div className="min-w-0">
          <h2 className="display truncate">{roll.name ?? '이름 없는 캐릭터'}</h2>
          {data.stage?.motion === 'granted' ? <p className="mt-0.5 text-[11.5px] text-faint">한 번 더 세게 흔들면 새로 뽑아요</p> : null}
        </div>
        <button
          type="button"
          onClick={() => {
            if (!roll.saved) haptic.save()
            toggleSaved(roll.key ?? key)
          }}
          aria-pressed={roll.saved ?? false}
          aria-label={roll.saved ? '보관함에서 빼기' : '보관함에 담기'}
          className="press star grid size-10 shrink-0 place-items-center rounded-full text-muted hover:text-ink aria-pressed:text-star"
        >
          <StarIcon filled={roll.saved ?? false} />
        </button>
      </div>

      {/* Only the cards scroll; the header and the actions always fit. */}
      <ul className="result-list">
        {(roll.entries ?? []).map((entry, index) => {
          const attribute = entry.attribute ? attributeHead(entry.attribute) : null
          const value = entry.value ?? ''
          const locked = attribute?.locked ?? false
          const wide = value.length + (entry.swatches?.length ?? 0) * 2 > 10
          return (
            <li
              key={attribute?.key}
              data-wide={wide || undefined}
              data-locked={locked || undefined}
              className="ms-seq result-card"
              style={{ ...seq(index + 1), '--row': attribute?.color } as CSSProperties}
            >
              <button
                type="button"
                className="press-soft min-w-0 flex-1 text-left"
                // A plain sheet, not one grown out of the card: on iOS the card's
                // text did not repaint after being the morph's source (#78, #113).
                onClick={() =>
                  void dialogs.push(
                    {
                      id: `pool-${attribute?.key}`,
                      title: `${attribute?.label}`,
                      width: '440px',
                      content: (
                        <PoolSheet
                          color={attribute?.color ?? '#888'}
                          value={value}
                          detail={entry.detail ?? null}
                          possible={entry.possible ?? []}
                        />
                      ),
                    },
                  )
                }
              >
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
                  <Dot color={attribute?.color ?? '#888'} size={7} />
                  {attribute?.label}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span className="tnum line-clamp-2 text-[15px] leading-tight font-bold tracking-[-0.01em]">{value}</span>
                  <Swatches colors={entry.swatches ?? []} />
                  {attribute?.key === 'hairStyle' ? <HairArt id={value} width={30} height={30} className="-my-1.5 shrink-0" style={{ color: attribute.color }} /> : null}
                </span>
                {entry.detail ? <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-faint">{entry.detail}</span> : null}
              </button>
              <span className="-mt-1 -mr-1 flex shrink-0 flex-col items-center">
                <button
                  type="button"
                  aria-label={`${attribute?.label} 다시 뽑기`}
                  // A locked value stays as it is — unlock it to re-roll.
                  disabled={locked}
                  onClick={() => reroll(attribute?.key ?? '')}
                  className="press grid size-8 place-items-center rounded-full text-faint hover:bg-white/5 hover:text-ink disabled:opacity-25"
                >
                  <ShuffleIcon width={15} height={15} />
                </button>
                <button
                  type="button"
                  aria-pressed={locked}
                  aria-label={locked ? `${attribute?.label} 잠금 풀기` : `${attribute?.label} 잠그기 — 다시 흔들어도 유지`}
                  onClick={() => {
                    haptic.select()
                    toggleLock(attribute?.key ?? '', roll.key ?? key)
                  }}
                  className="lock-toggle press grid size-8 place-items-center rounded-full text-faint hover:bg-white/5 hover:text-ink"
                >
                  <LockIcon locked={locked} width={15} height={15} />
                </button>
              </span>
            </li>
          )
        })}
      </ul>

      <div className="ms-seq flex items-center gap-2" style={seq((roll.entries?.length ?? 0) + 1)}>
        <Button onClick={() => void share()}>
          <ShareIcon width={16} height={16} />
          {shared ? '복사됨' : '공유'}
        </Button>
        <Button
          variant="primary"
          className="flex-1 px-5"
          // Back to the picker, still holding this roll's attributes and name
          // (SceneSync restored both from the key), ready to adjust and shake.
          onClick={() => void router.navigate({ to: '/', search: {} })}
        >
          <ShakeIcon width={17} height={17} />
          다시 흔들기
        </Button>
      </div>
    </div>
  )
}
