import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'dislikes',
  label: '싫어하는 것',
  color: hue.ruby,
  kind: 'pick',
  options: [
    '벌레', '큰 소리', '거짓말', '쓴 커피', '기다리기', '사람 많은 곳', '높은 곳', '아침',
    '당근', '무시당하기', '어둠', '지루함', '규칙', '천둥', '오이', '병원',
    '약속 어기는 사람', '추위', '더위', '시끄러운 음악',
  ],
})
