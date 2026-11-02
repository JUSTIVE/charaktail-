import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** Two signature pieces — what a 자캐 is drawn wearing every time. */
export default defineAttribute({
  id: 'accessory',
  code: 'ac',
  label: '액세서리',
  color: hue.blush,
  kind: 'pick',
  count: 2,
  options: [
    '은 목걸이', '가죽 팔찌', '반지', '귀걸이', '머리핀', '리본', '초커', '스카프',
    '손목시계', '브로치', '발찌', '헤어밴드', '이어커프', '장갑', '모자',
    { label: '사진이 든 로켓 펜던트', hint: '누구의 사진일까' },
    { label: '행운의 부적', weight: 0.7 },
    { label: '마력석 펜던트', when: { world: ['fantasy', 'darkFantasy', 'fairytale', 'academy'] } },
    { label: '가문의 인장 반지', when: { world: ['fantasy', 'darkFantasy', 'steampunk'] } },
    { label: '은 십자가', when: { world: ['darkFantasy', 'occult'] } },
    { label: '봉인 부적', when: { world: ['occult', 'wuxia'] } },
    { label: '옥 노리개', when: { world: ['wuxia'] } },
    { label: '비녀', when: { world: ['wuxia'] } },
    { label: '홀로그램 이어커프', when: { world: ['cyberpunk', 'spaceOpera'] } },
    { label: 'LED 마스크', when: { world: ['cyberpunk'] } },
    { label: '황동 고글', when: { world: ['steampunk', 'apocalypse'] } },
    { label: '회중시계', when: { world: ['steampunk', 'pirate', 'fairytale'] } },
    { label: '통신 배지', when: { world: ['spaceOpera'] } },
    { label: '금 귀고리', when: { world: ['pirate'] } },
    { label: '군번줄', when: { world: ['apocalypse', 'dystopia'] } },
    { label: '시민 등록 팔찌', when: { world: ['dystopia'] } },
    { label: '교표 배지', when: { world: ['academy'] } },
    { label: '무선 이어폰', when: { world: ['modern', 'academy', 'idol'] } },
    { label: '무대용 인이어', when: { world: ['idol'] } },
    { label: '꽃잎 화관', when: { species: ['fairy', 'elf'] } },
    { label: '진주 목걸이', when: { species: ['mermaid'] } },
    { label: '일련번호 각인 태그', when: { species: ['android', 'cyborg'] } },
  ],
})
