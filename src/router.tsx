import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

import { Shell } from './app/Shell'

/**
 * URL가 흐름을, Relay가 데이터를, 패널 시트가 표현을 맡는다.
 *
 *   /                 속성 고르기
 *   /shake?a=…&n=이름  흔들기 — 뽑을 속성과 이름이 URL에 실린다
 *   /result?k=<key>   결과 — 롤 키 하나가 캐릭터 전체를 재현한다 (공유 가능)
 *   /saved            보관함
 */
const rootRoute = createRootRoute({ component: Shell })

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/' })

const shakeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shake',
  validateSearch: (search: Record<string, unknown>): { a?: string; n?: string } => ({
    a: typeof search.a === 'string' && search.a !== '' ? search.a : undefined,
    n: typeof search.n === 'string' && search.n !== '' ? search.n : undefined,
  }),
})

const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/result',
  validateSearch: (search: Record<string, unknown>): { k: string } => ({
    k: typeof search.k === 'string' ? search.k : '',
  }),
})

const savedRoute = createRoute({ getParentRoute: () => rootRoute, path: '/saved' })

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, shakeRoute, resultRoute, savedRoute]),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
