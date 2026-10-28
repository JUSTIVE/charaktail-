import { graphql, readInlineData } from 'relay-runtime'

import type { attributeHead_attribute$data, attributeHead_attribute$key } from '../__generated__/attributeHead_attribute.graphql'

/*
 * `Attribute` is a union — one member per kind, no shared interface — so the
 * fields every kind has are asked of each member by name. This one fragment
 * does that once; views spread it and read it through `attributeHead`.
 */
const fragment = graphql`
  fragment attributeHead_attribute on Attribute @inline {
    __typename
    ... on PickAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on ColorAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on ComposeAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on StatsAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on RangeAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on DateAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
    }
    ... on TraitsAttribute {
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
export type AttributeKindName = Exclude<attributeHead_attribute$data['__typename'], '%other'>

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
  if (data.__typename === '%other') return null
  const { __typename: kind, key, label, color, summary, edited, selected, locked } = data
  return { kind, key, label, color, summary, edited, selected, locked }
}
