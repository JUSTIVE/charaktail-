# charaktail

캐릭터 설정 뽑기 PWA. 속성을 고르고 → 기기를 세게 흔들면 → 속성 이름이 새겨진 메타볼들이
글자를 잃고 섞이다가 빛나고, 진동과 함께 → 각 속성의 값이 랜덤으로 정해진다.

- **TanStack Router**: URL이 흐름을 맡는다. 결과 URL(`/result?k=…`) 하나가 캐릭터 전체를 재현한다.
- **Relay resolvers**: 서버 없음. 모든 필드는 카탈로그와 로컬 상태(cell) 위의 클라이언트 리졸버다.
- **three.js**: 풀스크린 메타볼 셰이더 + 2D 물리 + 기기 기울기·흔들기.
- **morphing-sheet**: `vendor/morphing-sheet`에 벤더링. 하단 `panel` 리전 하나가 단계마다 모프한다.

```bash
bun install
bun run dev        # http://localhost:5181 (--host: 같은 와이파이의 폰으로 접속 가능)
bun run build      # relay-compiler → tsc → vite build (+ service worker)
bun run test       # 도메인 테스트
```

> 모션 센서(DeviceMotion)는 **보안 컨텍스트(HTTPS 또는 localhost)**에서만 동작한다. 폰에서 시험하려면
> HTTPS 터널(예: `cloudflared tunnel --url http://localhost:5181`)을 쓰자. 센서가 없으면
> "누르고 있으면 흔들려요" 버튼이나 공을 세게 던지는 것으로도 게이지가 찬다.

## 구조

```
src/domain/           순수 도메인 — React·Relay 비의존
  schema.ts           zod 스키마: Attribute(kind별 판별 유니온) · Option · Condition · RolledValue
  catalog.ts          defineCatalog: 파싱 + 교차 검증(없는 값 참조, 중복, 순환) + 롤 순서 위상 정렬
  generators.ts       kind → 생성기 매핑 (매핑 타입이라 kind를 추가하면 여기서 컴파일이 깨진다)
  roll.ts             rollCharacter · explainRoll · 롤 키 인코딩
  rng.ts              시드 RNG (seed, 속성, nonce) → 독립 스트림
  catalog/*.ts        속성 하나 = 파일 하나
src/graph/            Relay 리졸버 (Attribute, Roll, RollEntry, SavedEntry, Query)
src/state/            Cell — 선택·보관함 (localStorage 영속)
src/stage/            Stage(three.js) · physics · shader · motion · haptics
src/app/              Shell(시트 리전) · StageCanvas · views
```

## 확장하기

### 값 추가 — 배열에 한 줄

```ts
// src/domain/catalog/personality.ts
options: ['다정함', '냉소적', /* … */, '새 키워드'],
```

문자열 하나가 `{ id, label, weight: 1 }`로 펼쳐진다. 가중치·설명·조건이 필요하면 객체로 쓴다:

```ts
{ label: '황금', hex: '#e8b923', weight: 0.5, hint: '빛을 받으면 동공이 가늘어진다',
  when: { species: ['dragonkin', 'beastkin'] } }
```

`when`은 `속성 id → 허용 값 id[]`. 속성끼리는 AND, 값끼리는 OR. 그 속성을 이번에 뽑지 않았다면 제약이 없다.
조건이 가리키는 속성은 자동으로 먼저 뽑힌다(위상 정렬). 조건에 오타가 있으면 앱 시작 시 바로 에러가 난다.

### 속성 추가 — 파일 하나 + 목록에 한 줄

```ts
// src/domain/catalog/zodiac.ts
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'zodiac',
  label: '별자리',
  color: '#facc15',          // 메타볼 색
  kind: 'pick',
  options: ['양자리', '황소자리', '쌍둥이자리'],
})
```

그리고 `src/domain/catalog/index.ts`의 `defineCatalog([...])`에 추가. UI·리졸버·셰이더는 손댈 필요가 없다.

내장 kind:

| kind | 쓰임 | 주요 필드 |
| --- | --- | --- |
| `pick` | 목록에서 고르기 | `options`, `count`(여러 개 뽑기) |
| `color` | 색 이름 + 스와치 | `options[].hex` (배열이면 오드아이처럼 여러 색) |
| `range` | 수치 | `min` `max` `step` `unit` `distribution` `bands` `cases`(조건별 범위 덮어쓰기) |

### kind 추가

1. `schema.ts`의 `Attribute` 판별 유니온에 새 변형을 추가
2. `generators.ts`의 `generators`에 생성기를 추가 — 빠뜨리면 타입 에러
3. 필요하면 `graph/attribute.ts`의 `summary`에 한 줄 (`switch`가 exhaustive라 역시 타입이 알려준다)

## 메모

- 시드는 (seed, 속성 id, nonce)로 스트림을 나눈다. 결과 화면에서 한 속성만 다시 뽑으면 그 nonce만 오르고
  나머지는 그대로다. 단, 그 속성에 의존하는 속성(예: 세계관 → 종족)은 조건이 바뀌니 값이 달라질 수 있다.
- Relay 리졸버에서 모델 타입으로 가는 엣지는 반드시 `{ id }`를 반환한다. 생성 아티팩트가 `@ts-nocheck`라
  tsc가 잡지 못하고, 맨 id를 돌려주면 런타임에 null이 된다.
- iOS Safari는 `navigator.vibrate`가 없어서 `<input type=checkbox switch>` 토글 햅틱으로 대신한다
  (iOS 17.4+, 사용자 제스처 밖에서는 울리지 않을 수 있다).
