import { useLazyLoadQuery } from 'react-relay'
import type { GraphQLTaggedNode, OperationType } from 'relay-runtime'

/**
 * The only way charaktail queries: store-only, always. Every field is a
 * client resolver over local state, so there is nothing to fetch — and a
 * query that ever reached for the network would throw (src/relay.ts).
 */
export function useLocalQuery<T extends OperationType>(query: GraphQLTaggedNode, variables: T['variables']): T['response'] {
  return useLazyLoadQuery<T>(query, variables, { fetchPolicy: 'store-only' })
}
