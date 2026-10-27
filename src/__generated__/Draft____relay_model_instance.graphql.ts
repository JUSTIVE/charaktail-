/**
 * @generated SignedSource<<614fe7fbb816dc9b83c13cacdde927df>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { Draft as draftRelayModelInstanceResolverType } from "../graph/draft";
// Type assertion validating that `draftRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(draftRelayModelInstanceResolverType satisfies (
  id: Draft__id$data['id'],
) => unknown);
export type Draft____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof draftRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "Draft____relay_model_instance";
};
export type Draft____relay_model_instance$key = {
  readonly " $data"?: Draft____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"Draft____relay_model_instance">;
};

import {Draft as draftRelayModelInstanceResolver} from '../graph/draft';
import Draft__id_graphql from './Draft__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Draft____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Draft__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(Draft__id_graphql, draftRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "Draft",
  "abstractKey": null
};

export default node;
