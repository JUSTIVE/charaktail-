/**
 * @generated SignedSource<<52c6c3a50ce83b0600e528d80c21a6b6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { canShake as draftCanShakeResolverType } from "../graph/draft";
// Type assertion validating that `draftCanShakeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftCanShakeResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean>);
import { name as draftNameResolverType } from "../graph/draft";
// Type assertion validating that `draftNameResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftNameResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<string>);
import { selectionCount as draftSelectionCountResolverType } from "../graph/draft";
// Type assertion validating that `draftSelectionCountResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftSelectionCountResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { attributes as queryAttributesResolverType } from "../graph/root";
// Type assertion validating that `queryAttributesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributesResolverType satisfies () => ReadonlyArray<{
  readonly __typename: "ColorAttribute" | "ComposeAttribute" | "DateAttribute" | "PickAttribute" | "RangeAttribute" | "StatsAttribute" | "TraitsAttribute";
  readonly id: DataID;
}>);
import { draft as queryDraftResolverType } from "../graph/root";
// Type assertion validating that `queryDraftResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryDraftResolverType satisfies () => {
  readonly id: DataID;
});
import { stage as queryStageResolverType } from "../graph/root";
// Type assertion validating that `queryStageResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryStageResolverType satisfies () => {
  readonly id: DataID;
});
import { motion as stageStatusMotionResolverType } from "../graph/stageStatus";
// Type assertion validating that `stageStatusMotionResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(stageStatusMotionResolverType satisfies (
  __relay_model_instance: StageStatus____relay_model_instance$data['__relay_model_instance'],
) => LiveState<MotionAccess>);
export type MotionAccess = "denied" | "granted" | "prompt" | "unknown" | "unsupported";
export type PickerQuery$variables = Record<PropertyKey, never>;
export type PickerQuery$data = {
  readonly attributes: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
  }>;
  readonly draft: {
    readonly canShake: boolean;
    readonly name: string;
    readonly selectionCount: number;
  };
  readonly stage: {
    readonly motion: MotionAccess;
  };
};
export type PickerQuery = {
  response: PickerQuery$data;
  variables: PickerQuery$variables;
};

import {Draft as draftRelayModelInstanceResolver} from '../graph/draft';
import {canShake as draftCanShakeResolver} from '../graph/draft';
import {name as draftNameResolver} from '../graph/draft';
import {selectionCount as draftSelectionCountResolver} from '../graph/draft';
import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import {attributes as queryAttributesResolver} from '../graph/root';
import {draft as queryDraftResolver} from '../graph/root';
import {stage as queryStageResolver} from '../graph/root';
import {StageStatus as stageStatusRelayModelInstanceResolver} from '../graph/stageStatus';
import {motion as stageStatusMotionResolver} from '../graph/stageStatus';
import ColorAttribute__id_graphql from './ColorAttribute__id.graphql';
import ComposeAttribute__id_graphql from './ComposeAttribute__id.graphql';
import DateAttribute__id_graphql from './DateAttribute__id.graphql';
import Draft____relay_model_instance_graphql from './Draft____relay_model_instance.graphql';
import Draft__id_graphql from './Draft__id.graphql';
import PickAttribute__id_graphql from './PickAttribute__id.graphql';
import RangeAttribute__id_graphql from './RangeAttribute__id.graphql';
import StageStatus____relay_model_instance_graphql from './StageStatus____relay_model_instance.graphql';
import StageStatus__id_graphql from './StageStatus__id.graphql';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Draft____relay_model_instance"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*:: as any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v4/*:: as any*/),
        "type": "Draft",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "Draft",
  "abstractKey": null
},
v6 = [
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
    "name": "PickerQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "Draft",
        "modelResolvers": {
          "Draft": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Draft__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(Draft__id_graphql, draftRelayModelInstanceResolver, 'id', true),
            "path": "draft.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "name": "draft",
          "resolverModule": queryDraftResolver,
          "path": "draft"
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "Draft",
          "kind": "LinkedField",
          "name": "draft",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "name",
              "resolverModule": resolverDataInjector(Draft____relay_model_instance_graphql, draftNameResolver, '__relay_model_instance', true),
              "path": "draft.name"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "canShake",
              "resolverModule": resolverDataInjector(Draft____relay_model_instance_graphql, draftCanShakeResolver, '__relay_model_instance', true),
              "path": "draft.canShake"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "selectionCount",
              "resolverModule": resolverDataInjector(Draft____relay_model_instance_graphql, draftSelectionCountResolver, '__relay_model_instance', true),
              "path": "draft.selectionCount"
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
      },
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
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
            "path": "attributes.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "name": "attributes",
          "resolverModule": queryAttributesResolver,
          "path": "attributes"
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attributes",
          "plural": true,
          "selections": [
            {
              "kind": "InlineDataFragmentSpread",
              "name": "attributeHead_attribute",
              "selections": [
                (v1/*:: as any*/),
                {
                  "kind": "ClientExtension",
                  "selections": [
                    (v2/*:: as any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PickerQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "draft",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "Draft",
          "kind": "LinkedField",
          "name": "draft",
          "plural": false,
          "selections": [
            {
              "name": "name",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "canShake",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "selectionCount",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v3/*:: as any*/)
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
                      "selections": (v4/*:: as any*/),
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
            (v3/*:: as any*/)
          ],
          "storageKey": null
        }
      },
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "attributes",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attributes",
          "plural": true,
          "selections": [
            (v1/*:: as any*/),
            (v2/*:: as any*/),
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "ColorAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "ComposeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "DateAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "PickAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "RangeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "StatsAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v4/*:: as any*/),
              "type": "TraitsAttribute",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      }
    ],
    "clientAbstractTypes": {
      "__isAttribute": (v6/*:: as any*/),
      "__isAttributeBase": (v6/*:: as any*/)
    }
  },
  "params": {
    "cacheID": "5273bcbb9334c727a24a3042630c2072",
    "id": null,
    "metadata": {},
    "name": "PickerQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4cc783bafad7cae80a3625aa287ccf34";

export default node;
