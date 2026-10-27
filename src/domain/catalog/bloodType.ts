import { hue } from '../palette'
import { defineAttribute } from '../schema'

/** Weights follow the usual Korean distribution: A·O·B common, AB rare. */
export default defineAttribute({
  id: 'bloodType',
  label: '혈액형',
  color: hue.red,
  kind: 'pick',
  options: [
    { label: 'A형', weight: 34 },
    { label: 'O형', weight: 28 },
    { label: 'B형', weight: 27 },
    { label: 'AB형', weight: 11 },
  ],
})
