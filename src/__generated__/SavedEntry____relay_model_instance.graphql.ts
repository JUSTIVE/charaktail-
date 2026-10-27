/**
 * @generated SignedSource<<df5c6ddd4d30a1f76675665bbee8711f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { SavedEntry } from "../graph/root";
import { FragmentRefs } from "relay-runtime";
export type SavedEntry____relay_model_instance$data = {
  readonly __relay_model_instance: SavedEntry;
  readonly " $fragmentType": "SavedEntry____relay_model_instance";
};
export type SavedEntry____relay_model_instance$key = {
  readonly " $data"?: SavedEntry____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedEntry____relay_model_instance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedEntry____relay_model_instance",
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
  "type": "SavedEntry",
  "abstractKey": null
};

export default node;
