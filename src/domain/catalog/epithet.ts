import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** 이명 — a phrase built one part at a time. */
export default defineAttribute({
  id: 'epithet',
  label: '이명',
  color: hue.periwinkle,
  description: '두 마디를 조합',
  kind: 'compose',
  parts: [
    [
      '은빛의', '붉은', '잿빛', '고요한', '떠도는', '잠들지 않는', '이름 없는', '마지막',
      '웃는', '눈물 많은', '황혼의', '새벽의', '얼어붙은', '불타는', '작은',
    ],
    [
      '방랑자', '마녀', '기사', '여우', '그림자', '노래꾼', '사냥꾼', '수호자',
      '도둑', '별', '늑대', '인형', '왕', '꽃', '유령',
    ],
  ],
})
