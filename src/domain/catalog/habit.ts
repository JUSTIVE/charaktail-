import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'habit',
  code: 'hb',
  label: '버릇',
  color: hue.orange,
  kind: 'pick',
  options: [
    '머리카락을 만지작거림', '손톱을 깨묾', '혼잣말', '콧노래', '다리를 떪', '말끝을 흐림',
    '한숨', '안경을 고쳐 씀', '입술을 깨묾', '펜 돌리기', '뭐든 메모함', '시계를 자주 봄',
    '고개를 갸웃함', '손가락으로 박자를 탐', '눈을 피함', '웃을 때 입을 가림',
  ],
})
