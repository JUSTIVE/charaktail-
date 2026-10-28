import { graphql, readInlineData } from 'relay-runtime'

import type { attributeHead_attribute$key } from '../__generated__/attributeHead_attribute.graphql'

/*
 * `Attribute` is a union of kinds; what they all have is the AttributeBase
 * interface. Views spread this fragment and read it through `attributeHead`.
 */
const fragment = graphql`
  fragment attributeHead_attribute on Attribute @inline {
    __typename
    ... on AttributeBase {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
  }
`

/** The union's members — what `__typename` can be. */
const KINDS = ['PickAttribute', 'ColorAttribute', 'RangeAttribute', 'DateAttribute', 'StatsAttribute', 'TraitsAttribute', 'ComposeAttribute'] as const
export type AttributeKindName = (typeof KINDS)[number]
const isKind = (name: string): name is AttributeKindName => (KINDS as readonly string[]).includes(name)

export interface AttributeHead {
  kind: AttributeKindName
  key: string
  label: string
  color: string
  summary: string
  edited: boolean
  selected: boolean
  locked: boolean
}

/** The fields every kind has, or null for a member this build doesn't know. */
export function attributeHead(ref: attributeHead_attribute$key): AttributeHead | null {
  const data = readInlineData(fragment, ref)
  const { __typename: kind, key, label, color, summary, edited, selected, locked } = data
  // Every member implements AttributeBase, but a spread on a union is typed as
  // optional — a member without it would be one this build doesn't know.
  if (!isKind(kind) || key === undefined || label === undefined || color === undefined || summary === undefined) return null
  if (edited === undefined || selected === undefined || locked === undefined) return null
  return { kind, key, label, color, summary, edited, selected, locked }
}
