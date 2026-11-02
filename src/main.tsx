import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RelayEnvironmentProvider } from 'react-relay'
import { RouterProvider } from '@tanstack/react-router'
import { registerSW } from 'virtual:pwa-register'

import './index.css'
import 'morphing-sheet/styles.css'

import { installOverlayScrollbars } from 'morphing-sheet'

import { environment } from './relay'
import { router } from './router'
import { markOfflineReady, markUpdateReady, setUpdater } from './state/app'
import { syncLocksWithUrl } from './state/locks'

installOverlayScrollbars()
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh: markUpdateReady,
  onOfflineReady: markOfflineReady,
})
setUpdater(() => updateSW(true))
// Dev only: lets a test harness show the update prompt without a new build.
if (import.meta.env.DEV) Object.assign(window, { __pwa: { markUpdateReady, markOfflineReady } })

// Locks live in the address: `?l=` on whatever screen is open.
syncLocksWithUrl({
  read: () => new URLSearchParams(location.search).get('l') ?? undefined,
  write: (l) =>
    void router.navigate({ to: router.state.location.pathname, search: (prev: Record<string, unknown>) => ({ ...prev, l }), replace: true } as never),
  subscribe: (onChange) => router.subscribe('onResolved', onChange),
})

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <RouterProvider router={router} />
    </RelayEnvironmentProvider>
  </StrictMode>,
)
