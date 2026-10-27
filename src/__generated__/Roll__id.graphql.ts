/**
 * @generated SignedSource<<d849b204789bc0014695c43bfb27ee68>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Roll__id$data = {
  readonly id: string;
  readonly " $fragmentType": "Roll__id";
};
export type Roll__id$key = {
  readonly " $data"?: Roll__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"Roll__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Roll__id",
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
  "type": "Roll",
  "abstractKey": null
};

export default node;
