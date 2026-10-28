/**
 * @generated SignedSource<<fefb0c09bffffc0ef2ac021ab0c75508>>
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
import { stage as queryStageResolverType } from "../graph/root";
// Type assertion validating that `queryStageResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryStageResolverType satisfies () => {
  readonly id: DataID;
});
import { savedAt as savedEntrySavedAtResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntrySavedAtResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntrySavedAtResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => string);
import { mode as stageStatusModeResolverType } from "../graph/stageStatus";
// Type assertion validating that `stageStatusModeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(stageStatusModeResolverType satisfies (
  __relay_model_instance: StageStatus____relay_model_instance$data['__relay_model_instance'],
) => LiveState<StageMode>);
export type StageMode = "armed" | "glowing" | "idle" | "mixing" | "revealed";
import { SavedEntry } from "../graph/root";
export type ShellSavedCountQuery$variables = Record<PropertyKey, never>;
export type ShellSavedCountQuery$data = {
  readonly saved: ReadonlyArray<{
    readonly savedAt: string;
  }>;
  readonly stage: {
    readonly mode: StageMode;
  };
};
export type ShellSavedCountQuery = {
  response: ShellSavedCountQuery$data;
  variables: ShellSavedCountQuery$variables;
};

import {saved as querySavedResolver} from '../graph/root';
import {stage as queryStageResolver} from '../graph/root';
import {savedAt as savedEntrySavedAtResolver} from '../graph/savedEntry';
import {StageStatus as stageStatusRelayModelInstanceResolver} from '../graph/stageStatus';
import {mode as stageStatusModeResolver} from '../graph/stageStatus';
import SavedEntry____relay_model_instance_graphql from './SavedEntry____relay_model_instance.graphql';
import StageStatus____relay_model_instance_graphql from './StageStatus____relay_model_instance.graphql';
import StageStatus__id_graphql from './StageStatus__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "ShellSavedCountQuery",
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
              "fragment": {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SavedEntry____relay_model_instance"
              },
              "kind": "RelayResolver",
              "name": "savedAt",
              "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntrySavedAtResolver, '__relay_model_instance', true),
              "path": "saved.savedAt"
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
              "name": "mode",
              "resolverModule": resolverDataInjector(StageStatus____relay_model_instance_graphql, stageStatusModeResolver, '__relay_model_instance', true),
              "path": "stage.mode"
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
    "name": "ShellSavedCountQuery",
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
              "fragment": {
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
                "type": "SavedEntry",
                "abstractKey": null
              },
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            }
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
              "name": "mode",
              "args": null,
              "fragment": {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "name": "__relay_model_instance",
                    "args": null,
                    "fragment": {
                      "kind": "InlineFragment",
                      "selections": [
                        (v0/*:: as any*/)
                      ],
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
            (v0/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ]
  },
  "params": {
    "cacheID": "02a80120cc38d0e6753d923a40fd811c",
    "id": null,
    "metadata": {},
    "name": "ShellSavedCountQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1bc165bfcb4b02f69d09ce645632eb5f";

export default node;
