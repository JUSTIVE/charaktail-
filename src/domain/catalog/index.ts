import { defineCatalog } from '../catalog'

import ability from './ability'
import age from './age'
import eyeColor from './eyeColor'
import gender from './gender'
import hairColor from './hairColor'
import height from './height'
import name from './name'
import occupation from './occupation'
import personality from './personality'
import secret from './secret'
import species from './species'
import world from './world'

/**
 * The catalogue. Order here is display order; roll order is derived from the
 * conditions. To add an attribute, write a file next to this one and list it.
 */
export const catalog = defineCatalog([
  world,
  species,
  name,
  gender,
  age,
  height,
  eyeColor,
  hairColor,
  personality,
  occupation,
  ability,
  secret,
])
