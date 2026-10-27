/**
 * @generated SignedSource<<d903a1e4b32d703f9c3b53d27cb902f2>>
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
import { selected as attributeSelectedResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSelectedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSelectedResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { canShake as draftCanShakeResolverType } from "../graph/draft";
// Type assertion validating that `draftCanShakeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftCanShakeResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { name as draftNameResolverType } from "../graph/draft";
// Type assertion validating that `draftNameResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftNameResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<string | null | undefined>);
import { selectionCount as draftSelectionCountResolverType } from "../graph/draft";
// Type assertion validating that `draftSelectionCountResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftSelectionCountResolverType satisfies (
  __relay_model_instance: Draft____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number | null | undefined>);
import { attributes as queryAttributesResolverType } from "../graph/root";
// Type assertion validating that `queryAttributesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributesResolverType satisfies () => ReadonlyArray<{
  readonly id: DataID;
}> | null | undefined);
import { draft as queryDraftResolverType } from "../graph/root";
// Type assertion validating that `queryDraftResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryDraftResolverType satisfies () => {
  readonly id: DataID;
} | null | undefined);
import { stage as queryStageResolverType } from "../graph/root";
// Type assertion validating that `queryStageResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryStageResolverType satisfies () => {
  readonly id: DataID;
} | null | undefined);
import { motion as stageStatusMotionResolverType } from "../graph/stageStatus";
// Type assertion validating that `stageStatusMotionResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(stageStatusMotionResolverType satisfies (
  __relay_model_instance: StageStatus____relay_model_instance$data['__relay_model_instance'],
) => LiveState<string | null | undefined>);
export type PickerQuery$variables = Record<PropertyKey, never>;
export type PickerQuery$data = {
  readonly attributes: ReadonlyArray<{
    readonly color: string | null | undefined;
    readonly key: string | null | undefined;
    readonly label: string | null | undefined;
    readonly selected: boolean | null | undefined;
  }> | null | undefined;
  readonly draft: {
    readonly canShake: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly selectionCount: number | null | undefined;
  } | null | undefined;
  readonly stage: {
    readonly motion: string | null | undefined;
  } | null | undefined;
};
export type PickerQuery = {
  response: PickerQuery$data;
  variables: PickerQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {selected as attributeSelectedResolver} from '../graph/attribute';
import {Draft as draftRelayModelInstanceResolver} from '../graph/draft';
import {canShake as draftCanShakeResolver} from '../graph/draft';
import {name as draftNameResolver} from '../graph/draft';
import {selectionCount as draftSelectionCountResolver} from '../graph/draft';
import {attributes as queryAttributesResolver} from '../graph/root';
import {draft as queryDraftResolver} from '../graph/root';
import {stage as queryStageResolver} from '../graph/root';
import {StageStatus as stageStatusRelayModelInstanceResolver} from '../graph/stageStatus';
import {motion as stageStatusMotionResolver} from '../graph/stageStatus';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import Draft____relay_model_instance_graphql from './Draft____relay_model_instance.graphql';
import Draft__id_graphql from './Draft__id.graphql';
import StageStatus____relay_model_instance_graphql from './StageStatus____relay_model_instance.graphql';
import StageStatus__id_graphql from './StageStatus__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Draft____relay_model_instance"
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*:: as any*/)
],
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v3/*:: as any*/),
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
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v3/*:: as any*/),
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
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attributes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
              "path": "attributes.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayResolver",
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "attributes.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "attributes.color"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "selected",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSelectedResolver, '__relay_model_instance', true),
              "path": "attributes.selected"
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
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "canShake",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "selectionCount",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v2/*:: as any*/)
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
                      "selections": (v3/*:: as any*/),
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
            (v2/*:: as any*/)
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
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attributes",
          "plural": true,
          "selections": [
            {
              "name": "key",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "label",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "color",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "selected",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v2/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ]
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

(node as any).hash = "652294e0daa8c26acf52d5914322921f";

export default node;
