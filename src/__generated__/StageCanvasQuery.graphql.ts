/**
 * @generated SignedSource<<18c8ff0ea1e54c06242086a3836710bf>>
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
import { selectedAttributes as querySelectedAttributesResolverType } from "../graph/root";
// Type assertion validating that `querySelectedAttributesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(querySelectedAttributesResolverType satisfies () => LiveState<ReadonlyArray<{
  readonly id: DataID;
}> | null | undefined>);
export type StageCanvasQuery$variables = Record<PropertyKey, never>;
export type StageCanvasQuery$data = {
  readonly selectedAttributes: ReadonlyArray<{
    readonly color: string | null | undefined;
    readonly key: string | null | undefined;
    readonly label: string | null | undefined;
  }> | null | undefined;
};
export type StageCanvasQuery = {
  response: StageCanvasQuery$data;
  variables: StageCanvasQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {selectedAttributes as querySelectedAttributesResolver} from '../graph/root';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
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
    "name": "StageCanvasQuery",
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
            "path": "selectedAttributes.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayLiveResolver",
          "name": "selectedAttributes",
          "resolverModule": querySelectedAttributesResolver,
          "path": "selectedAttributes"
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "selectedAttributes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
              "path": "selectedAttributes.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "selectedAttributes.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "selectedAttributes.color"
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
    "name": "StageCanvasQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "selectedAttributes",
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
          "name": "selectedAttributes",
          "plural": true,
          "selections": [
            {
              "name": "key",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "label",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "color",
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
    "cacheID": "2e77921d06ef59cf65a999f280af1b86",
    "id": null,
    "metadata": {},
    "name": "StageCanvasQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a64c6c330fa3e7205e286a917a438f9c";

export default node;
