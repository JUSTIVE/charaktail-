/**
 * @generated SignedSource<<ed06bd5a5e2d43fe9aab8eea3e9c5a54>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatsAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "StatsAttribute__id";
};
export type StatsAttribute__id$key = {
  readonly " $data"?: StatsAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"StatsAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatsAttribute__id",
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
  "type": "StatsAttribute",
  "abstractKey": null
};

export default node;
