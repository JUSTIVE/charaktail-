/**
 * @generated SignedSource<<668a05be59beffdd54f38fedd2da9dd2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StageStatus__id$data = {
  readonly id: string;
  readonly " $fragmentType": "StageStatus__id";
};
export type StageStatus__id$key = {
  readonly " $data"?: StageStatus__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"StageStatus__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StageStatus__id",
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
  "type": "StageStatus",
  "abstractKey": null
};

export default node;
