import { graphql, readInlineData } from 'relay-runtime'

import type { attributeHead_attribute$data, attributeHead_attribute$key } from '../__generated__/attributeHead_attribute.graphql'

/*
 * `Attribute` is a union of kinds, and every kind implements AttributeBase.
 * The fragment still asks each member by name rather than `... on
 * AttributeBase`: refining an interface over resolver-backed types makes the
 * Relay runtime write the same type-info record twice and throw (Relay 21).
 * Views spread this fragment and read it through `attributeHead`.
 */
const fragment = graphql`
  fragment attributeHead_attribute on Attribute @inline {
    __typename
    ... on PickAttribute {
      multiple
      count
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on ColorAttribute {
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on ComposeAttribute {
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on StatsAttribute {
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on RangeAttribute {
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on DateAttribute {
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
    }
    ... on TraitsAttribute {
      multiple
      count
      enabledCount
      key
      label
      color
      summary
      edited
      selected
      locked
      lockedValue
      releasedValue
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
  /** List kinds: how many values are on. Null for kinds with no list (키, 생일). */
  enabledCount: number | null
  /**
   * Several at once: how many come out — exactly, for a pick; at most, for
   * 외형 특징, where Infinity means 무제한. Null for one-at-a-time kinds.
   */
  draws: number | null
  /** What it is locked at — 여성, 17세 — or null. */
  lockedValue: string | null
  /** Let go of on the picker, still there to lock again. */
  releasedValue: string | null
}

/** The fields every kind has, or null for a member this build doesn't know. */
export function attributeHead(ref: attributeHead_attribute$key): AttributeHead | null {
  const data = readInlineData(fragment, ref)
  if (data.__typename === '%other') return null
  const { __typename: kind, key, label, color, summary, edited, selected, locked } = data
  const enabledCount = 'enabledCount' in data ? data.enabledCount : null
  const draws = 'multiple' in data && data.multiple ? (data.count ?? Number.POSITIVE_INFINITY) : null
  const lockedValue = data.lockedValue ?? null
  const releasedValue = data.releasedValue ?? null
  return { kind, key, label, color, summary, edited, selected, locked, enabledCount, draws, lockedValue, releasedValue }
}
