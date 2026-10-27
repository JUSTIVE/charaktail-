import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'occupation',
  label: '직업',
  color: hue.teal,
  kind: 'pick',
  options: [
    { label: '떠돌이 용병' },
    { label: '견습 마법사', when: { world: ['fantasy', 'darkFantasy', 'academy'] } },
    { label: '성기사', when: { world: ['fantasy'] } },
    { label: '마녀 사냥꾼', when: { world: ['darkFantasy'] } },
    { label: '해커', when: { world: ['cyberpunk', 'modern', 'spaceOpera'] } },
    { label: '기업 보안요원', when: { world: ['cyberpunk'] } },
    { label: '비행선 기관사', when: { world: ['steampunk'] } },
    { label: '발명가', when: { world: ['steampunk', 'modern'] } },
    { label: '편의점 야간 알바', when: { world: ['modern'] } },
    { label: '고물 수집가', when: { world: ['apocalypse'] } },
    { label: '정착지 의사', when: { world: ['apocalypse'] } },
    { label: '밀수선 선장', when: { world: ['spaceOpera'] } },
    { label: '제국 외교관', when: { world: ['spaceOpera'] } },
    { label: '표국 표사', when: { world: ['wuxia'] } },
    { label: '파문당한 제자', when: { world: ['wuxia'] } },
    { label: '학생회장', when: { world: ['academy'] } },
    { label: '전학생', when: { world: ['academy'] } },
    { label: '탐정', when: { world: ['modern', 'steampunk', 'cyberpunk'] } },
  ],
})
