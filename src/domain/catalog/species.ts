import { hue } from '../palette'
import { defineAttribute } from '../schema'

const magical = ['fantasy', 'darkFantasy']

export default defineAttribute({
  id: 'species',
  label: '종족',
  color: hue.grass,
  description: '세계관에 따라 등장하는 종족이 달라진다',
  defaultSelected: true,
  kind: 'pick',
  options: [
    { id: 'human', label: '인간', weight: 3 },
    { id: 'elf', label: '엘프', when: { world: [...magical, 'academy'] } },
    { id: 'dwarf', label: '드워프', when: { world: [...magical, 'steampunk'] } },
    { id: 'beastkin', label: '수인', when: { world: [...magical, 'academy', 'apocalypse'] } },
    { id: 'dragonkin', label: '용인', weight: 0.6, when: { world: [...magical, 'wuxia'] } },
    { id: 'vampire', label: '흡혈귀', weight: 0.7, when: { world: ['darkFantasy', 'modern', 'academy'] } },
    { id: 'android', label: '안드로이드', when: { world: ['cyberpunk', 'spaceOpera', 'steampunk'] } },
    { id: 'cyborg', label: '사이보그', when: { world: ['cyberpunk', 'apocalypse', 'spaceOpera'] } },
    { id: 'alien', label: '외계인', when: { world: ['spaceOpera'] } },
    { id: 'mutant', label: '변이체', when: { world: ['apocalypse'] } },
    { id: 'yokai', label: '요괴', when: { world: ['wuxia', 'modern'] } },
    { id: 'immortal', label: '신선', weight: 0.5, when: { world: ['wuxia'] } },
  ],
})
