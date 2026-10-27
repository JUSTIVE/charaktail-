/**
 * @generated SignedSource<<541a0c2a0d818ab05e99a1fac8950c2c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { color as attributeColorResolverType } from "../graph/attribute";
// Type assertion validating that `attributeColorResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeColorResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { key as attributeKeyResolverType } from "../graph/attribute";
// Type assertion validating that `attributeKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeKeyResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { saved as querySavedResolverType } from "../graph/root";
// Type assertion validating that `querySavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(querySavedResolverType satisfies () => LiveState<ReadonlyArray<SavedEntry> | null | undefined>);
import { entries as rollEntriesResolverType } from "../graph/roll";
// Type assertion validating that `rollEntriesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntriesResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<RollEntry> | null | undefined);
import { attribute as rollEntryAttributeResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryAttributeResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly id: DataID;
} | null | undefined);
import { headline as rollHeadlineResolverType } from "../graph/roll";
// Type assertion validating that `rollHeadlineResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollHeadlineResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { key as rollKeyResolverType } from "../graph/roll";
// Type assertion validating that `rollKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollKeyResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { name as rollNameResolverType } from "../graph/roll";
// Type assertion validating that `rollNameResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollNameResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { roll as savedEntryRollResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntryRollResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntryRollResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly id: DataID;
} | null | undefined);
import { savedAt as savedEntrySavedAtResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntrySavedAtResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntrySavedAtResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { RollEntry } from "../graph/rollEntry";
import { SavedEntry } from "../graph/root";
export type SavedQuery$variables = Record<PropertyKey, never>;
export type SavedQuery$data = {
  readonly saved: ReadonlyArray<{
    readonly roll: {
      readonly entries: ReadonlyArray<{
        readonly attribute: {
          readonly color: string | null | undefined;
          readonly key: string | null | undefined;
        } | null | undefined;
      }> | null | undefined;
      readonly headline: string | null | undefined;
      readonly key: string | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly savedAt: string | null | undefined;
  }> | null | undefined;
};
export type SavedQuery = {
  response: SavedQuery$data;
  variables: SavedQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {Roll as rollRelayModelInstanceResolver} from '../graph/roll';
import {entries as rollEntriesResolver} from '../graph/roll';
import {headline as rollHeadlineResolver} from '../graph/roll';
import {key as rollKeyResolver} from '../graph/roll';
import {name as rollNameResolver} from '../graph/roll';
import {attribute as rollEntryAttributeResolver} from '../graph/rollEntry';
import {saved as querySavedResolver} from '../graph/root';
import {roll as savedEntryRollResolver} from '../graph/savedEntry';
import {savedAt as savedEntrySavedAtResolver} from '../graph/savedEntry';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import RollEntry____relay_model_instance_graphql from './RollEntry____relay_model_instance.graphql';
import Roll____relay_model_instance_graphql from './Roll____relay_model_instance.graphql';
import Roll__id_graphql from './Roll__id.graphql';
import SavedEntry____relay_model_instance_graphql from './SavedEntry____relay_model_instance.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SavedEntry____relay_model_instance"
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Roll____relay_model_instance"
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__relay_model_instance",
    "storageKey": null
  }
],
v4 = {
  "kind": "InlineFragment",
  "selections": (v3/*:: as any*/),
  "type": "SavedEntry",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*:: as any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v6/*:: as any*/),
        "type": "Roll",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "Roll",
  "abstractKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v6/*:: as any*/),
        "type": "Attribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "Attribute",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "SavedQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "SavedEntry",
        "modelResolvers": null,
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayLiveResolver",
          "name": "saved",
          "resolverModule": querySavedResolver,
          "path": "saved",
          "normalizationInfo": {
            "kind": "WeakModel",
            "concreteType": "SavedEntry",
            "plural": true
          }
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedEntry",
          "kind": "LinkedField",
          "name": "saved",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "savedAt",
              "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntrySavedAtResolver, '__relay_model_instance', true),
              "path": "saved.savedAt"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "Roll",
              "modelResolvers": {
                "Roll": {
                  "alias": null,
                  "args": null,
                  "fragment": {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Roll__id"
                  },
                  "kind": "RelayResolver",
                  "name": "__relay_model_instance",
                  "resolverModule": resolverDataInjector(Roll__id_graphql, rollRelayModelInstanceResolver, 'id', true),
                  "path": "saved.roll.__relay_model_instance"
                }
              },
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v0/*:: as any*/),
                "kind": "RelayResolver",
                "name": "roll",
                "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntryRollResolver, '__relay_model_instance', true),
                "path": "saved.roll"
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Roll",
                "kind": "LinkedField",
                "name": "roll",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v1/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "key",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollKeyResolver, '__relay_model_instance', true),
                    "path": "saved.roll.key"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v1/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "name",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollNameResolver, '__relay_model_instance', true),
                    "path": "saved.roll.name"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v1/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "headline",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollHeadlineResolver, '__relay_model_instance', true),
                    "path": "saved.roll.headline"
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "concreteType": "RollEntry",
                    "modelResolvers": null,
                    "serverObjectOperations": null,
                    "backingField": {
                      "alias": null,
                      "args": null,
                      "fragment": (v1/*:: as any*/),
                      "kind": "RelayResolver",
                      "name": "entries",
                      "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollEntriesResolver, '__relay_model_instance', true),
                      "path": "saved.roll.entries",
                      "normalizationInfo": {
                        "kind": "WeakModel",
                        "concreteType": "RollEntry",
                        "plural": true
                      }
                    },
                    "linkedField": {
                      "alias": null,
                      "args": null,
                      "concreteType": "RollEntry",
                      "kind": "LinkedField",
                      "name": "entries",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "ClientEdgeToClientObject",
                          "concreteType": "Attribute",
                          "modelResolvers": {
                            "Attribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "Attribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(Attribute__id_graphql, attributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            }
                          },
                          "serverObjectOperations": null,
                          "backingField": {
                            "alias": null,
                            "args": null,
                            "fragment": {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "RollEntry____relay_model_instance"
                            },
                            "kind": "RelayResolver",
                            "name": "attribute",
                            "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryAttributeResolver, '__relay_model_instance', true),
                            "path": "saved.roll.entries.attribute"
                          },
                          "linkedField": {
                            "alias": null,
                            "args": null,
                            "concreteType": "Attribute",
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "fragment": (v2/*:: as any*/),
                                "kind": "RelayResolver",
                                "name": "key",
                                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
                                "path": "saved.roll.entries.attribute.key"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "fragment": (v2/*:: as any*/),
                                "kind": "RelayResolver",
                                "name": "color",
                                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
                                "path": "saved.roll.entries.attribute.color"
                              }
                            ],
                            "storageKey": null
                          }
                        }
                      ],
                      "storageKey": null
                    }
                  }
                ],
                "storageKey": null
              }
            }
          ],
          "storageKey": null
        }
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SavedQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "saved",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": true
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedEntry",
          "kind": "LinkedField",
          "name": "saved",
          "plural": true,
          "selections": [
            {
              "name": "savedAt",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "roll",
                "args": null,
                "fragment": (v4/*:: as any*/),
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": false
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Roll",
                "kind": "LinkedField",
                "name": "roll",
                "plural": false,
                "selections": [
                  {
                    "name": "key",
                    "args": null,
                    "fragment": (v7/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "name",
                    "args": null,
                    "fragment": (v7/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "headline",
                    "args": null,
                    "fragment": (v7/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "backingField": {
                      "name": "entries",
                      "args": null,
                      "fragment": (v7/*:: as any*/),
                      "kind": "RelayResolver",
                      "storageKey": null,
                      "isOutputType": true
                    },
                    "linkedField": {
                      "alias": null,
                      "args": null,
                      "concreteType": "RollEntry",
                      "kind": "LinkedField",
                      "name": "entries",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "ClientEdgeToClientObject",
                          "backingField": {
                            "name": "attribute",
                            "args": null,
                            "fragment": {
                              "kind": "InlineFragment",
                              "selections": (v3/*:: as any*/),
                              "type": "RollEntry",
                              "abstractKey": null
                            },
                            "kind": "RelayResolver",
                            "storageKey": null,
                            "isOutputType": false
                          },
                          "linkedField": {
                            "alias": null,
                            "args": null,
                            "concreteType": "Attribute",
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              {
                                "name": "key",
                                "args": null,
                                "fragment": (v8/*:: as any*/),
                                "kind": "RelayResolver",
                                "storageKey": null,
                                "isOutputType": true
                              },
                              {
                                "name": "color",
                                "args": null,
                                "fragment": (v8/*:: as any*/),
                                "kind": "RelayResolver",
                                "storageKey": null,
                                "isOutputType": true
                              },
                              (v5/*:: as any*/)
                            ],
                            "storageKey": null
                          }
                        }
                      ],
                      "storageKey": null
                    }
                  },
                  (v5/*:: as any*/)
                ],
                "storageKey": null
              }
            }
          ],
          "storageKey": null
        }
      }
    ]
  },
  "params": {
    "cacheID": "fc2c5c82a68a6539dcc99e2771a5603b",
    "id": null,
    "metadata": {},
    "name": "SavedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "6e87ea7fe186da2dfa85ef4452e8e3fd";

export default node;
