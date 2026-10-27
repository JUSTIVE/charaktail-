import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** 자캐 프로필 단골 항목: 자기를 부르는 말. */
export default defineAttribute({
  id: 'firstPerson',
  label: '1인칭',
  color: hue.purple,
  kind: 'pick',
  options: [
    { label: '나', weight: 3 },
    { label: '저', weight: 2.5 },
    '본인',
    '우리',
    { label: '이 몸', weight: 0.6 },
    { label: '자기 이름으로', weight: 0.6, hint: '3인칭으로 자기를 부른다' },
    { label: '소인', when: { world: ['wuxia'] } },
    { label: '짐', weight: 0.3, hint: '왕족만 쓰는 말', when: { world: ['fantasy', 'darkFantasy', 'wuxia', 'fairytale'] } },
  ],
})
