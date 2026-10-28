import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'hobby',
  code: 'hy',
  label: '취미',
  color: hue.jade,
  kind: 'pick',
  options: [
    '독서', '요리', '그림', '산책', '악기 연주', '일기 쓰기', '정원 가꾸기', '낚시',
    '사진', '춤', '게임', '뜨개질', '별자리 관찰', '기계 만지기', '빵 굽기', '노래방',
    { label: '검술 수련', when: { world: ['fantasy', 'darkFantasy', 'wuxia', 'pirate'] } },
    { label: '개조 파츠 수집', when: { world: ['cyberpunk', 'steampunk', 'apocalypse'] } },
    { label: '괴담 수집', when: { world: ['occult', 'academy', 'modern'] } },
    { label: '안무 연습', when: { world: ['idol'] } },
  ],
})
