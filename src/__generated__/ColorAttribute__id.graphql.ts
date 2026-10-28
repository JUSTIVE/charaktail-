/**
 * @generated SignedSource<<7f35b4cf2211947e4b65f6542b36c295>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ColorAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "ColorAttribute__id";
};
export type ColorAttribute__id$key = {
  readonly " $data"?: ColorAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"ColorAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ColorAttribute__id",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "ColorAttribute",
  "abstractKey": null
};

export default node;
