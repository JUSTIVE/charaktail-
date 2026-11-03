/**
 * @generated SignedSource<<504d33034d3f7daba6fbb16bf8f90de1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderInlineDataFragment } from 'relay-runtime';
import { LiveState, FragmentRefs } from "relay-runtime";
import { head as colorAttributeHeadResolverType } from "../graph/kinds/colorAttribute";
// Type assertion validating that `colorAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(colorAttributeHeadResolverType satisfies (
  __relay_model_instance: ColorAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as composeAttributeHeadResolverType } from "../graph/kinds/composeAttribute";
// Type assertion validating that `composeAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(composeAttributeHeadResolverType satisfies (
  __relay_model_instance: ComposeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as dateAttributeHeadResolverType } from "../graph/kinds/dateAttribute";
// Type assertion validating that `dateAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(dateAttributeHeadResolverType satisfies (
  __relay_model_instance: DateAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as pickAttributeHeadResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeHeadResolverType satisfies (
  __relay_model_instance: PickAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as rangeAttributeHeadResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeHeadResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as statsAttributeHeadResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeHeadResolverType satisfies (
  __relay_model_instance: StatsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
import { head as traitsAttributeHeadResolverType } from "../graph/kinds/traitsAttribute";
// Type assertion validating that `traitsAttributeHeadResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(traitsAttributeHeadResolverType satisfies (
  __relay_model_instance: TraitsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<unknown | null | undefined>);
export type attributeHead_attribute$data = {
  readonly __typename: "ColorAttribute";
  readonly head: ReturnType<ReturnType<typeof colorAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "ComposeAttribute";
  readonly head: ReturnType<ReturnType<typeof composeAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "DateAttribute";
  readonly head: ReturnType<ReturnType<typeof dateAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "PickAttribute";
  readonly head: ReturnType<ReturnType<typeof pickAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "RangeAttribute";
  readonly head: ReturnType<ReturnType<typeof rangeAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "StatsAttribute";
  readonly head: ReturnType<ReturnType<typeof statsAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  readonly __typename: "TraitsAttribute";
  readonly head: ReturnType<ReturnType<typeof traitsAttributeHeadResolverType>["read"]> | null | undefined;
  readonly " $fragmentType": "attributeHead_attribute";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
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

(node as any).hash = "bb2fe5705519cad7033fd15efb351873";

export default node;
