/**
 * @generated SignedSource<<69dc0837749108b1d3e55724b3fa838f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { SpeciesRange } from "../graph/speciesRange";
import { FragmentRefs } from "relay-runtime";
export type SpeciesRange____relay_model_instance$data = {
  readonly __relay_model_instance: SpeciesRange;
  readonly " $fragmentType": "SpeciesRange____relay_model_instance";
};
export type SpeciesRange____relay_model_instance$key = {
  readonly " $data"?: SpeciesRange____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpeciesRange____relay_model_instance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpeciesRange____relay_model_instance",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__relay_model_instance",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "SpeciesRange",
  "abstractKey": null
};

export default node;
