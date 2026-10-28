import { hue } from '../palette'
import { defineAttribute } from '../schema'
import { speciesTable } from './species'

/** Species whose blood is something else entirely (below); everyone else bleeds red. */
const exotic = ['android', 'ghost', 'alien', 'dragonkin', 'vampire', 'angel', 'demon', 'mutant']
const red = { species: speciesTable.map((s) => s.id).filter((id) => !exotic.includes(id)) }

/** ABO × Rh, roughly at Korean rates; Rh− and the rare types show up just often enough to be a find. */
const abo = [
  { type: 'A', weight: 34, hint: '꼼꼼하고 신중하다는 그 혈액형' },
  { type: 'O', weight: 28, hint: '대범하고 사교적이라는 그 혈액형' },
  { type: 'B', weight: 27, hint: '자유분방하고 솔직하다는 그 혈액형' },
  { type: 'AB', weight: 11, hint: '엉뚱한 천재라는 그 혈액형' },
]

export default defineAttribute({
  id: 'bloodType',
  label: '혈액형',
  color: hue.red,
  description: 'ABO와 Rh, 드문 혈액형, 종족마다 다른 피까지',
  kind: 'pick',
  options: [
    ...abo.flatMap(({ type, weight, hint }) => [
      { id: `${type}+`, label: `${type}형 Rh+`, weight, hint, when: red },
      { id: `${type}-`, label: `${type}형 Rh−`, weight: weight * 0.03, hint: '수혈받기 어려운 Rh 음성', when: red },
    ]),
    { id: 'cisAB', label: 'cis-AB형', weight: 0.4, hint: 'A와 B가 한 염색체에 함께 실린 희귀형', when: red },
    { id: 'bombay', label: '봄베이형', weight: 0.2, hint: 'O형처럼 보이지만 O형 피도 받을 수 없다', when: red },
    { id: 'rhNull', label: 'Rh null', weight: 0.1, hint: '"황금 혈액" — 세상에 몇십 명뿐', when: red },
    { id: 'unknown', label: '모름', weight: 2, hint: '검사해 본 적이 없다', when: red },

    { id: 'coolant', label: '냉각액', hint: '푸른빛 합성 순환액', when: { species: ['android'] } },
    { id: 'none', label: '없음', hint: '피가 흐르지 않는다', when: { species: ['ghost'] } },
    { id: 'hemocyanin', label: '푸른 피', hint: '구리 기반 혈색소', when: { species: ['alien'] } },
    { id: 'silver', label: '은빛 체액', weight: 0.6, hint: '빛을 받으면 반짝인다', when: { species: ['alien'] } },
    { id: 'dragonBlood', label: '용혈', hint: '뜨겁고, 마시면 힘을 얻는다는 전설', when: { species: ['dragonkin'] } },
    { id: 'cold', label: '차가운 피', hint: '남의 피로 이어 가는 몸', when: { species: ['vampire'] } },
    { id: 'holy', label: '성혈', hint: '금빛으로 빛나는 피', when: { species: ['angel'] } },
    { id: 'black', label: '검은 피', hint: '땅에 떨어지면 연기가 오른다', when: { species: ['demon'] } },
    { id: 'mutated', label: '변이 혈액', hint: '형광빛, 검사 때마다 결과가 다르다', when: { species: ['mutant'] } },
    { id: 'mutatedO', label: 'O형 (변이 진행 중)', weight: 0.6, hint: '아직은 사람의 피', when: { species: ['mutant'] } },
  ],
})
