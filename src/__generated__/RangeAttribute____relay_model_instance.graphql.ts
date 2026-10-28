/**
 * @generated SignedSource<<f1a57e6b86539033c4e37a2c5b0ae22b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { RangeAttribute as rangeAttributeRelayModelInstanceResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeRelayModelInstanceResolverType satisfies (
  id: RangeAttribute__id$data['id'],
) => unknown);
export type RangeAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof rangeAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "RangeAttribute____relay_model_instance";
};
export type RangeAttribute____relay_model_instance$key = {
  readonly " $data"?: RangeAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"RangeAttribute____relay_model_instance">;
};

import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import RangeAttribute__id_graphql from './RangeAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RangeAttribute____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RangeAttribute__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(RangeAttribute__id_graphql, rangeAttributeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "RangeAttribute",
  "abstractKey": null
};

export default node;
