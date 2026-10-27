import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'hairColor',
  label: '머리 색',
  color: hue.tomato,
  kind: 'color',
  options: [
    { label: '흑발', hex: '#1b1a1f', weight: 3 },
    { label: '갈색', hex: '#5a3a24', weight: 2 },
    { label: '금발', hex: '#e2c06b' },
    { label: '적발', hex: '#a8432a' },
    { label: '은발', hex: '#d6d9df' },
    { label: '백발', hex: '#f4f1ea', weight: 0.6 },
    { label: '청록', hex: '#2ab3a6', weight: 0.6, when: { world: ['cyberpunk', 'fantasy', 'academy', 'spaceOpera'] } },
    { label: '네온 핑크', hex: '#ff4fb8', weight: 0.6, when: { world: ['cyberpunk', 'spaceOpera', 'academy'] } },
    { label: '투톤', hex: ['#1b1a1f', '#e2c06b'], weight: 0.5 },
    { label: '잿빛', hex: '#8d8f96', weight: 0.7 },
    { label: '라벤더', hex: '#b9a6e8', weight: 0.5 },
    { label: '민트', hex: '#9fe3cf', weight: 0.5, when: { world: ['cyberpunk', 'idol', 'fairytale', 'academy'] } },
    { label: '파스텔 그라데이션', hex: ['#f7b2d0', '#a8d8f0'], weight: 0.4, when: { world: ['idol', 'fairytale', 'academy'] } },
    { label: '청흑발', hex: '#1d2a44', weight: 0.8 },
  ],
})
