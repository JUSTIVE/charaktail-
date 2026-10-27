import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'secret',
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
  ],
})
