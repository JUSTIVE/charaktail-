/**
 * @generated SignedSource<<1f610c5d0d371a30ee864a6afde1b64c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ComposeAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "ComposeAttribute__id";
};
export type ComposeAttribute__id$key = {
  readonly " $data"?: ComposeAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"ComposeAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ComposeAttribute__id",
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
  "type": "ComposeAttribute",
  "abstractKey": null
};

export default node;
