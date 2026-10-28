/**
 * @generated SignedSource<<1e5264828fee7dc18145ac4cf7968cb1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs, DataID } from "relay-runtime";
import { color as attributeColorResolverType } from "../graph/attribute";
// Type assertion validating that `attributeColorResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeColorResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { kind as attributeKindResolverType } from "../graph/attribute";
// Type assertion validating that `attributeKindResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeKindResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { label as attributeLabelResolverType } from "../graph/attribute";
// Type assertion validating that `attributeLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeLabelResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { partLabels as attributePartLabelsResolverType } from "../graph/attribute";
// Type assertion validating that `attributePartLabelsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributePartLabelsResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { attribute as queryAttributeResolverType } from "../graph/root";
// Type assertion validating that `queryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributeResolverType satisfies (
  args: {
    id: string;
  },
) => {
  readonly id: DataID;
} | null | undefined);
export type AddValueSheetQuery$variables = {
  id: string;
};
export type AddValueSheetQuery$data = {
  readonly attribute: {
    readonly color: string | null | undefined;
    readonly kind: string | null | undefined;
    readonly label: string | null | undefined;
    readonly partLabels: ReadonlyArray<string> | null | undefined;
  } | null | undefined;
};
export type AddValueSheetQuery = {
  response: AddValueSheetQuery$data;
  variables: AddValueSheetQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {kind as attributeKindResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {partLabels as attributePartLabelsResolver} from '../graph/attribute';
import {attribute as queryAttributeResolver} from '../graph/root';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          (v3/*:: as any*/)
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "AddValueSheetQuery",
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
            "path": "attribute.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "name": "attribute",
          "resolverModule": queryAttributeResolver,
          "path": "attribute"
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
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
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "attribute.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "attribute.color"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "kind",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKindResolver, '__relay_model_instance', true),
              "path": "attribute.kind"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "partLabels",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributePartLabelsResolver, '__relay_model_instance', true),
              "path": "attribute.partLabels"
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
    "name": "AddValueSheetQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "attribute",
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            {
              "name": "label",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "color",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "kind",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "partLabels",
              "args": null,
              "fragment": (v4/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            (v3/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ]
  },
  "params": {
    "cacheID": "ea1575f05b09608ab9f7efeb66569b13",
    "id": null,
    "metadata": {},
    "name": "AddValueSheetQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "3124aeabdc62d8ce0f1c117b50807266";

export default node;
