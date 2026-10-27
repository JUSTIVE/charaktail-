import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'likes',
  label: '좋아하는 것',
  color: hue.sky,
  description: '두 가지를 뽑는다',
  kind: 'pick',
  count: 2,
  options: [
    '단 것', '비 오는 날', '고양이', '강아지', '낡은 책', '별 보기', '따뜻한 차', '음악',
    '칭찬', '조용한 곳', '맛집 탐방', '수집', '낮잠', '바다', '꽃', '운동',
    '게임', '귀여운 것', '매운 음식', '새벽 공기', '반짝이는 것', '오래된 사진',
  ],
})
