/**
 * @generated SignedSource<<fcccef457961a66b7d73bda81b69a305>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RangeAttribute__id$data = {
  readonly id: string;
  readonly " $fragmentType": "RangeAttribute__id";
};
export type RangeAttribute__id$key = {
  readonly " $data"?: RangeAttribute__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"RangeAttribute__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RangeAttribute__id",
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
  "type": "RangeAttribute",
  "abstractKey": null
};

export default node;
