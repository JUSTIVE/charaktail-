import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'ability',
  label: '특기',
  color: hue.lime,
  kind: 'pick',
  options: [
    '요리',
    '절대음감',
    '거짓말 간파',
    { label: '어둠 속에서도 보는 눈', when: { species: ['vampire', 'beastkin', 'yokai', 'dwarf'] } },
    { label: '원소 마법', when: { world: ['fantasy', 'academy'] } },
    { label: '피의 계약', when: { world: ['darkFantasy'] } },
    { label: '신경 직결 해킹', when: { world: ['cyberpunk'] } },
    { label: '기계 수리', when: { world: ['steampunk', 'apocalypse', 'spaceOpera'] } },
    { label: '경공', when: { world: ['wuxia'] } },
    { label: '파일럿', when: { world: ['spaceOpera'] } },
    { label: '사격', when: { world: ['modern', 'apocalypse', 'cyberpunk', 'spaceOpera'] } },
  ],
})
