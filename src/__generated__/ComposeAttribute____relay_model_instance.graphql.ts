/**
 * @generated SignedSource<<9e1bc3c50d6d51e53d03be2f6c35e3c0>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { ComposeAttribute as composeAttributeRelayModelInstanceResolverType } from "../graph/kinds/composeAttribute";
// Type assertion validating that `composeAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(composeAttributeRelayModelInstanceResolverType satisfies (
  id: ComposeAttribute__id$data['id'],
) => unknown);
export type ComposeAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof composeAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "ComposeAttribute____relay_model_instance";
};
export type ComposeAttribute____relay_model_instance$key = {
  readonly " $data"?: ComposeAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"ComposeAttribute____relay_model_instance">;
};

import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import ComposeAttribute__id_graphql from './ComposeAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ComposeAttribute____relay_model_instance",
  "selections": [
    {
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
      "path": "__relay_model_instance"
    }
  ],
  "type": "ComposeAttribute",
  "abstractKey": null
};

export default node;
