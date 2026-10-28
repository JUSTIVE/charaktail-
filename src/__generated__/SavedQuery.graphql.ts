/**
 * @generated SignedSource<<dc3534a043f774e852542652c3e4c7f4>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { saved as querySavedResolverType } from "../graph/root";
// Type assertion validating that `querySavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(querySavedResolverType satisfies () => LiveState<ReadonlyArray<SavedEntry>>);
import { entries as rollEntriesResolverType } from "../graph/roll";
// Type assertion validating that `rollEntriesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntriesResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<RollEntry>);
import { attribute as rollEntryAttributeResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryAttributeResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly __typename: "ColorAttribute" | "ComposeAttribute" | "DateAttribute" | "PickAttribute" | "RangeAttribute" | "StatsAttribute" | "TraitsAttribute";
  readonly id: DataID;
});
import { headline as rollHeadlineResolverType } from "../graph/roll";
// Type assertion validating that `rollHeadlineResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollHeadlineResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string);
import { key as rollKeyResolverType } from "../graph/roll";
// Type assertion validating that `rollKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollKeyResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string);
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
) => string);
import { RollEntry } from "../graph/rollEntry";
import { SavedEntry } from "../graph/root";
export type SavedQuery$variables = Record<PropertyKey, never>;
export type SavedQuery$data = {
  readonly saved: ReadonlyArray<{
    readonly roll: {
      readonly entries: ReadonlyArray<{
        readonly attribute: {
          readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
        };
      }>;
      readonly headline: string;
      readonly key: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly savedAt: string;
  }>;
};
export type SavedQuery = {
  response: SavedQuery$data;
  variables: SavedQuery$variables;
};

import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import {Roll as rollRelayModelInstanceResolver} from '../graph/roll';
import {entries as rollEntriesResolver} from '../graph/roll';
import {headline as rollHeadlineResolver} from '../graph/roll';
import {key as rollKeyResolver} from '../graph/roll';
import {name as rollNameResolver} from '../graph/roll';
import {attribute as rollEntryAttributeResolver} from '../graph/rollEntry';
import {saved as querySavedResolver} from '../graph/root';
import {roll as savedEntryRollResolver} from '../graph/savedEntry';
import {savedAt as savedEntrySavedAtResolver} from '../graph/savedEntry';
import ColorAttribute__id_graphql from './ColorAttribute__id.graphql';
import ComposeAttribute__id_graphql from './ComposeAttribute__id.graphql';
import DateAttribute__id_graphql from './DateAttribute__id.graphql';
import PickAttribute__id_graphql from './PickAttribute__id.graphql';
import RangeAttribute__id_graphql from './RangeAttribute__id.graphql';
import RollEntry____relay_model_instance_graphql from './RollEntry____relay_model_instance.graphql';
import Roll____relay_model_instance_graphql from './Roll____relay_model_instance.graphql';
import Roll__id_graphql from './Roll__id.graphql';
import SavedEntry____relay_model_instance_graphql from './SavedEntry____relay_model_instance.graphql';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "label",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "color",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "edited",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "selected",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locked",
      "storageKey": null
    }
  ],
  "type": "AttributeBase",
  "abstractKey": "__isAttributeBase"
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__relay_model_instance",
    "storageKey": null
  }
],
v5 = {
  "kind": "InlineFragment",
  "selections": (v4/*:: as any*/),
  "type": "SavedEntry",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*:: as any*/)
],
v8 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v7/*:: as any*/),
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
v9 = [
  "ColorAttribute",
  "ComposeAttribute",
  "DateAttribute",
  "PickAttribute",
  "RangeAttribute",
  "StatsAttribute",
  "TraitsAttribute"
];
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
                          "concreteType": null,
                          "modelResolvers": {
                            "ColorAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "ColorAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(ColorAttribute__id_graphql, colorAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "ComposeAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "ComposeAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(ComposeAttribute__id_graphql, composeAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "DateAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "DateAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(DateAttribute__id_graphql, dateAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "PickAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "PickAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(PickAttribute__id_graphql, pickAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "RangeAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "RangeAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(RangeAttribute__id_graphql, rangeAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "StatsAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "StatsAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(StatsAttribute__id_graphql, statsAttributeRelayModelInstanceResolver, 'id', true),
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            },
                            "TraitsAttribute": {
                              "alias": null,
                              "args": null,
                              "fragment": {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "TraitsAttribute__id"
                              },
                              "kind": "RelayResolver",
                              "name": "__relay_model_instance",
                              "resolverModule": resolverDataInjector(TraitsAttribute__id_graphql, traitsAttributeRelayModelInstanceResolver, 'id', true),
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "InlineDataFragmentSpread",
                                "name": "attributeHead_attribute",
                                "selections": [
                                  (v2/*:: as any*/),
                                  {
                                    "kind": "ClientExtension",
                                    "selections": [
                                      (v3/*:: as any*/)
                                    ]
                                  }
                                ],
                                "args": null,
                                "argumentDefinitions": []
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
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "roll",
                "args": null,
                "fragment": (v5/*:: as any*/),
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
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "name",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "headline",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "backingField": {
                      "name": "entries",
                      "args": null,
                      "fragment": (v8/*:: as any*/),
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
                              "selections": (v4/*:: as any*/),
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              (v2/*:: as any*/),
                              (v3/*:: as any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "ColorAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "ComposeAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "DateAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "PickAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "RangeAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "StatsAttribute",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v7/*:: as any*/),
                                "type": "TraitsAttribute",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        }
                      ],
                      "storageKey": null
                    }
                  },
                  (v6/*:: as any*/)
                ],
                "storageKey": null
              }
            }
          ],
          "storageKey": null
        }
      }
    ],
    "clientAbstractTypes": {
      "__isAttribute": (v9/*:: as any*/),
      "__isAttributeBase": (v9/*:: as any*/)
    }
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

(node as any).hash = "3912b38da573d8bf04ed5b1954a3dc6b";

export default node;
