/**
 * @generated SignedSource<<8991027af410c248f8b30bb13035a837>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { PickAttribute as pickAttributeRelayModelInstanceResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeRelayModelInstanceResolverType satisfies (
  id: PickAttribute__id$data['id'],
) => unknown);
export type PickAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof pickAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "PickAttribute____relay_model_instance";
};
export type PickAttribute____relay_model_instance$key = {
  readonly " $data"?: PickAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"PickAttribute____relay_model_instance">;
};

import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import PickAttribute__id_graphql from './PickAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PickAttribute____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PickAttribute__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(PickAttribute__id_graphql, pickAttributeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "PickAttribute",
  "abstractKey": null
};

export default node;
