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

installOverlayScrollbars()
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh: markUpdateReady,
  onOfflineReady: markOfflineReady,
})
setUpdater(() => updateSW(true))
// Dev only: lets a test harness show the update prompt without a new build.
if (import.meta.env.DEV) Object.assign(window, { __pwa: { markUpdateReady, markOfflineReady } })

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <RouterProvider router={router} />
    </RelayEnvironmentProvider>
  </StrictMode>,
)
