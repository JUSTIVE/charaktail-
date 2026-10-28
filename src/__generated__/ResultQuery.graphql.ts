/**
 * @generated SignedSource<<bc8ec380dc6dc0a96deabf18f9c17115>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
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
import { stage as queryStageResolverType } from "../graph/root";
// Type assertion validating that `queryStageResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryStageResolverType satisfies () => {
  readonly id: DataID;
});
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
) => ReadonlyArray<string>);
import { swatches as rollEntrySwatchesResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntrySwatchesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntrySwatchesResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
import { value as rollEntryValueResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryValueResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryValueResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
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
import { saved as rollSavedResolverType } from "../graph/roll";
// Type assertion validating that `rollSavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollSavedResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean>);
import { seed as rollSeedResolverType } from "../graph/roll";
// Type assertion validating that `rollSeedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollSeedResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string);
import { motion as stageStatusMotionResolverType } from "../graph/stageStatus";
// Type assertion validating that `stageStatusMotionResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(stageStatusMotionResolverType satisfies (
  __relay_model_instance: StageStatus____relay_model_instance$data['__relay_model_instance'],
) => LiveState<MotionAccess>);
export type MotionAccess = "denied" | "granted" | "prompt" | "unknown" | "unsupported";
import { RollEntry } from "../graph/rollEntry";
export type ResultQuery$variables = {
  key: string;
};
export type ResultQuery$data = {
  readonly roll: {
    readonly entries: ReadonlyArray<{
      readonly attribute: {
        readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
      };
      readonly detail: string | null | undefined;
      readonly possible: ReadonlyArray<string>;
      readonly swatches: ReadonlyArray<string>;
      readonly value: string;
    }>;
    readonly key: string;
    readonly name: string | null | undefined;
    readonly saved: boolean;
    readonly seed: string;
  } | null | undefined;
  readonly stage: {
    readonly motion: MotionAccess;
  };
};
export type ResultQuery = {
  response: ResultQuery$data;
  variables: ResultQuery$variables;
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
import {stage as queryStageResolver} from '../graph/root';
import {StageStatus as stageStatusRelayModelInstanceResolver} from '../graph/stageStatus';
import {motion as stageStatusMotionResolver} from '../graph/stageStatus';
import ColorAttribute__id_graphql from './ColorAttribute__id.graphql';
import ComposeAttribute__id_graphql from './ComposeAttribute__id.graphql';
import DateAttribute__id_graphql from './DateAttribute__id.graphql';
import PickAttribute__id_graphql from './PickAttribute__id.graphql';
import RangeAttribute__id_graphql from './RangeAttribute__id.graphql';
import RollEntry____relay_model_instance_graphql from './RollEntry____relay_model_instance.graphql';
import Roll____relay_model_instance_graphql from './Roll____relay_model_instance.graphql';
import Roll__id_graphql from './Roll__id.graphql';
import StageStatus____relay_model_instance_graphql from './StageStatus____relay_model_instance.graphql';
import StageStatus__id_graphql from './StageStatus__id.graphql';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
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
v9 = {
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
v10 = [
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                        "path": "roll.entries.attribute.__relay_model_instance"
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
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "attribute",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "InlineDataFragmentSpread",
                          "name": "attributeHead_attribute",
                          "selections": [
                            (v4/*:: as any*/),
                            {
                              "kind": "ClientExtension",
                              "selections": [
                                (v5/*:: as any*/)
                              ]
                            }
                          ],
                          "args": null,
                          "argumentDefinitions": []
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
      },
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "StageStatus",
        "modelResolvers": {
          "StageStatus": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "StageStatus__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(StageStatus__id_graphql, stageStatusRelayModelInstanceResolver, 'id', true),
            "path": "stage.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "name": "stage",
          "resolverModule": queryStageResolver,
          "path": "stage"
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "StageStatus",
          "kind": "LinkedField",
          "name": "stage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": {
                "args": null,
                "kind": "FragmentSpread",
                "name": "StageStatus____relay_model_instance"
              },
              "kind": "RelayLiveResolver",
              "name": "motion",
              "resolverModule": resolverDataInjector(StageStatus____relay_model_instance_graphql, stageStatusMotionResolver, '__relay_model_instance', true),
              "path": "stage.motion"
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
              "name": "seed",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "saved",
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
                      "fragment": (v9/*:: as any*/),
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
                        (v4/*:: as any*/),
                        (v5/*:: as any*/),
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
                  },
                  {
                    "name": "value",
                    "args": null,
                    "fragment": (v9/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "detail",
                    "args": null,
                    "fragment": (v9/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "swatches",
                    "args": null,
                    "fragment": (v9/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "possible",
                    "args": null,
                    "fragment": (v9/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  }
                ],
                "storageKey": null
              }
            },
            (v6/*:: as any*/)
          ],
          "storageKey": null
        }
      },
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "stage",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "StageStatus",
          "kind": "LinkedField",
          "name": "stage",
          "plural": false,
          "selections": [
            {
              "name": "motion",
              "args": null,
              "fragment": {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "name": "__relay_model_instance",
                    "args": null,
                    "fragment": {
                      "kind": "InlineFragment",
                      "selections": (v7/*:: as any*/),
                      "type": "StageStatus",
                      "abstractKey": null
                    },
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": false
                  }
                ],
                "type": "StageStatus",
                "abstractKey": null
              },
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v6/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ],
    "clientAbstractTypes": {
      "__isAttribute": (v10/*:: as any*/),
      "__isAttributeBase": (v10/*:: as any*/)
    }
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

(node as any).hash = "c2cbd2c0ed76c35d7454ed5c26865cd3";

export default node;
