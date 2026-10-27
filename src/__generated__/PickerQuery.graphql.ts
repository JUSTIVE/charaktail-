/**
 * @generated SignedSource<<1a8d1453543cb8eb408ba35a90ba5d59>>
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
import { preview as attributePreviewResolverType } from "../graph/attribute";
// Type assertion validating that `attributePreviewResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributePreviewResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { selected as attributeSelectedResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSelectedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSelectedResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { summary as attributeSummaryResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSummaryResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSummaryResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { swatches as attributeSwatchesResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSwatchesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSwatchesResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { attributes as queryAttributesResolverType } from "../graph/root";
// Type assertion validating that `queryAttributesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributesResolverType satisfies () => ReadonlyArray<{
  readonly id: DataID;
}> | null | undefined);
export type PickerQuery$variables = Record<PropertyKey, never>;
export type PickerQuery$data = {
  readonly attributes: ReadonlyArray<{
    readonly color: string | null | undefined;
    readonly key: string | null | undefined;
    readonly label: string | null | undefined;
    readonly preview: ReadonlyArray<string> | null | undefined;
    readonly selected: boolean | null | undefined;
    readonly summary: string | null | undefined;
    readonly swatches: ReadonlyArray<string> | null | undefined;
  }> | null | undefined;
};
export type PickerQuery = {
  response: PickerQuery$data;
  variables: PickerQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {preview as attributePreviewResolver} from '../graph/attribute';
import {selected as attributeSelectedResolver} from '../graph/attribute';
import {summary as attributeSummaryResolver} from '../graph/attribute';
import {swatches as attributeSwatchesResolver} from '../graph/attribute';
import {attributes as queryAttributesResolver} from '../graph/root';
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
    "name": "PickerQuery",
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
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
              "path": "attributes.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "attributes.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "attributes.color"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "summary",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSummaryResolver, '__relay_model_instance', true),
              "path": "attributes.summary"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "selected",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSelectedResolver, '__relay_model_instance', true),
              "path": "attributes.selected"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "preview",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributePreviewResolver, '__relay_model_instance', true),
              "path": "attributes.preview"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "swatches",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSwatchesResolver, '__relay_model_instance', true),
              "path": "attributes.swatches"
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
            {
              "name": "summary",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "selected",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "preview",
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "swatches",
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
    "cacheID": "5273bcbb9334c727a24a3042630c2072",
    "id": null,
    "metadata": {},
    "name": "PickerQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "567b4057748249cc29c002b7bc3d213c";

export default node;
