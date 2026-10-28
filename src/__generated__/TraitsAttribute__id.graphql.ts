/**
 * @generated SignedSource<<4658a91194b2e1ab7c5f5bceec872a58>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TraitsAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "TraitsAttribute__id";
};
export type TraitsAttribute__id$key = {
  readonly " $data"?: TraitsAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"TraitsAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TraitsAttribute__id",
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
  "type": "TraitsAttribute",
  "abstractKey": null
};

export default node;
