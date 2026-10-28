import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'goal',
  code: 'gl',
  label: '목표',
  color: hue.blue,
  kind: 'pick',
  options: [
    '잃어버린 가족 찾기', '최강이 되기', '평범하게 살기', '복수', '세계 구하기', '돈 많이 벌기',
    '진실 밝히기', '고향으로 돌아가기', '누군가를 지키기', '이름을 남기기', '자유', '약속 지키기',
    { label: '데뷔하기', when: { world: ['idol'] } },
    { label: '전설의 보물 찾기', when: { world: ['pirate', 'fantasy'] } },
    { label: '체제를 무너뜨리기', when: { world: ['dystopia', 'cyberpunk'] } },
    { label: '성불하기', when: { species: ['ghost'] } },
  ],
})
