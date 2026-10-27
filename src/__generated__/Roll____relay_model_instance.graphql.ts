/**
 * @generated SignedSource<<c0a6327a6ec34d462a7fb52c4b31148c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { Roll as rollRelayModelInstanceResolverType } from "../graph/roll";
// Type assertion validating that `rollRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollRelayModelInstanceResolverType satisfies (
  id: Roll__id$data['id'],
) => unknown);
export type Roll____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof rollRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "Roll____relay_model_instance";
};
export type Roll____relay_model_instance$key = {
  readonly " $data"?: Roll____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"Roll____relay_model_instance">;
};

import {Roll as rollRelayModelInstanceResolver} from '../graph/roll';
import Roll__id_graphql from './Roll__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Roll____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Roll__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(Roll__id_graphql, rollRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "Roll",
  "abstractKey": null
};

export default node;
