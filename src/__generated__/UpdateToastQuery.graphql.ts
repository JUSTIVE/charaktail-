/**
 * @generated SignedSource<<87bc3a2b3ebb0384c3ab51f782dcc379>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { offlineReady as appOfflineReadyResolverType } from "../graph/appStatus";
// Type assertion validating that `appOfflineReadyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(appOfflineReadyResolverType satisfies (
  __relay_model_instance: App____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { updateReady as appUpdateReadyResolverType } from "../graph/appStatus";
// Type assertion validating that `appUpdateReadyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(appUpdateReadyResolverType satisfies (
  __relay_model_instance: App____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { app as queryAppResolverType } from "../graph/root";
// Type assertion validating that `queryAppResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAppResolverType satisfies () => {
  readonly id: DataID;
} | null | undefined);
export type UpdateToastQuery$variables = Record<PropertyKey, never>;
export type UpdateToastQuery$data = {
  readonly app: {
    readonly offlineReady: boolean | null | undefined;
    readonly updateReady: boolean | null | undefined;
  } | null | undefined;
};
export type UpdateToastQuery = {
  response: UpdateToastQuery$data;
  variables: UpdateToastQuery$variables;
};

import {App as appRelayModelInstanceResolver} from '../graph/appStatus';
import {offlineReady as appOfflineReadyResolver} from '../graph/appStatus';
import {updateReady as appUpdateReadyResolver} from '../graph/appStatus';
import {app as queryAppResolver} from '../graph/root';
import App____relay_model_instance_graphql from './App____relay_model_instance.graphql';
import App__id_graphql from './App__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "App____relay_model_instance"
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          (v1/*:: as any*/)
        ],
        "type": "App",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "App",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "UpdateToastQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "App",
        "modelResolvers": {
          "App": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "App__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(App__id_graphql, appRelayModelInstanceResolver, 'id', true),
            "path": "app.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "name": "app",
          "resolverModule": queryAppResolver,
          "path": "app"
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "App",
          "kind": "LinkedField",
          "name": "app",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "updateReady",
              "resolverModule": resolverDataInjector(App____relay_model_instance_graphql, appUpdateReadyResolver, '__relay_model_instance', true),
              "path": "app.updateReady"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "offlineReady",
              "resolverModule": resolverDataInjector(App____relay_model_instance_graphql, appOfflineReadyResolver, '__relay_model_instance', true),
              "path": "app.offlineReady"
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
    "name": "UpdateToastQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "app",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "App",
          "kind": "LinkedField",
          "name": "app",
          "plural": false,
          "selections": [
            {
              "name": "updateReady",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "offlineReady",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v1/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ]
  },
  "params": {
    "cacheID": "9d7b73c9812681a484464b341e1c7c9d",
    "id": null,
    "metadata": {},
    "name": "UpdateToastQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1bdcef3ac94f7c2fb4260f94093ce9df";

export default node;
