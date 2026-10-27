/**
 * @generated SignedSource<<1c55ac196a92d47784f9776b4f0615eb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { Attribute as attributeRelayModelInstanceResolverType } from "../graph/attribute";
// Type assertion validating that `attributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeRelayModelInstanceResolverType satisfies (
  id: Attribute__id$data['id'],
) => unknown);
export type Attribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof attributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "Attribute____relay_model_instance";
};
export type Attribute____relay_model_instance$key = {
  readonly " $data"?: Attribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"Attribute____relay_model_instance">;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import Attribute__id_graphql from './Attribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Attribute____relay_model_instance",
  "selections": [
    {
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
      "path": "__relay_model_instance"
    }
  ],
  "type": "Attribute",
  "abstractKey": null
};

export default node;
