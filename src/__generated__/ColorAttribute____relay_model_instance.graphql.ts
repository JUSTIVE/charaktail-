/**
 * @generated SignedSource<<e5917afd782f6f8b40caed62c0eab3eb>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { ColorAttribute as colorAttributeRelayModelInstanceResolverType } from "../graph/kinds/colorAttribute";
// Type assertion validating that `colorAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(colorAttributeRelayModelInstanceResolverType satisfies (
  id: ColorAttribute__id$data['id'],
) => unknown);
export type ColorAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof colorAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "ColorAttribute____relay_model_instance";
};
export type ColorAttribute____relay_model_instance$key = {
  readonly " $data"?: ColorAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"ColorAttribute____relay_model_instance">;
};

import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import ColorAttribute__id_graphql from './ColorAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ColorAttribute____relay_model_instance",
  "selections": [
    {
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
      "path": "__relay_model_instance"
    }
  ],
  "type": "ColorAttribute",
  "abstractKey": null
};

export default node;
