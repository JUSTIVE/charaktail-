import { defineCatalog } from '../catalog'

import ability from './ability'
import age from './age'
import birthday from './birthday'
import bloodType from './bloodType'
import bodyType from './bodyType'
import dislikes from './dislikes'
import epithet from './epithet'
import eyeColor from './eyeColor'
import firstPerson from './firstPerson'
import gender from './gender'
import goal from './goal'
import habit from './habit'
import hairColor from './hairColor'
import hairStyle from './hairStyle'
import height from './height'
import hobby from './hobby'
import likes from './likes'
import mbti from './mbti'
import occupation from './occupation'
import personality from './personality'
import secret from './secret'
import species from './species'
import speech from './speech'
import stats from './stats'
import themeColor from './themeColor'
import traits from './traits'
import weakness from './weakness'
import world from './world'

/**
 * The catalogue. Order here is display order — grouped the way a 자캐
 * profile sheet reads: basics, looks, inner life, story. Roll order is
 * derived from the conditions. To add an attribute, write a file next to
 * this one and list it.
 */
export const catalog = defineCatalog([
  // 기본
  world,
  species,
  gender,
  age,
  birthday,
  height,
  bodyType,
  bloodType,
  mbti,
  // 외형
  eyeColor,
  hairColor,
  hairStyle,
  traits,
  themeColor,
  // 내면
  personality,
  speech,
  firstPerson,
  habit,
  likes,
  dislikes,
  hobby,
  // 이야기
  epithet,
  occupation,
  stats,
  ability,
  goal,
  weakness,
  secret,
])
