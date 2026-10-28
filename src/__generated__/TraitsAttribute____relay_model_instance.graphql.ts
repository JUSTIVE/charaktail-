/**
 * @generated SignedSource<<28a30a3ae362e77a5720402791d49fee>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { TraitsAttribute as traitsAttributeRelayModelInstanceResolverType } from "../graph/kinds/traitsAttribute";
// Type assertion validating that `traitsAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(traitsAttributeRelayModelInstanceResolverType satisfies (
  id: TraitsAttribute__id$data['id'],
) => unknown);
export type TraitsAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof traitsAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "TraitsAttribute____relay_model_instance";
};
export type TraitsAttribute____relay_model_instance$key = {
  readonly " $data"?: TraitsAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"TraitsAttribute____relay_model_instance">;
};

import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TraitsAttribute____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "TraitsAttribute__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(TraitsAttribute__id_graphql, traitsAttributeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "TraitsAttribute",
  "abstractKey": null
};

export default node;
