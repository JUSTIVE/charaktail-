/**
 * @generated SignedSource<<15ddbf6be358a55bbed6086092581bea>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { color as attributeColorResolverType } from "../graph/attribute";
// Type assertion validating that `attributeColorResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeColorResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { editable as attributeEditableResolverType } from "../graph/attribute";
// Type assertion validating that `attributeEditableResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeEditableResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => boolean | null | undefined);
import { edited as attributeEditedResolverType } from "../graph/attribute";
// Type assertion validating that `attributeEditedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeEditedResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
import { hasCases as attributeHasCasesResolverType } from "../graph/attribute";
// Type assertion validating that `attributeHasCasesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeHasCasesResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => boolean | null | undefined);
import { key as attributeKeyResolverType } from "../graph/attribute";
// Type assertion validating that `attributeKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeKeyResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { kind as attributeKindResolverType } from "../graph/attribute";
// Type assertion validating that `attributeKindResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeKindResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { label as attributeLabelResolverType } from "../graph/attribute";
// Type assertion validating that `attributeLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeLabelResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { custom as attributeOptionCustomResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionCustomResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionCustomResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => boolean | null | undefined);
import { enabled as attributeOptionEnabledResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionEnabledResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionEnabledResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => boolean | null | undefined);
import { hint as attributeOptionHintResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionHintResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionHintResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { key as attributeOptionKeyResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionKeyResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { label as attributeOptionLabelResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionLabelResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { part as attributeOptionPartResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionPartResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionPartResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
import { swatches as attributeOptionSwatchesResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionSwatchesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionSwatchesResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { options as attributeOptionsResolverType } from "../graph/attribute";
// Type assertion validating that `attributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionsResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption> | null | undefined>);
import { partLabels as attributePartLabelsResolverType } from "../graph/attribute";
// Type assertion validating that `attributePartLabelsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributePartLabelsResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { rangeMax as attributeRangeMaxResolverType } from "../graph/attribute";
// Type assertion validating that `attributeRangeMaxResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeRangeMaxResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number | null | undefined>);
import { rangeMin as attributeRangeMinResolverType } from "../graph/attribute";
// Type assertion validating that `attributeRangeMinResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeRangeMinResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number | null | undefined>);
import { summary as attributeSummaryResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSummaryResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSummaryResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<string | null | undefined>);
import { unit as attributeUnitResolverType } from "../graph/attribute";
// Type assertion validating that `attributeUnitResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeUnitResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { attribute as queryAttributeResolverType } from "../graph/root";
// Type assertion validating that `queryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributeResolverType satisfies (
  args: {
    id: string;
  },
) => {
  readonly id: DataID;
} | null | undefined);
import { AttributeOption } from "../graph/attributeOption";
export type ValuesSheetQuery$variables = {
  id: string;
};
export type ValuesSheetQuery$data = {
  readonly attribute: {
    readonly color: string | null | undefined;
    readonly editable: boolean | null | undefined;
    readonly edited: boolean | null | undefined;
    readonly hasCases: boolean | null | undefined;
    readonly key: string | null | undefined;
    readonly kind: string | null | undefined;
    readonly label: string | null | undefined;
    readonly options: ReadonlyArray<{
      readonly custom: boolean | null | undefined;
      readonly enabled: boolean | null | undefined;
      readonly hint: string | null | undefined;
      readonly key: string | null | undefined;
      readonly label: string | null | undefined;
      readonly part: number | null | undefined;
      readonly swatches: ReadonlyArray<string> | null | undefined;
    }> | null | undefined;
    readonly partLabels: ReadonlyArray<string> | null | undefined;
    readonly rangeMax: number | null | undefined;
    readonly rangeMin: number | null | undefined;
    readonly summary: string | null | undefined;
    readonly unit: string | null | undefined;
  } | null | undefined;
};
export type ValuesSheetQuery = {
  response: ValuesSheetQuery$data;
  variables: ValuesSheetQuery$variables;
};

import {Attribute as attributeRelayModelInstanceResolver} from '../graph/attribute';
import {color as attributeColorResolver} from '../graph/attribute';
import {editable as attributeEditableResolver} from '../graph/attribute';
import {edited as attributeEditedResolver} from '../graph/attribute';
import {hasCases as attributeHasCasesResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {kind as attributeKindResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {options as attributeOptionsResolver} from '../graph/attribute';
import {partLabels as attributePartLabelsResolver} from '../graph/attribute';
import {rangeMax as attributeRangeMaxResolver} from '../graph/attribute';
import {rangeMin as attributeRangeMinResolver} from '../graph/attribute';
import {summary as attributeSummaryResolver} from '../graph/attribute';
import {unit as attributeUnitResolver} from '../graph/attribute';
import {custom as attributeOptionCustomResolver} from '../graph/attributeOption';
import {enabled as attributeOptionEnabledResolver} from '../graph/attributeOption';
import {hint as attributeOptionHintResolver} from '../graph/attributeOption';
import {key as attributeOptionKeyResolver} from '../graph/attributeOption';
import {label as attributeOptionLabelResolver} from '../graph/attributeOption';
import {part as attributeOptionPartResolver} from '../graph/attributeOption';
import {swatches as attributeOptionSwatchesResolver} from '../graph/attributeOption';
import {attribute as queryAttributeResolver} from '../graph/root';
import AttributeOption____relay_model_instance_graphql from './AttributeOption____relay_model_instance.graphql';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "AttributeOption____relay_model_instance"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          (v4/*:: as any*/)
        ],
        "type": "Attribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "Attribute",
  "abstractKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__relay_model_instance",
      "storageKey": null
    }
  ],
  "type": "AttributeOption",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "ValuesSheetQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "Attribute",
        "modelResolvers": {
          "Attribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Attribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(Attribute__id_graphql, attributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "name": "attribute",
          "resolverModule": queryAttributeResolver,
          "path": "attribute"
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
              "path": "attribute.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "attribute.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "attribute.color"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "kind",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKindResolver, '__relay_model_instance', true),
              "path": "attribute.kind"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "editable",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeEditableResolver, '__relay_model_instance', true),
              "path": "attribute.editable"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "edited",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeEditedResolver, '__relay_model_instance', true),
              "path": "attribute.edited"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "summary",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSummaryResolver, '__relay_model_instance', true),
              "path": "attribute.summary"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "rangeMin",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeRangeMinResolver, '__relay_model_instance', true),
              "path": "attribute.rangeMin"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "rangeMax",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeRangeMaxResolver, '__relay_model_instance', true),
              "path": "attribute.rangeMax"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "unit",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeUnitResolver, '__relay_model_instance', true),
              "path": "attribute.unit"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "hasCases",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeHasCasesResolver, '__relay_model_instance', true),
              "path": "attribute.hasCases"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v2/*:: as any*/),
              "kind": "RelayResolver",
              "name": "partLabels",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributePartLabelsResolver, '__relay_model_instance', true),
              "path": "attribute.partLabels"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "AttributeOption",
              "modelResolvers": null,
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v2/*:: as any*/),
                "kind": "RelayLiveResolver",
                "name": "options",
                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeOptionsResolver, '__relay_model_instance', true),
                "path": "attribute.options",
                "normalizationInfo": {
                  "kind": "WeakModel",
                  "concreteType": "AttributeOption",
                  "plural": true
                }
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "AttributeOption",
                "kind": "LinkedField",
                "name": "options",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "key",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
                    "path": "attribute.options.key"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "label",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
                    "path": "attribute.options.label"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "hint",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHintResolver, '__relay_model_instance', true),
                    "path": "attribute.options.hint"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "part",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionPartResolver, '__relay_model_instance', true),
                    "path": "attribute.options.part"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "enabled",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionEnabledResolver, '__relay_model_instance', true),
                    "path": "attribute.options.enabled"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "custom",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionCustomResolver, '__relay_model_instance', true),
                    "path": "attribute.options.custom"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "swatches",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionSwatchesResolver, '__relay_model_instance', true),
                    "path": "attribute.options.swatches"
                  }
                ],
                "storageKey": null
              }
            }
          ],
          "storageKey": null
        }
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ValuesSheetQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "attribute",
          "args": (v1/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": (v1/*:: as any*/),
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            {
              "name": "key",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "label",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "color",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "kind",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "editable",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "edited",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "summary",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "rangeMin",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "rangeMax",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "unit",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "hasCases",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "partLabels",
              "args": null,
              "fragment": (v5/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "options",
                "args": null,
                "fragment": (v5/*:: as any*/),
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": true
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "AttributeOption",
                "kind": "LinkedField",
                "name": "options",
                "plural": true,
                "selections": [
                  {
                    "name": "key",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "label",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "hint",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "part",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "enabled",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "custom",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "swatches",
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  }
                ],
                "storageKey": null
              }
            },
            (v4/*:: as any*/)
          ],
          "storageKey": null
        }
      }
    ]
  },
  "params": {
    "cacheID": "d1fa1c9a17f1f71caa3d49b233335fdb",
    "id": null,
    "metadata": {},
    "name": "ValuesSheetQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "67654b9cdfd91d9138ab5b9027e0bf10";

export default node;
