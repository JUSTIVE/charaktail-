/**
 * @generated SignedSource<<2b697b76b93976fb0b0a1f98a5556718>>
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
import { dependsOnSpecies as attributeDependsOnSpeciesResolverType } from "../graph/attribute";
// Type assertion validating that `attributeDependsOnSpeciesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeDependsOnSpeciesResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => boolean | null | undefined);
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
import { groupBy as attributeGroupByResolverType } from "../graph/attribute";
// Type assertion validating that `attributeGroupByResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeGroupByResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly id: DataID;
} | null | undefined);
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
import { locked as attributeLockedResolverType } from "../graph/attribute";
// Type assertion validating that `attributeLockedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeLockedResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<boolean | null | undefined>);
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
import { groups as attributeOptionGroupsResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionGroupsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionGroupsResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
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
import { speciesRanges as attributeSpeciesRangesResolverType } from "../graph/attribute";
// Type assertion validating that `attributeSpeciesRangesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeSpeciesRangesResolverType satisfies (
  __relay_model_instance: Attribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<SpeciesRange> | null | undefined>);
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
import { bands as speciesRangeBandsResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeBandsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeBandsResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string> | null | undefined);
import { span as speciesRangeSpanResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpanResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpanResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { speciesHint as speciesRangeSpeciesHintResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpeciesHintResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpeciesHintResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { speciesKey as speciesRangeSpeciesKeyResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpeciesKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpeciesKeyResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { speciesLabel as speciesRangeSpeciesLabelResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpeciesLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpeciesLabelResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { AttributeOption } from "../graph/attributeOption";
import { SpeciesRange } from "../graph/speciesRange";
export type ValuesSheetQuery$variables = {
  id: string;
};
export type ValuesSheetQuery$data = {
  readonly attribute: {
    readonly color: string | null | undefined;
    readonly dependsOnSpecies: boolean | null | undefined;
    readonly editable: boolean | null | undefined;
    readonly edited: boolean | null | undefined;
    readonly groupBy: {
      readonly key: string | null | undefined;
      readonly label: string | null | undefined;
      readonly options: ReadonlyArray<{
        readonly enabled: boolean | null | undefined;
        readonly hint: string | null | undefined;
        readonly key: string | null | undefined;
        readonly label: string | null | undefined;
      }> | null | undefined;
    } | null | undefined;
    readonly hasCases: boolean | null | undefined;
    readonly key: string | null | undefined;
    readonly kind: string | null | undefined;
    readonly label: string | null | undefined;
    readonly locked: boolean | null | undefined;
    readonly options: ReadonlyArray<{
      readonly custom: boolean | null | undefined;
      readonly enabled: boolean | null | undefined;
      readonly groups: ReadonlyArray<string> | null | undefined;
      readonly hint: string | null | undefined;
      readonly key: string | null | undefined;
      readonly label: string | null | undefined;
      readonly part: number | null | undefined;
      readonly swatches: ReadonlyArray<string> | null | undefined;
    }> | null | undefined;
    readonly partLabels: ReadonlyArray<string> | null | undefined;
    readonly rangeMax: number | null | undefined;
    readonly rangeMin: number | null | undefined;
    readonly speciesRanges: ReadonlyArray<{
      readonly bands: ReadonlyArray<string> | null | undefined;
      readonly span: string | null | undefined;
      readonly speciesHint: string | null | undefined;
      readonly speciesKey: string | null | undefined;
      readonly speciesLabel: string | null | undefined;
    }> | null | undefined;
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
import {dependsOnSpecies as attributeDependsOnSpeciesResolver} from '../graph/attribute';
import {editable as attributeEditableResolver} from '../graph/attribute';
import {edited as attributeEditedResolver} from '../graph/attribute';
import {groupBy as attributeGroupByResolver} from '../graph/attribute';
import {hasCases as attributeHasCasesResolver} from '../graph/attribute';
import {key as attributeKeyResolver} from '../graph/attribute';
import {kind as attributeKindResolver} from '../graph/attribute';
import {label as attributeLabelResolver} from '../graph/attribute';
import {locked as attributeLockedResolver} from '../graph/attribute';
import {options as attributeOptionsResolver} from '../graph/attribute';
import {partLabels as attributePartLabelsResolver} from '../graph/attribute';
import {rangeMax as attributeRangeMaxResolver} from '../graph/attribute';
import {rangeMin as attributeRangeMinResolver} from '../graph/attribute';
import {speciesRanges as attributeSpeciesRangesResolver} from '../graph/attribute';
import {summary as attributeSummaryResolver} from '../graph/attribute';
import {unit as attributeUnitResolver} from '../graph/attribute';
import {custom as attributeOptionCustomResolver} from '../graph/attributeOption';
import {enabled as attributeOptionEnabledResolver} from '../graph/attributeOption';
import {groups as attributeOptionGroupsResolver} from '../graph/attributeOption';
import {hint as attributeOptionHintResolver} from '../graph/attributeOption';
import {key as attributeOptionKeyResolver} from '../graph/attributeOption';
import {label as attributeOptionLabelResolver} from '../graph/attributeOption';
import {part as attributeOptionPartResolver} from '../graph/attributeOption';
import {swatches as attributeOptionSwatchesResolver} from '../graph/attributeOption';
import {attribute as queryAttributeResolver} from '../graph/root';
import {bands as speciesRangeBandsResolver} from '../graph/speciesRange';
import {span as speciesRangeSpanResolver} from '../graph/speciesRange';
import {speciesHint as speciesRangeSpeciesHintResolver} from '../graph/speciesRange';
import {speciesKey as speciesRangeSpeciesKeyResolver} from '../graph/speciesRange';
import {speciesLabel as speciesRangeSpeciesLabelResolver} from '../graph/speciesRange';
import AttributeOption____relay_model_instance_graphql from './AttributeOption____relay_model_instance.graphql';
import Attribute____relay_model_instance_graphql from './Attribute____relay_model_instance.graphql';
import Attribute__id_graphql from './Attribute__id.graphql';
import SpeciesRange____relay_model_instance_graphql from './SpeciesRange____relay_model_instance.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute__id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Attribute____relay_model_instance"
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SpeciesRange____relay_model_instance"
},
v5 = {
  "kind": "WeakModel",
  "concreteType": "AttributeOption",
  "plural": true
},
v6 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "AttributeOption____relay_model_instance"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          (v7/*:: as any*/)
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
v9 = {
  "name": "key",
  "args": null,
  "fragment": (v8/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v10 = {
  "name": "label",
  "args": null,
  "fragment": (v8/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__relay_model_instance",
    "storageKey": null
  }
],
v12 = {
  "kind": "InlineFragment",
  "selections": (v11/*:: as any*/),
  "type": "SpeciesRange",
  "abstractKey": null
},
v13 = {
  "name": "options",
  "args": null,
  "fragment": (v8/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v14 = {
  "kind": "InlineFragment",
  "selections": (v11/*:: as any*/),
  "type": "AttributeOption",
  "abstractKey": null
},
v15 = {
  "name": "key",
  "args": null,
  "fragment": (v14/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v16 = {
  "name": "label",
  "args": null,
  "fragment": (v14/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v17 = {
  "name": "hint",
  "args": null,
  "fragment": (v14/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v18 = {
  "name": "enabled",
  "args": null,
  "fragment": (v14/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
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
            "fragment": (v1/*:: as any*/),
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(Attribute__id_graphql, attributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          }
        },
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": (v2/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "name": "attribute",
          "resolverModule": queryAttributeResolver,
          "path": "attribute"
        },
        "linkedField": {
          "alias": null,
          "args": (v2/*:: as any*/),
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
              "path": "attribute.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "label",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
              "path": "attribute.label"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "color",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeColorResolver, '__relay_model_instance', true),
              "path": "attribute.color"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "kind",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKindResolver, '__relay_model_instance', true),
              "path": "attribute.kind"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "editable",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeEditableResolver, '__relay_model_instance', true),
              "path": "attribute.editable"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "edited",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeEditedResolver, '__relay_model_instance', true),
              "path": "attribute.edited"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "summary",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSummaryResolver, '__relay_model_instance', true),
              "path": "attribute.summary"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "rangeMin",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeRangeMinResolver, '__relay_model_instance', true),
              "path": "attribute.rangeMin"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "rangeMax",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeRangeMaxResolver, '__relay_model_instance', true),
              "path": "attribute.rangeMax"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "unit",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeUnitResolver, '__relay_model_instance', true),
              "path": "attribute.unit"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "hasCases",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeHasCasesResolver, '__relay_model_instance', true),
              "path": "attribute.hasCases"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "dependsOnSpecies",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeDependsOnSpeciesResolver, '__relay_model_instance', true),
              "path": "attribute.dependsOnSpecies"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "locked",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLockedResolver, '__relay_model_instance', true),
              "path": "attribute.locked"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "SpeciesRange",
              "modelResolvers": null,
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v3/*:: as any*/),
                "kind": "RelayLiveResolver",
                "name": "speciesRanges",
                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeSpeciesRangesResolver, '__relay_model_instance', true),
                "path": "attribute.speciesRanges",
                "normalizationInfo": {
                  "kind": "WeakModel",
                  "concreteType": "SpeciesRange",
                  "plural": true
                }
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "SpeciesRange",
                "kind": "LinkedField",
                "name": "speciesRanges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "speciesKey",
                    "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesKeyResolver, '__relay_model_instance', true),
                    "path": "attribute.speciesRanges.speciesKey"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "speciesLabel",
                    "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesLabelResolver, '__relay_model_instance', true),
                    "path": "attribute.speciesRanges.speciesLabel"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "speciesHint",
                    "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesHintResolver, '__relay_model_instance', true),
                    "path": "attribute.speciesRanges.speciesHint"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "span",
                    "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpanResolver, '__relay_model_instance', true),
                    "path": "attribute.speciesRanges.span"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "bands",
                    "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeBandsResolver, '__relay_model_instance', true),
                    "path": "attribute.speciesRanges.bands"
                  }
                ],
                "storageKey": null
              }
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v3/*:: as any*/),
              "kind": "RelayResolver",
              "name": "partLabels",
              "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributePartLabelsResolver, '__relay_model_instance', true),
              "path": "attribute.partLabels"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "Attribute",
              "modelResolvers": {
                "Attribute": {
                  "alias": null,
                  "args": null,
                  "fragment": (v1/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "__relay_model_instance",
                  "resolverModule": resolverDataInjector(Attribute__id_graphql, attributeRelayModelInstanceResolver, 'id', true),
                  "path": "attribute.groupBy.__relay_model_instance"
                }
              },
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v3/*:: as any*/),
                "kind": "RelayResolver",
                "name": "groupBy",
                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeGroupByResolver, '__relay_model_instance', true),
                "path": "attribute.groupBy"
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Attribute",
                "kind": "LinkedField",
                "name": "groupBy",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "key",
                    "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeKeyResolver, '__relay_model_instance', true),
                    "path": "attribute.groupBy.key"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "label",
                    "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeLabelResolver, '__relay_model_instance', true),
                    "path": "attribute.groupBy.label"
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "concreteType": "AttributeOption",
                    "modelResolvers": null,
                    "serverObjectOperations": null,
                    "backingField": {
                      "alias": null,
                      "args": null,
                      "fragment": (v3/*:: as any*/),
                      "kind": "RelayLiveResolver",
                      "name": "options",
                      "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeOptionsResolver, '__relay_model_instance', true),
                      "path": "attribute.groupBy.options",
                      "normalizationInfo": (v5/*:: as any*/)
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
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
                          "path": "attribute.groupBy.options.key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
                          "path": "attribute.groupBy.options.label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "hint",
                          "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHintResolver, '__relay_model_instance', true),
                          "path": "attribute.groupBy.options.hint"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "enabled",
                          "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionEnabledResolver, '__relay_model_instance', true),
                          "path": "attribute.groupBy.options.enabled"
                        }
                      ],
                      "storageKey": null
                    }
                  }
                ],
                "storageKey": null
              }
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "AttributeOption",
              "modelResolvers": null,
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v3/*:: as any*/),
                "kind": "RelayLiveResolver",
                "name": "options",
                "resolverModule": resolverDataInjector(Attribute____relay_model_instance_graphql, attributeOptionsResolver, '__relay_model_instance', true),
                "path": "attribute.options",
                "normalizationInfo": (v5/*:: as any*/)
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
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "key",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
                    "path": "attribute.options.key"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "label",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
                    "path": "attribute.options.label"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "hint",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHintResolver, '__relay_model_instance', true),
                    "path": "attribute.options.hint"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "groups",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionGroupsResolver, '__relay_model_instance', true),
                    "path": "attribute.options.groups"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "part",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionPartResolver, '__relay_model_instance', true),
                    "path": "attribute.options.part"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "enabled",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionEnabledResolver, '__relay_model_instance', true),
                    "path": "attribute.options.enabled"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "custom",
                    "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionCustomResolver, '__relay_model_instance', true),
                    "path": "attribute.options.custom"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v6/*:: as any*/),
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
          "args": (v2/*:: as any*/),
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": false
        },
        "linkedField": {
          "alias": null,
          "args": (v2/*:: as any*/),
          "concreteType": "Attribute",
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            (v9/*:: as any*/),
            (v10/*:: as any*/),
            {
              "name": "color",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "kind",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "editable",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "edited",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "summary",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "rangeMin",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "rangeMax",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "unit",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "hasCases",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "dependsOnSpecies",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "locked",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "speciesRanges",
                "args": null,
                "fragment": (v8/*:: as any*/),
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": true
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "SpeciesRange",
                "kind": "LinkedField",
                "name": "speciesRanges",
                "plural": true,
                "selections": [
                  {
                    "name": "speciesKey",
                    "args": null,
                    "fragment": (v12/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "speciesLabel",
                    "args": null,
                    "fragment": (v12/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "speciesHint",
                    "args": null,
                    "fragment": (v12/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "span",
                    "args": null,
                    "fragment": (v12/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "bands",
                    "args": null,
                    "fragment": (v12/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  }
                ],
                "storageKey": null
              }
            },
            {
              "name": "partLabels",
              "args": null,
              "fragment": (v8/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "groupBy",
                "args": null,
                "fragment": (v8/*:: as any*/),
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": false
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Attribute",
                "kind": "LinkedField",
                "name": "groupBy",
                "plural": false,
                "selections": [
                  (v9/*:: as any*/),
                  (v10/*:: as any*/),
                  {
                    "kind": "ClientEdgeToClientObject",
                    "backingField": (v13/*:: as any*/),
                    "linkedField": {
                      "alias": null,
                      "args": null,
                      "concreteType": "AttributeOption",
                      "kind": "LinkedField",
                      "name": "options",
                      "plural": true,
                      "selections": [
                        (v15/*:: as any*/),
                        (v16/*:: as any*/),
                        (v17/*:: as any*/),
                        (v18/*:: as any*/)
                      ],
                      "storageKey": null
                    }
                  },
                  (v7/*:: as any*/)
                ],
                "storageKey": null
              }
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": (v13/*:: as any*/),
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "AttributeOption",
                "kind": "LinkedField",
                "name": "options",
                "plural": true,
                "selections": [
                  (v15/*:: as any*/),
                  (v16/*:: as any*/),
                  (v17/*:: as any*/),
                  {
                    "name": "groups",
                    "args": null,
                    "fragment": (v14/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "part",
                    "args": null,
                    "fragment": (v14/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  (v18/*:: as any*/),
                  {
                    "name": "custom",
                    "args": null,
                    "fragment": (v14/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "swatches",
                    "args": null,
                    "fragment": (v14/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  }
                ],
                "storageKey": null
              }
            },
            (v7/*:: as any*/)
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

(node as any).hash = "fba4c376320a2d52e07e6e663c062708";

export default node;
