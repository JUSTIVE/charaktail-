import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** 문자열 하나가 곧 값 하나 — 키워드는 그냥 추가하면 된다. */
export default defineAttribute({
  id: 'personality',
  code: 'ps',
  label: '성격',
  color: hue.plum,
  description: '키워드 하나를 뽑는다 — 이중인격이면 인격마다 하나씩',
  kind: 'pick',
  // 천 명에 한 명꼴로 인격이 둘.
  split: { chance: 0.001, label: '이중인격' },
  options: [
    '다정함', '냉소적', '호기심 많음', '고집스러움', '느긋함', '완벽주의',
    '충동적', '수줍음', '허세', '책임감 강함', '장난기 많음', '의심 많음',
    '낙천적', '무뚝뚝함', '눈치 빠름', '정의감', '게으름', '집요함',
    '겁이 많음', '오지랖', '자존심 강함', '덤덤함', '감성적', '현실적',
    '경쟁심', '순진함', '능글맞음', '예민함', '사교적', '내성적',
    '츤데레', '허당', '침착함', '다혈질', '배려심', '독설가',
  ],
})
