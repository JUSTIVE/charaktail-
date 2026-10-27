/**
 * @generated SignedSource<<cf663e8f0ed25f1b34b51af49d6e6ef9>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Draft__id$data = {
  readonly id: string;
  readonly " $fragmentType": "Draft__id";
};
export type Draft__id$key = {
  readonly " $data"?: Draft__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"Draft__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Draft__id",
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
  "type": "Draft",
  "abstractKey": null
};

export default node;
