import type { DataID } from 'relay-runtime'

import { catalog } from '../domain/catalog/index'
import type { AttributeKind } from '../domain/schema'

/** Each kind's GraphQL type — the members of `union Attribute`. */
const TYPENAME = {
  pick: 'PickAttribute',
  color: 'ColorAttribute',
  range: 'RangeAttribute',
  date: 'DateAttribute',
  stats: 'StatsAttribute',
  traits: 'TraitsAttribute',
  compose: 'ComposeAttribute',
} as const satisfies Record<AttributeKind, string>

/**
 * An edge into the union names its member: Relay resolves an abstract type
 * by the `__typename` it is handed, then reads the model by `id`.
 */
export function attributeRef(id: DataID): { id: DataID; __typename: (typeof TYPENAME)[AttributeKind] } | null {
  const attribute = catalog.byId.get(id)
  return attribute ? { id, __typename: TYPENAME[attribute.kind] } : null
}
