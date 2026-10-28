/**
 * @generated SignedSource<<d39aea78229579466a4ec385fbf8a6cf>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { StatsAttribute as statsAttributeRelayModelInstanceResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeRelayModelInstanceResolverType satisfies (
  id: StatsAttribute__id$data['id'],
) => unknown);
export type StatsAttribute____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof statsAttributeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "StatsAttribute____relay_model_instance";
};
export type StatsAttribute____relay_model_instance$key = {
  readonly " $data"?: StatsAttribute____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatsAttribute____relay_model_instance">;
};

import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatsAttribute____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StatsAttribute__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(StatsAttribute__id_graphql, statsAttributeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "StatsAttribute",
  "abstractKey": null
};

export default node;
