/**
 * @generated SignedSource<<9b8e59a377dd86710fe9c8289d333ccf>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { RollEntry } from "../graph/rollEntry";
import { FragmentRefs } from "relay-runtime";
export type RollEntry____relay_model_instance$data = {
  readonly __relay_model_instance: RollEntry;
  readonly " $fragmentType": "RollEntry____relay_model_instance";
};
export type RollEntry____relay_model_instance$key = {
  readonly " $data"?: RollEntry____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"RollEntry____relay_model_instance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RollEntry____relay_model_instance",
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
  "type": "RollEntry",
  "abstractKey": null
};

export default node;
