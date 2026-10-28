/**
 * @generated SignedSource<<fa1d9c1c857ae648ba69c66b805733ce>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { DateAttribute as dateAttributeRelayModelInstanceResolverType } from "../graph/kinds/dateAttribute";
// Type assertion validating that `dateAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(dateAttributeRelayModelInstanceResolverType satisfies (
  id: DateAttribute__id$data['id'],
) => unknown);
export type DateAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof dateAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "DateAttribute____relay_model_instance";
};
export type DateAttribute____relay_model_instance$key = {
  readonly " $data"?: DateAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"DateAttribute____relay_model_instance">;
};

import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import DateAttribute__id_graphql from './DateAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DateAttribute____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "DateAttribute__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(DateAttribute__id_graphql, dateAttributeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "DateAttribute",
  "abstractKey": null
};

export default node;
