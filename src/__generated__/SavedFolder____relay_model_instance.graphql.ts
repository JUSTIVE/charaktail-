/**
 * @generated SignedSource<<f5e7296874c449f8ed6c1a0337d2d0fd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { SavedFolder } from "../graph/root";
import { FragmentRefs } from "relay-runtime";
export type SavedFolder____relay_model_instance$data = {
  readonly __relay_model_instance: SavedFolder;
  readonly " $fragmentType": "SavedFolder____relay_model_instance";
};
export type SavedFolder____relay_model_instance$key = {
  readonly " $data"?: SavedFolder____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedFolder____relay_model_instance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedFolder____relay_model_instance",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__relay_model_instance",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "SavedFolder",
  "abstractKey": null
};

export default node;
