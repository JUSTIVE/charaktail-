import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

import { Shell } from './app/Shell'

/**
 * URL가 흐름을, Relay가 데이터를, 패널 시트가 표현을 맡는다.
 *
 *   /                 속성 고르기 (?values=world → 그 속성의 값 목록으로 패널이 모프,
 *                     &group=fantasy → 묶음 하나의 값들(세계관별 직업), &add=true → 값 추가 화면,
 *                     &edit=<값 id> → 그 값 편집 화면)
 *   /shake?a=…&n=이름  흔들기 — 뽑을 속성과 이름이 URL에 실린다
 *   /result?k=<key>   결과 — 롤 키 하나가 캐릭터 전체를 재현한다 (공유 가능)
 *   /saved            보관함 (?f=<폴더 id> → 그 폴더만)
 */
/*
 * A link may open any screen with locks (`?l=`, packed like a roll key's
 * locked segment) — every route accepts it from the root. It is read once on
 * entry (state/locks.ts); locking and unlocking after that leave it alone.
 */
const rootRoute = createRootRoute({
  component: Shell,
  validateSearch: (search: Record<string, unknown>): { l?: string | undefined } => ({
    l: typeof search['l'] === 'string' && search['l'] !== '' ? search['l'] : undefined,
  }),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (
    search: Record<string, unknown>,
  ): { values?: string | undefined; group?: string | undefined; add?: boolean | undefined; edit?: string | undefined } => ({
    values: typeof search['values'] === 'string' && search['values'] !== '' ? search['values'] : undefined,
    group: typeof search['group'] === 'string' && search['group'] !== '' ? search['group'] : undefined,
    add: search['add'] === true || search['add'] === 'true' ? true : undefined,
    edit: typeof search['edit'] === 'string' && search['edit'] !== '' ? search['edit'] : undefined,
  }),
})

const shakeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shake',
  validateSearch: (search: Record<string, unknown>): { a?: string | undefined; n?: string | undefined } => ({
    a: typeof search['a'] === 'string' && search['a'] !== '' ? search['a'] : undefined,
    n: typeof search['n'] === 'string' && search['n'] !== '' ? search['n'] : undefined,
  }),
})

const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/result',
  validateSearch: (search: Record<string, unknown>): { k: string } => ({
    k: typeof search['k'] === 'string' ? search['k'] : '',
  }),
})

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/saved',
  validateSearch: (search: Record<string, unknown>): { f?: string | undefined } => ({
    f: typeof search['f'] === 'string' && search['f'] !== '' ? search['f'] : undefined,
  }),
})

export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, shakeRoute, resultRoute, savedRoute]),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
