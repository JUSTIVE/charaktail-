import { defineAttribute } from '../schema'

/** 세계관은 다른 속성들의 조건이 가장 많이 가리키는 뿌리다 — id를 바꾸면 조건도 함께 바꿀 것. */
export default defineAttribute({
  id: 'world',
  label: '세계관',
  color: '#7c5cff',
  description: '캐릭터가 사는 세상',
  defaultSelected: true,
  kind: 'pick',
  options: [
    { id: 'fantasy', label: '하이 판타지', hint: '마법과 왕국, 오래된 숲' },
    { id: 'darkFantasy', label: '다크 판타지', hint: '저주받은 땅, 끝나지 않는 밤' },
    { id: 'cyberpunk', label: '사이버펑크', hint: '네온 아래의 메가코프 도시' },
    { id: 'steampunk', label: '스팀펑크', hint: '증기와 톱니, 비행선의 하늘' },
    { id: 'modern', label: '현대 도시', hint: '지하철과 편의점이 있는 오늘' },
    { id: 'apocalypse', label: '포스트 아포칼립스', hint: '무너진 문명의 잔해 위' },
    { id: 'spaceOpera', label: '스페이스 오페라', hint: '은하 제국과 성간 항로' },
    { id: 'wuxia', label: '동양 무협', hint: '강호와 문파, 내공의 세계' },
    { id: 'academy', label: '학원물', hint: '비밀이 많은 기숙 학교', weight: 0.8 },
  ],
})
