import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'speech',
  label: '말투',
  color: hue.mint,
  kind: 'pick',
  options: [
    { label: '반말', weight: 2 },
    { label: '존댓말', weight: 2 },
    '퉁명스러운 단답',
    '느릿한 말투',
    '빠른 말투',
    '사투리',
    '비꼬는 말투',
    '다정한 말투',
    { label: '중2병 말투', weight: 0.6 },
    { label: '사극체', when: { world: ['wuxia', 'fantasy', 'darkFantasy'] } },
    { label: '귀족적인 말투', when: { world: ['fantasy', 'darkFantasy', 'steampunk', 'fairytale'] } },
    { label: '기계적인 말투', when: { species: ['android', 'cyborg'] } },
    { label: '말끝에 "~냥"', weight: 0.4, when: { species: ['beastkin'] } },
  ],
})
