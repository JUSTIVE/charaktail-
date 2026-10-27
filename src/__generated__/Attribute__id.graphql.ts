/**
 * @generated SignedSource<<98d9314817f7d560170b4d346d3588f1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Attribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "Attribute__id";
};
export type Attribute__id$key = {
  readonly " $data"?: Attribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"Attribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Attribute__id",
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
  "type": "Attribute",
  "abstractKey": null
};

export default node;
