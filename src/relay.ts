import { Environment, Network, RecordSource, Store } from 'relay-runtime'

/**
 * An environment with no network. Every field in charaktail's schema is a
 * client resolver over the catalogue and a few cells, so nothing is fetched:
 * the fetch function exists only to satisfy the constructor.
 */
const network = Network.create(() => {
  throw new Error('charaktail has no API — every field is a Relay resolver over local data')
})

export const environment = new Environment({
  network,
  store: new Store(new RecordSource(), { gcReleaseBufferSize: 10 }),
})
