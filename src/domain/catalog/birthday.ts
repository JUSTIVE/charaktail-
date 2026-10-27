import { hue } from '../palette'
import { defineAttribute } from '../schema'

export default defineAttribute({
  id: 'birthday',
  label: '생일',
  color: hue.green,
  description: '별자리도 함께',
  kind: 'date',
  zodiac: true,
})
