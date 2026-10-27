import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'mbti',
  label: 'MBTI',
  color: hue.iris,
  kind: 'pick',
  options: [
    { label: 'INTJ', hint: '전략가' },
    { label: 'INTP', hint: '논리적인 사색가' },
    { label: 'ENTJ', hint: '대담한 통솔자' },
    { label: 'ENTP', hint: '논쟁을 즐기는 변론가' },
    { label: 'INFJ', hint: '선의의 옹호자' },
    { label: 'INFP', hint: '열정적인 중재자' },
    { label: 'ENFJ', hint: '정의로운 리더' },
    { label: 'ENFP', hint: '재기발랄한 활동가' },
    { label: 'ISTJ', hint: '청렴한 원칙주의자' },
    { label: 'ISFJ', hint: '용감한 수호자' },
    { label: 'ESTJ', hint: '엄격한 관리자' },
    { label: 'ESFJ', hint: '사교적인 외교관' },
    { label: 'ISTP', hint: '만능 재주꾼' },
    { label: 'ISFP', hint: '호기심 많은 예술가' },
    { label: 'ESTP', hint: '모험을 즐기는 사업가' },
    { label: 'ESFP', hint: '자유로운 영혼의 연예인' },
  ],
})
