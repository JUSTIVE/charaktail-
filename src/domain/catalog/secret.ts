import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'secret',
  code: 'sk',
  label: '비밀',
  color: hue.bronze,
  description: '아무에게도 말하지 않은 것',
  kind: 'pick',
  options: [
    { label: '사실 왕족의 숨겨진 후계자', weight: 0.5 },
    '기억의 일부가 지워져 있다',
    '쫓기고 있다',
    '쌍둥이가 있다',
    '고양이를 무서워한다',
    '한 번 죽었다 살아났다',
    '적과 편지를 주고받는다',
    '자신이 만들어진 존재라는 걸 모른다',
    '사실 겁이 엄청 많다',
    '몰래 쓰는 소설이 있다',
    '전생의 기억이 있다',
    '다른 이름으로 살고 있다',
    '누군가와 계약을 맺었다',
    '편식이 심하다',
    '같은 하루를 반복하고 있다',
    { label: '이미 죽었다는 걸 모른다', when: { species: ['ghost'] } },
  ],
})
