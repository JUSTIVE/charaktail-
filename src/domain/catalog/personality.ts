import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** 문자열 하나가 곧 값 하나 — 키워드는 그냥 추가하면 된다. */
export default defineAttribute({
  id: 'personality',
  label: '성격',
  color: hue.plum,
  description: '키워드 두 개를 뽑는다',
  kind: 'pick',
  count: 2,
  options: [
    '다정함', '냉소적', '호기심 많음', '고집스러움', '느긋함', '완벽주의',
    '충동적', '수줍음', '허세', '책임감 강함', '장난기 많음', '의심 많음',
    '낙천적', '무뚝뚝함', '눈치 빠름', '정의감', '게으름', '집요함',
  ],
})
