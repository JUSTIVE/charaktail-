/**
 * @generated SignedSource<<f1733d41915e3cb1b6bbb685bb74778c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type attributeHead_attribute$data = {
  readonly __typename: string;
  readonly color?: string;
  readonly edited?: boolean;
  readonly key?: string;
  readonly label?: string;
  readonly locked?: boolean;
  readonly selected?: boolean;
  readonly summary?: string;
  readonly " $fragmentType": "attributeHead_attribute";
};
export type attributeHead_attribute$key = {
  readonly " $data"?: attributeHead_attribute$data;
  readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
};

const node: ReaderInlineDataFragment = {
  "kind": "InlineDataFragment",
  "name": "attributeHead_attribute"
};

(node as any).hash = "b1c6f0c46d2837ead9c05b3062089cbc";

export default node;
