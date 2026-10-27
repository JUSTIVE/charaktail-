import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'stats',
  label: '능력치',
  color: hue.lavender,
  description: '여러 수치를 한 번에',
  kind: 'stats',
  max: 10,
  stats: [
    { id: 'str', label: '힘' },
    { id: 'int', label: '지능' },
    { id: 'dex', label: '민첩' },
    { id: 'cha', label: '매력' },
    { id: 'luck', label: '운' },
  ],
})
