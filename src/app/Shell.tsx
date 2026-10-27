import { Suspense, useEffect, type ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { graphql } from 'relay-runtime'

import { useLocalQuery } from '../graph/useLocalQuery'
import { SheetStackProvider, useSheetStackActions, type SheetDescriptor } from 'morphing-sheet/react'

import { decodeRollKey } from '../domain/roll'
import { setName } from '../state/name'
import { setSelection } from '../state/selection'
import type { StageMode } from '../stage/store'
import { ArchiveIcon } from './icons'
import { UpdateToast } from './UpdateToast'
import { releaseTextInput } from './releaseTextInput'
import { StageCanvas, stageHandle } from './StageCanvas'
import { Picker } from './views/Picker'
import { Result } from './views/Result'
import { Saved } from './views/Saved'
import { ValuesSheet } from './views/ValuesSheet'
import { ShakeHud } from './views/ShakeHud'
import type { ShellSavedCountQuery } from '../__generated__/ShellSavedCountQuery.graphql'

/**
 * The skeleton, after morphing-sheet's incubators: the stage is the floor,
 * one non-modal `panel` region floats over it at the bottom and morphs
 * between the four steps, and a `dialogs` region takes momentary detail.
 * The URL decides the step; the panel and the stage follow it.
 */
export function Shell() {
  return (
    <SheetStackProvider id="dialogs" tier="structure" placement="bottom">
      <Suspense fallback={null}>
        <StageCanvas />
      </Suspense>
      <TopBar />
      <Suspense fallback={null}>
        <UpdateToast />
      </Suspense>
      <SheetStackProvider
        id="panel"
        tier="structure"
        modal={false}
        placement="bottom"
        closeOnEscape={false}
        closeOnScrimClick={false}
        lockScrollWhileOpen={false}
        trapFocusWhileOpen={false}
        initialViews={[viewFor(readScene(location.pathname), new URLSearchParams(location.search).get('values') ?? undefined)]}
      >
        {null}
      </SheetStackProvider>
      <SceneSync />
    </SheetStackProvider>
  )
}

type Scene = 'pick' | 'shake' | 'result' | 'saved'

function readScene(pathname: string): Scene {
  if (pathname.startsWith('/shake')) return 'shake'
  if (pathname.startsWith('/result')) return 'result'
  if (pathname.startsWith('/saved')) return 'saved'
  return 'pick'
}

function useScene(): Scene {
  return useRouterState({ select: (s) => readScene(s.location.pathname) })
}

const STAGE_MODE: Record<Scene, StageMode> = { pick: 'idle', shake: 'armed', result: 'revealed', saved: 'idle' }

/**
 * Each step is one view id, so the panel morphs between steps and never within
 * one. An attribute's value list is a view of its own on the same panel — the
 * picker morphs into it and back, and the URL (`?values=`) owns which.
 */
function viewFor(scene: Scene, values?: string): SheetDescriptor {
  const body = (content: ReactNode) => (
    <Suspense fallback={<div className="h-40" data-stage-floor />}>{content}</Suspense>
  )
  switch (scene) {
    case 'pick':
      return values
        ? { id: `values-${values}`, width: '520px', content: body(<ValuesSheet attributeId={values} />) }
        : { id: 'pick', width: '560px', content: body(<Picker />) }
    case 'shake':
      return { id: 'shake', width: '400px', content: body(<ShakeHud />) }
    case 'result':
      return { id: 'result', width: '540px', content: body(<Result />) }
    case 'saved':
      return { id: 'saved', width: '540px', content: body(<Saved />) }
  }
}

function SceneSync() {
  const panel = useSheetStackActions('panel')
  const dialogs = useSheetStackActions('dialogs')
  const scene = useScene()
  const search = useRouterState({ select: (s) => s.location.search as { a?: string; n?: string; k?: string; values?: string } })
  const values = scene === 'pick' ? search.values : undefined

  useEffect(() => {
    // Screens that listen for shakes must not leave Safari an undo to offer —
    // also when reached by a link or the back button, not only by the CTA.
    if (scene === 'shake' || scene === 'result') releaseTextInput()
    void panel.replace(viewFor(scene, values))
    if (dialogs.getDepth() > 0) void dialogs.reset()
  }, [panel, dialogs, scene, values])

  // The URL carries the attribute set on /shake and /result; the stage's balls
  // come from the selection, so the selection follows the URL there.
  useEffect(() => {
    if (scene === 'shake' && search.a) setSelection(search.a.split('.'))
    if (scene === 'shake' && search.n) setName(search.n)
    if (scene === 'result' && search.k) {
      const request = decodeRollKey(search.k)
      if (request) setSelection(request.attributeIds)
      if (request?.name) setName(request.name)
    }
  }, [scene, search.a, search.n, search.k])

  useEffect(() => {
    // Mid-sequence the stage outranks the route: /shake stays /shake while it
    // mixes and glows, and the stage navigates on its own when it is done.
    const apply = () => stageHandle.current?.setMode(STAGE_MODE[scene])
    apply()
    // The stage may mount after this effect on first load.
    const timer = setTimeout(apply, 0)
    return () => clearTimeout(timer)
  }, [scene])

  return null
}

function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="press flex items-center gap-2" aria-label="처음으로">
        <span aria-hidden className="logo-orb" />
        <span className="text-[15px] font-bold tracking-[-0.01em]">charaktail</span>
      </Link>
      <Suspense fallback={null}>
        <SavedLink />
      </Suspense>
    </header>
  )
}

function SavedLink() {
  const data = useLocalQuery<ShellSavedCountQuery>(
    graphql`
      query ShellSavedCountQuery {
        saved {
          savedAt
        }
        stage {
          mode
        }
      }
    `,
    {},
  )
  const count = data.saved?.length ?? 0
  const mode = data.stage?.mode
  return (
    <Link
      to="/saved"
      aria-label={`보관함 ${count}개`}
      data-hidden={mode === 'mixing' || mode === 'glowing' || undefined}
      className="press glass flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-muted transition-opacity hover:text-ink data-[hidden]:opacity-0"
    >
      <ArchiveIcon width={16} height={16} />
      <span className="tnum">{count}</span>
    </Link>
  )
}
