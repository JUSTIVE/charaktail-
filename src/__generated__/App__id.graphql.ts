/**
 * @generated SignedSource<<b51eff10b325506f97c20fdfb7c5708a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type App__id$data = {
  readonly id: string;
  readonly " $fragmentType": "App__id";
};
export type App__id$key = {
  readonly " $data"?: App__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"App__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "App__id",
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
  "type": "App",
  "abstractKey": null
};

export default node;
