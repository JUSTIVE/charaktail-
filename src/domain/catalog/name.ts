import { defineAttribute } from '../schema'

const west = ['fantasy', 'darkFantasy', 'steampunk']

export default defineAttribute({
  id: 'name',
  label: '이름',
  color: '#e879f9',
  kind: 'pick',
  options: [
    ...['아리엔', '카엘', '세라핀', '오린', '리아나', '테오도르', '일레스'].map((label) => ({ label, when: { world: west } })),
    ...['렌', '노바', '제로', '키라', '빅스', '사이퍼'].map((label) => ({ label, when: { world: ['cyberpunk', 'spaceOpera', 'apocalypse'] } })),
    ...['서윤', '도현', '하린', '지호', '유나', '태오'].map((label) => ({ label, when: { world: ['modern', 'academy'] } })),
    ...['백련', '청운', '설화', '무진', '연소'].map((label) => ({ label, when: { world: ['wuxia'] } })),
  ],
})
