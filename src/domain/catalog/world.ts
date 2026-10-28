import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** 세계관은 다른 속성들의 조건이 가장 많이 가리키는 뿌리다 — id를 바꾸면 조건도 함께 바꿀 것. */
export default defineAttribute({
  id: 'world',
  code: 'wd',
  label: '세계관',
  color: hue.violet,
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
    { id: 'occult', label: '오컬트 미스터리', hint: '도시 괴담과 봉인된 저택', weight: 0.8 },
    { id: 'fairytale', label: '동화', hint: '말하는 동물과 마법의 숲', weight: 0.7 },
    { id: 'pirate', label: '대항해 해적', hint: '보물 지도와 폭풍의 바다', weight: 0.7 },
    { id: 'dystopia', label: '디스토피아', hint: '감시받는 회색 도시', weight: 0.7 },
    { id: 'idol', label: '아이돌 업계', hint: '무대 뒤의 화려한 경쟁', weight: 0.6 },
  ],
})
