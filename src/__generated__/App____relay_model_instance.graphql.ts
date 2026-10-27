/**
 * @generated SignedSource<<19161c95ee5aaeecfc21a7309ec32c3c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { App as appRelayModelInstanceResolverType } from "../graph/appStatus";
// Type assertion validating that `appRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(appRelayModelInstanceResolverType satisfies (
  id: App__id$data['id'],
) => unknown);
export type App____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof appRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "App____relay_model_instance";
};
export type App____relay_model_instance$key = {
  readonly " $data"?: App____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"App____relay_model_instance">;
};

import {App as appRelayModelInstanceResolver} from '../graph/appStatus';
import App__id_graphql from './App__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "App____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "App__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(App__id_graphql, appRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "App",
  "abstractKey": null
};

export default node;
