/**
 * @generated SignedSource<<21918a7c18e85804744c9e0d1d676d0d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PickAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "PickAttribute__id";
};
export type PickAttribute__id$key = {
  readonly " $data"?: PickAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"PickAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PickAttribute__id",
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
  "type": "PickAttribute",
  "abstractKey": null
};

export default node;
