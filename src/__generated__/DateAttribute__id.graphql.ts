/**
 * @generated SignedSource<<7ac0a88a087987969b9deb1b2065ddfc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DateAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "DateAttribute__id";
};
export type DateAttribute__id$key = {
  readonly " $data"?: DateAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"DateAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DateAttribute__id",
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
  "type": "DateAttribute",
  "abstractKey": null
};

export default node;
