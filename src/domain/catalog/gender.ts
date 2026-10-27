import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'gender',
  label: '성별',
  color: '#ff5fa2',
  defaultSelected: true,
  kind: 'pick',
  options: [
    { label: '여성', weight: 4 },
    { label: '남성', weight: 4 },
    '논바이너리',
    { label: '알 수 없음', hint: '본인도 굳이 말하지 않는다', weight: 0.5 },
  ],
})
