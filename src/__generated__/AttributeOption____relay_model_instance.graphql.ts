/**
 * @generated SignedSource<<34a99532421431f75c20e32a3882cf78>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { AttributeOption } from "../graph/attributeOption";
import { FragmentRefs } from "relay-runtime";
export type AttributeOption____relay_model_instance$data = {
  readonly __relay_model_instance: AttributeOption;
  readonly " $fragmentType": "AttributeOption____relay_model_instance";
};
export type AttributeOption____relay_model_instance$key = {
  readonly " $data"?: AttributeOption____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"AttributeOption____relay_model_instance">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AttributeOption____relay_model_instance",
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
  "type": "AttributeOption",
  "abstractKey": null
};

export default node;
