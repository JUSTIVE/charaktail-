/**
 * @generated SignedSource<<e8e86cbea6c28ac56ac6345b31d074c5>>
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
import { label as attributeLabelResolverType } from "../graph/attribute";
// Type assertion validating that `attributeLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeLabelResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { roll as queryRollResolverType } from "../graph/root";
// Type assertion validating that `queryRollResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryRollResolverType satisfies (
  args: {
    key: string;
  },
) => {
  readonly id: DataID;
} | null | undefined);
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
import { detail as rollEntryDetailResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryDetailResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryDetailResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { possible as rollEntryPossibleResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryPossibleResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryPossibleResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { swatches as rollEntrySwatchesResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntrySwatchesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntrySwatchesResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { value as rollEntryValueResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryValueResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryValueResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
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
import { saved as rollSavedResolverType } from "../graph/roll";
// Type assertion validating that `rollSavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollSavedResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { seed as rollSeedResolverType } from "../graph/roll";
// Type assertion validating that `rollSeedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollSeedResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { RollEntry } from "../graph/rollEntry";
export type ResultQuery$variables = {
  key: string;
};
export type ResultQuery$data = {
  readonly roll: {
    readonly entries: ReadonlyArray<{
      readonly attribute: {
        readonly color: string | null | undefined;
        readonly key: string | null | undefined;
        readonly label: string | null | undefined;
      } | null | undefined;
      readonly detail: string | null | undefined;
      readonly possible: ReadonlyArray<string> | null | undefined;
      readonly swatches: ReadonlyArray<string> | null | undefined;
      readonly value: string | null | undefined;
    }> | null | undefined;
    readonly key: string | null | undefined;
    readonly name: string | null | undefined;
    readonly saved: boolean | null | undefined;
    readonly seed: string | null | undefined;
  } | null | undefined;
};
export type ResultQuery = {
  response: ResultQuery$data;
  variables: ResultQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {Roll as rollRelayModelInstanceResolver} from '../graph/roll';
import {entries as rollEntriesResolver} from '../graph/roll';
import {key as rollKeyResolver} from '../graph/roll';
import {name as rollNameResolver} from '../graph/roll';
import {saved as rollSavedResolver} from '../graph/roll';
import {seed as rollSeedResolver} from '../graph/roll';
import {attribute as rollEntryAttributeResolver} from '../graph/rollEntry';
import {detail as rollEntryDetailResolver} from '../graph/rollEntry';
import {possible as rollEntryPossibleResolver} from '../graph/rollEntry';
import {swatches as rollEntrySwatchesResolver} from '../graph/rollEntry';
import {value as rollEntryValueResolver} from '../graph/rollEntry';
import {roll as queryRollResolver} from '../graph/root';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import RollEntry____relay_model_instance_graphql from './RollEntry____relay_model_instance.graphql';
import Roll____relay_model_instance_graphql from './Roll____relay_model_instance.graphql';
import Roll__id_graphql from './Roll__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "key"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "key",
    "variableName": "key"
  }
],
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Roll____relay_model_instance"
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "RollEntry____relay_model_instance"
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__relay_model_instance",
      "storageKey": null
    }
  ],
  "type": "RollEntry",
  "abstractKey": null
},
v9 = {
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "ResultQuery",
    "selections": [
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
            "path": "roll.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "name": "roll",
          "resolverModule": queryRollResolver,
          "path": "roll"
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "concreteType": "Roll",
          "kind": "LinkedField",
          "name": "roll",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollKeyResolver, '__relay_model_instance', true),
              "path": "roll.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "name",
              "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollNameResolver, '__relay_model_instance', true),
              "path": "roll.name"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "seed",
              "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollSeedResolver, '__relay_model_instance', true),
              "path": "roll.seed"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "saved",
              "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollSavedResolver, '__relay_model_instance', true),
              "path": "roll.saved"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "RollEntry",
              "modelResolvers": null,
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v2/*:: as any*/),
                "kind": "RelayResolver",
                "name": "entries",
                "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollEntriesResolver, '__relay_model_instance', true),
                "path": "roll.entries",
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
                        "path": "roll.entries.attribute.__relay_model_instance"
                      }
                    },
                    "serverObjectOperations": null,
                    "backingField": {
                      "alias": null,
                      "args": null,
                      "fragment": (v3/*:: as any*/),
                      "kind": "RelayResolver",
                      "name": "attribute",
                      "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryAttributeResolver, '__relay_model_instance', true),
                      "path": "roll.entries.attribute"
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
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
                          "path": "roll.entries.attribute.key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
                          "path": "roll.entries.attribute.label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
                          "path": "roll.entries.attribute.color"
                        }
                      ],
                      "storageKey": null
                    }
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "value",
                    "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryValueResolver, '__relay_model_instance', true),
                    "path": "roll.entries.value"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "detail",
                    "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryDetailResolver, '__relay_model_instance', true),
                    "path": "roll.entries.detail"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "swatches",
                    "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntrySwatchesResolver, '__relay_model_instance', true),
                    "path": "roll.entries.swatches"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "possible",
                    "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryPossibleResolver, '__relay_model_instance', true),
                    "path": "roll.entries.possible"
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ResultQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "roll",
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
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
              "name": "seed",
              "args": null,
              "fragment": (v7/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "saved",
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
                      "fragment": (v8/*:: as any*/),
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
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "storageKey": null,
                          "isOutputType": true
                        },
                        {
                          "name": "label",
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "storageKey": null,
                          "isOutputType": true
                        },
                        {
                          "name": "color",
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "storageKey": null,
                          "isOutputType": true
                        },
                        (v5/*:: as any*/)
                      ],
                      "storageKey": null
                    }
                  },
                  {
                    "name": "value",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "detail",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "swatches",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "possible",
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
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
    ]
  },
  "params": {
    "cacheID": "1fa8b280639dd7574ae4bdd1c30b08c5",
    "id": null,
    "metadata": {},
    "name": "ResultQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "dba0906943c9351de5a57cba89cfd756";

export default node;
