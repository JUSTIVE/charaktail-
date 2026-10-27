/**
 * @generated SignedSource<<2d5b43437b8fe057868fd70cc5a384f6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { StageStatus as stageStatusRelayModelInstanceResolverType } from "../graph/stageStatus";
// Type assertion validating that `stageStatusRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(stageStatusRelayModelInstanceResolverType satisfies (
  id: StageStatus__id$data['id'],
) => unknown);
export type StageStatus____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof stageStatusRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "StageStatus____relay_model_instance";
};
export type StageStatus____relay_model_instance$key = {
  readonly " $data"?: StageStatus____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"StageStatus____relay_model_instance">;
};

import {StageStatus as stageStatusRelayModelInstanceResolver} from '../graph/stageStatus';
import StageStatus__id_graphql from './StageStatus__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StageStatus____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StageStatus__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(StageStatus__id_graphql, stageStatusRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "StageStatus",
  "abstractKey": null
};

export default node;
