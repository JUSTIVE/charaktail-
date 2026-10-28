import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'speech',
  code: 'sc',
  label: '말투',
  color: hue.mint,
  kind: 'pick',
  // Each value carries a line said in it — shown under the value.
  options: [
    { label: '반말', weight: 2, hint: '"야, 밥 먹었어? 같이 가자."' },
    { label: '존댓말', weight: 2, hint: '"식사는 하셨어요? 같이 가실래요?"' },
    { label: '퉁명스러운 단답', hint: '"어." "몰라." "됐어."' },
    { label: '느릿한 말투', hint: '"음… 그러니까아… 내 생각엔 말이지…"' },
    { label: '빠른 말투', hint: '"아 잠깐잠깐 내 말 좀 들어봐 그게 아니라니까?"' },
    { label: '사투리', hint: '"니 밥은 묵었나? 퍼뜩 온나."' },
    { label: '비꼬는 말투', hint: '"와, 진짜 대단하시네. 박수라도 쳐 드려?"' },
    { label: '다정한 말투', hint: '"괜찮아, 천천히 해도 돼. 내가 기다릴게."' },
    { label: '중2병 말투', weight: 0.6, hint: '"크큭… 봉인된 오른팔이 욱신거리는군."' },
    { label: '사극체', hint: '"그대는 어디서 온 뉘시오?"', when: { world: ['wuxia', 'fantasy', 'darkFantasy'] } },
    { label: '귀족적인 말투', hint: '"어머, 차가 식었잖아요. 다시 내오도록 하세요."', when: { world: ['fantasy', 'darkFantasy', 'steampunk', 'fairytale'] } },
    { label: '기계적인 말투', hint: '"요청을 확인했습니다. 처리를 시작합니다."', when: { species: ['android', 'cyborg'] } },
    { label: '말끝에 "~냥"', weight: 0.4, hint: '"오늘은 햇볕이 따뜻하다냥."', when: { species: ['beastkin'] } },
  ],
})
