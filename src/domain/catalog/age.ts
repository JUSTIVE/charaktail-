import { ageCase } from '../lifespan'
import { hue } from '../palette'
import { defineAttribute } from '../schema'
import { speciesTable } from './species'

const humanBands = [
  { upTo: 13, label: '어린이' },
  { upTo: 19, label: '청소년' },
  { upTo: 34, label: '청년' },
  { upTo: 54, label: '중년' },
  { upTo: 999, label: '노년' },
]

/** How a species reads at each age, as fractions of its lifespan; others get the human stages. */
const stages: Record<string, readonly (readonly [number, string])[]> = {
  elf: [[0.12, '어린 엘프'], [0.6, '성숙한 엘프'], [1, '고대 엘프']],
  dwarf: [[0.15, '수염도 안 난'], [0.6, '한창인 드워프'], [1, '원로 드워프']],
  dragonkin: [[0.1, '갓 깨어난'], [0.5, '성룡'], [1, '고룡']],
  vampire: [[0.05, '갓 태어난 흡혈귀'], [0.3, '밤의 귀족'], [1, '시조에 가까운']],
  yokai: [[0.1, '어린 요괴'], [0.5, '이름난 요괴'], [1, '천년 묵은']],
  immortal: [[0.05, '갓 득도한'], [0.4, '선인'], [1, '대선인']],
  angel: [[0.05, '어린 천사'], [0.4, '천사'], [1, '대천사']],
  demon: [[0.05, '하급 악마'], [0.4, '상급 악마'], [1, '마왕급']],
  fairy: [[0.15, '갓 피어난'], [1, '숲의 어른']],
  mermaid: [[0.15, '어린 인어'], [0.7, '바다의 숙녀'], [1, '심해의 노인']],
}

const human = speciesTable.find((s) => s.id === 'human')!.lifespan

export default defineAttribute({
  id: 'age',
  code: 'ag',
  label: '나이',
  color: hue.amber,
  defaultSelected: true,
  kind: 'range',
  min: 12,
  max: Math.round(human.max * 0.8),
  unit: '세',
  distribution: 'normal',
  bands: humanBands,
  cases: [
    { when: { world: ['academy'], species: ['human', 'beastkin'] }, min: 15, max: 19 },
    // Counted differently from a life: age at death, years since assembly.
    { when: { species: ['ghost'] }, min: 9, max: 80, prefix: '사망 당시', bands: [{ upTo: 19, label: '어린 유령' }, { upTo: 999, label: '오래 떠돈' }] },
    { when: { species: ['android'] }, min: 1, max: 40, prefix: '제조 후', unit: '년', bands: [{ upTo: 3, label: '신형' }, { upTo: 15, label: '현역' }, { upTo: 99, label: '구형' }] },
    ...speciesTable.filter((s) => s.id !== 'human' && s.id !== 'ghost' && s.id !== 'android').map((s) => ageCase(s.id, s.lifespan, stages[s.id])),
  ],
})
