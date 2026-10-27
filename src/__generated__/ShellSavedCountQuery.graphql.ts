/**
 * @generated SignedSource<<2eea63aee3a1157ed1395a67e2e1e7b0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs } from "relay-runtime";
import { saved as querySavedResolverType } from "../graph/root";
// Type assertion validating that `querySavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(querySavedResolverType satisfies () => LiveState<ReadonlyArray<SavedEntry> | null | undefined>);
import { savedAt as savedEntrySavedAtResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntrySavedAtResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntrySavedAtResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { SavedEntry } from "../graph/root";
export type ShellSavedCountQuery$variables = Record<PropertyKey, never>;
export type ShellSavedCountQuery$data = {
  readonly saved: ReadonlyArray<{
    readonly savedAt: string | null | undefined;
  }> | null | undefined;
};
export type ShellSavedCountQuery = {
  response: ShellSavedCountQuery$data;
  variables: ShellSavedCountQuery$variables;
};

import {saved as querySavedResolver} from '../graph/root';
import {savedAt as savedEntrySavedAtResolver} from '../graph/savedEntry';
import SavedEntry____relay_model_instance_graphql from './SavedEntry____relay_model_instance.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = {
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

(node as any).hash = "7b2493505a4ce0f0c2494c7b37dbd85a";

export default node;
