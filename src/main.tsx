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

installOverlayScrollbars()
registerSW({ immediate: true })

const container = document.getElementById('root')
if (!container) throw new Error('#root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <RouterProvider router={router} />
    </RelayEnvironmentProvider>
  </StrictMode>,
)
