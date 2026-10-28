/**
 * @generated SignedSource<<1f4da1dacf2bf576f5c56dc863629391>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { custom as attributeOptionCustomResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionCustomResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionCustomResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => boolean);
import { enabled as attributeOptionEnabledResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionEnabledResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionEnabledResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => boolean);
import { groups as attributeOptionGroupsResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionGroupsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionGroupsResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
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
) => string);
import { label as attributeOptionLabelResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionLabelResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => string);
import { part as attributeOptionPartResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionPartResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionPartResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number);
import { swatches as attributeOptionSwatchesResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionSwatchesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionSwatchesResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
import { options as colorAttributeOptionsResolverType } from "../graph/kinds/colorAttribute";
// Type assertion validating that `colorAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(colorAttributeOptionsResolverType satisfies (
  __relay_model_instance: ColorAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { options as composeAttributeOptionsResolverType } from "../graph/kinds/composeAttribute";
// Type assertion validating that `composeAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(composeAttributeOptionsResolverType satisfies (
  __relay_model_instance: ComposeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { partLabels as composeAttributePartLabelsResolverType } from "../graph/kinds/composeAttribute";
// Type assertion validating that `composeAttributePartLabelsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(composeAttributePartLabelsResolverType satisfies (
  __relay_model_instance: ComposeAttribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
import { groupBy as pickAttributeGroupByResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeGroupByResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeGroupByResolverType satisfies (
  __relay_model_instance: PickAttribute____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly id: DataID;
} | null | undefined);
import { key as pickAttributeKeyResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeKeyResolverType satisfies (
  __relay_model_instance: PickAttribute____relay_model_instance$data['__relay_model_instance'],
) => string);
import { label as pickAttributeLabelResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeLabelResolverType satisfies (
  __relay_model_instance: PickAttribute____relay_model_instance$data['__relay_model_instance'],
) => string);
import { options as pickAttributeOptionsResolverType } from "../graph/kinds/pickAttribute";
// Type assertion validating that `pickAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(pickAttributeOptionsResolverType satisfies (
  __relay_model_instance: PickAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { attribute as queryAttributeResolverType } from "../graph/root";
// Type assertion validating that `queryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryAttributeResolverType satisfies (
  args: {
    id: string;
  },
) => {
  readonly __typename: "ColorAttribute" | "ComposeAttribute" | "DateAttribute" | "PickAttribute" | "RangeAttribute" | "StatsAttribute" | "TraitsAttribute";
  readonly id: DataID;
} | null | undefined);
import { dependsOnSpecies as rangeAttributeDependsOnSpeciesResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeDependsOnSpeciesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeDependsOnSpeciesResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => boolean);
import { hasCases as rangeAttributeHasCasesResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeHasCasesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeHasCasesResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => boolean);
import { rangeMax as rangeAttributeRangeMaxResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeRangeMaxResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeRangeMaxResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { rangeMin as rangeAttributeRangeMinResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeRangeMinResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeRangeMinResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { speciesRanges as rangeAttributeSpeciesRangesResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeSpeciesRangesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeSpeciesRangesResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<SpeciesRange>>);
import { unit as rangeAttributeUnitResolverType } from "../graph/kinds/rangeAttribute";
// Type assertion validating that `rangeAttributeUnitResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rangeAttributeUnitResolverType satisfies (
  __relay_model_instance: RangeAttribute____relay_model_instance$data['__relay_model_instance'],
) => string);
import { bands as speciesRangeBandsResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeBandsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeBandsResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
import { span as speciesRangeSpanResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpanResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpanResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string);
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
) => string);
import { speciesLabel as speciesRangeSpeciesLabelResolverType } from "../graph/speciesRange";
// Type assertion validating that `speciesRangeSpeciesLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(speciesRangeSpeciesLabelResolverType satisfies (
  __relay_model_instance: SpeciesRange____relay_model_instance$data['__relay_model_instance'],
) => string);
import { options as statsAttributeOptionsResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeOptionsResolverType satisfies (
  __relay_model_instance: StatsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { rangeMax as statsAttributeRangeMaxResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeRangeMaxResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeRangeMaxResolverType satisfies (
  __relay_model_instance: StatsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { rangeMin as statsAttributeRangeMinResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeRangeMinResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeRangeMinResolverType satisfies (
  __relay_model_instance: StatsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { AttributeOption } from "../graph/attributeOption";
import { SpeciesRange } from "../graph/speciesRange";
export type ValuesSheetQuery$variables = {
  id: string;
};
export type ValuesSheetQuery$data = {
  readonly attribute: {
    readonly __typename: string;
    readonly dependsOnSpecies?: boolean;
    readonly groupBy?: {
      readonly key: string;
      readonly label: string;
      readonly options: ReadonlyArray<{
        readonly enabled: boolean;
        readonly hint: string | null | undefined;
        readonly key: string;
        readonly label: string;
      }>;
    } | null | undefined;
    readonly hasCases?: boolean;
    readonly options?: ReadonlyArray<{
      readonly custom: boolean;
      readonly enabled: boolean;
      readonly groups: ReadonlyArray<string>;
      readonly hint: string | null | undefined;
      readonly key: string;
      readonly label: string;
      readonly part: number;
      readonly swatches: ReadonlyArray<string>;
    }>;
    readonly partLabels?: ReadonlyArray<string>;
    readonly rangeMax?: number;
    readonly rangeMin?: number;
    readonly speciesRanges?: ReadonlyArray<{
      readonly bands: ReadonlyArray<string>;
      readonly span: string;
      readonly speciesHint: string | null | undefined;
      readonly speciesKey: string;
      readonly speciesLabel: string;
    }>;
    readonly unit?: string;
    readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
  } | null | undefined;
};
export type ValuesSheetQuery = {
  response: ValuesSheetQuery$data;
  variables: ValuesSheetQuery$variables;
};

import {custom as attributeOptionCustomResolver} from '../graph/attributeOption';
import {enabled as attributeOptionEnabledResolver} from '../graph/attributeOption';
import {groups as attributeOptionGroupsResolver} from '../graph/attributeOption';
import {hint as attributeOptionHintResolver} from '../graph/attributeOption';
import {key as attributeOptionKeyResolver} from '../graph/attributeOption';
import {label as attributeOptionLabelResolver} from '../graph/attributeOption';
import {part as attributeOptionPartResolver} from '../graph/attributeOption';
import {swatches as attributeOptionSwatchesResolver} from '../graph/attributeOption';
import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {color as colorAttributeColorResolver} from '../graph/kinds/colorAttribute';
import {edited as colorAttributeEditedResolver} from '../graph/kinds/colorAttribute';
import {key as colorAttributeKeyResolver} from '../graph/kinds/colorAttribute';
import {label as colorAttributeLabelResolver} from '../graph/kinds/colorAttribute';
import {locked as colorAttributeLockedResolver} from '../graph/kinds/colorAttribute';
import {options as colorAttributeOptionsResolver} from '../graph/kinds/colorAttribute';
import {selected as colorAttributeSelectedResolver} from '../graph/kinds/colorAttribute';
import {summary as colorAttributeSummaryResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {color as composeAttributeColorResolver} from '../graph/kinds/composeAttribute';
import {edited as composeAttributeEditedResolver} from '../graph/kinds/composeAttribute';
import {key as composeAttributeKeyResolver} from '../graph/kinds/composeAttribute';
import {label as composeAttributeLabelResolver} from '../graph/kinds/composeAttribute';
import {locked as composeAttributeLockedResolver} from '../graph/kinds/composeAttribute';
import {options as composeAttributeOptionsResolver} from '../graph/kinds/composeAttribute';
import {partLabels as composeAttributePartLabelsResolver} from '../graph/kinds/composeAttribute';
import {selected as composeAttributeSelectedResolver} from '../graph/kinds/composeAttribute';
import {summary as composeAttributeSummaryResolver} from '../graph/kinds/composeAttribute';
import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import {color as dateAttributeColorResolver} from '../graph/kinds/dateAttribute';
import {edited as dateAttributeEditedResolver} from '../graph/kinds/dateAttribute';
import {key as dateAttributeKeyResolver} from '../graph/kinds/dateAttribute';
import {label as dateAttributeLabelResolver} from '../graph/kinds/dateAttribute';
import {locked as dateAttributeLockedResolver} from '../graph/kinds/dateAttribute';
import {selected as dateAttributeSelectedResolver} from '../graph/kinds/dateAttribute';
import {summary as dateAttributeSummaryResolver} from '../graph/kinds/dateAttribute';
import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import {color as pickAttributeColorResolver} from '../graph/kinds/pickAttribute';
import {edited as pickAttributeEditedResolver} from '../graph/kinds/pickAttribute';
import {groupBy as pickAttributeGroupByResolver} from '../graph/kinds/pickAttribute';
import {key as pickAttributeKeyResolver} from '../graph/kinds/pickAttribute';
import {label as pickAttributeLabelResolver} from '../graph/kinds/pickAttribute';
import {locked as pickAttributeLockedResolver} from '../graph/kinds/pickAttribute';
import {options as pickAttributeOptionsResolver} from '../graph/kinds/pickAttribute';
import {selected as pickAttributeSelectedResolver} from '../graph/kinds/pickAttribute';
import {summary as pickAttributeSummaryResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {color as rangeAttributeColorResolver} from '../graph/kinds/rangeAttribute';
import {dependsOnSpecies as rangeAttributeDependsOnSpeciesResolver} from '../graph/kinds/rangeAttribute';
import {edited as rangeAttributeEditedResolver} from '../graph/kinds/rangeAttribute';
import {hasCases as rangeAttributeHasCasesResolver} from '../graph/kinds/rangeAttribute';
import {key as rangeAttributeKeyResolver} from '../graph/kinds/rangeAttribute';
import {label as rangeAttributeLabelResolver} from '../graph/kinds/rangeAttribute';
import {locked as rangeAttributeLockedResolver} from '../graph/kinds/rangeAttribute';
import {rangeMax as rangeAttributeRangeMaxResolver} from '../graph/kinds/rangeAttribute';
import {rangeMin as rangeAttributeRangeMinResolver} from '../graph/kinds/rangeAttribute';
import {selected as rangeAttributeSelectedResolver} from '../graph/kinds/rangeAttribute';
import {speciesRanges as rangeAttributeSpeciesRangesResolver} from '../graph/kinds/rangeAttribute';
import {summary as rangeAttributeSummaryResolver} from '../graph/kinds/rangeAttribute';
import {unit as rangeAttributeUnitResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {color as statsAttributeColorResolver} from '../graph/kinds/statsAttribute';
import {edited as statsAttributeEditedResolver} from '../graph/kinds/statsAttribute';
import {key as statsAttributeKeyResolver} from '../graph/kinds/statsAttribute';
import {label as statsAttributeLabelResolver} from '../graph/kinds/statsAttribute';
import {locked as statsAttributeLockedResolver} from '../graph/kinds/statsAttribute';
import {options as statsAttributeOptionsResolver} from '../graph/kinds/statsAttribute';
import {rangeMax as statsAttributeRangeMaxResolver} from '../graph/kinds/statsAttribute';
import {rangeMin as statsAttributeRangeMinResolver} from '../graph/kinds/statsAttribute';
import {selected as statsAttributeSelectedResolver} from '../graph/kinds/statsAttribute';
import {summary as statsAttributeSummaryResolver} from '../graph/kinds/statsAttribute';
import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import {color as traitsAttributeColorResolver} from '../graph/kinds/traitsAttribute';
import {edited as traitsAttributeEditedResolver} from '../graph/kinds/traitsAttribute';
import {key as traitsAttributeKeyResolver} from '../graph/kinds/traitsAttribute';
import {label as traitsAttributeLabelResolver} from '../graph/kinds/traitsAttribute';
import {locked as traitsAttributeLockedResolver} from '../graph/kinds/traitsAttribute';
import {selected as traitsAttributeSelectedResolver} from '../graph/kinds/traitsAttribute';
import {summary as traitsAttributeSummaryResolver} from '../graph/kinds/traitsAttribute';
import {attribute as queryAttributeResolver} from '../graph/root';
import {bands as speciesRangeBandsResolver} from '../graph/speciesRange';
import {span as speciesRangeSpanResolver} from '../graph/speciesRange';
import {speciesHint as speciesRangeSpeciesHintResolver} from '../graph/speciesRange';
import {speciesKey as speciesRangeSpeciesKeyResolver} from '../graph/speciesRange';
import {speciesLabel as speciesRangeSpeciesLabelResolver} from '../graph/speciesRange';
import AttributeOption____relay_model_instance_graphql from './AttributeOption____relay_model_instance.graphql';
import ColorAttribute____relay_model_instance_graphql from './ColorAttribute____relay_model_instance.graphql';
import ColorAttribute__id_graphql from './ColorAttribute__id.graphql';
import ComposeAttribute____relay_model_instance_graphql from './ComposeAttribute____relay_model_instance.graphql';
import ComposeAttribute__id_graphql from './ComposeAttribute__id.graphql';
import DateAttribute____relay_model_instance_graphql from './DateAttribute____relay_model_instance.graphql';
import DateAttribute__id_graphql from './DateAttribute__id.graphql';
import PickAttribute____relay_model_instance_graphql from './PickAttribute____relay_model_instance.graphql';
import PickAttribute__id_graphql from './PickAttribute__id.graphql';
import RangeAttribute____relay_model_instance_graphql from './RangeAttribute____relay_model_instance.graphql';
import RangeAttribute__id_graphql from './RangeAttribute__id.graphql';
import SpeciesRange____relay_model_instance_graphql from './SpeciesRange____relay_model_instance.graphql';
import StatsAttribute____relay_model_instance_graphql from './StatsAttribute____relay_model_instance.graphql';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import TraitsAttribute____relay_model_instance_graphql from './TraitsAttribute____relay_model_instance.graphql';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
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
  "name": "PickAttribute__id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "PickAttribute____relay_model_instance"
},
v5 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ColorAttribute____relay_model_instance"
},
v6 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ComposeAttribute____relay_model_instance"
},
v7 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "StatsAttribute____relay_model_instance"
},
v8 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "RangeAttribute____relay_model_instance"
},
v9 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "DateAttribute____relay_model_instance"
},
v10 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "TraitsAttribute____relay_model_instance"
},
v11 = {
  "kind": "WeakModel",
  "concreteType": "AttributeOption",
  "plural": true
},
v12 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "AttributeOption____relay_model_instance"
},
v13 = {
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
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "key",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
      "path": "attribute.options.key"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "label",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
      "path": "attribute.options.label"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "hint",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHintResolver, '__relay_model_instance', true),
      "path": "attribute.options.hint"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "groups",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionGroupsResolver, '__relay_model_instance', true),
      "path": "attribute.options.groups"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "part",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionPartResolver, '__relay_model_instance', true),
      "path": "attribute.options.part"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "enabled",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionEnabledResolver, '__relay_model_instance', true),
      "path": "attribute.options.enabled"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "custom",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionCustomResolver, '__relay_model_instance', true),
      "path": "attribute.options.custom"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v12/*:: as any*/),
      "kind": "RelayResolver",
      "name": "swatches",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionSwatchesResolver, '__relay_model_instance', true),
      "path": "attribute.options.swatches"
    }
  ],
  "storageKey": null
},
v14 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SpeciesRange____relay_model_instance"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v16 = [
  (v15/*:: as any*/)
],
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "PickAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "PickAttribute",
  "abstractKey": null
},
v18 = {
  "name": "key",
  "args": null,
  "fragment": (v17/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v19 = {
  "name": "label",
  "args": null,
  "fragment": (v17/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v20 = {
  "name": "options",
  "args": null,
  "fragment": (v17/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v21 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__relay_model_instance",
    "storageKey": null
  }
],
v22 = {
  "kind": "InlineFragment",
  "selections": (v21/*:: as any*/),
  "type": "AttributeOption",
  "abstractKey": null
},
v23 = {
  "name": "key",
  "args": null,
  "fragment": (v22/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v24 = {
  "name": "label",
  "args": null,
  "fragment": (v22/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v25 = {
  "name": "hint",
  "args": null,
  "fragment": (v22/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v26 = {
  "name": "enabled",
  "args": null,
  "fragment": (v22/*:: as any*/),
  "kind": "RelayResolver",
  "storageKey": null,
  "isOutputType": true
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributeOption",
  "kind": "LinkedField",
  "name": "options",
  "plural": true,
  "selections": [
    (v23/*:: as any*/),
    (v24/*:: as any*/),
    (v25/*:: as any*/),
    {
      "name": "groups",
      "args": null,
      "fragment": (v22/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "part",
      "args": null,
      "fragment": (v22/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    (v26/*:: as any*/),
    {
      "name": "custom",
      "args": null,
      "fragment": (v22/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "swatches",
      "args": null,
      "fragment": (v22/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    }
  ],
  "storageKey": null
},
v28 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "ColorAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "ColorAttribute",
  "abstractKey": null
},
v29 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "ComposeAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "ComposeAttribute",
  "abstractKey": null
},
v30 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "StatsAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "StatsAttribute",
  "abstractKey": null
},
v31 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "RangeAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "RangeAttribute",
  "abstractKey": null
},
v32 = {
  "kind": "InlineFragment",
  "selections": (v21/*:: as any*/),
  "type": "SpeciesRange",
  "abstractKey": null
},
v33 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "DateAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "DateAttribute",
  "abstractKey": null
},
v34 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v16/*:: as any*/),
        "type": "TraitsAttribute",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "TraitsAttribute",
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
        "concreteType": null,
        "modelResolvers": {
          "ColorAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ColorAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(ColorAttribute__id_graphql, colorAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "ComposeAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ComposeAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(ComposeAttribute__id_graphql, composeAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "DateAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DateAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(DateAttribute__id_graphql, dateAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "PickAttribute": {
            "alias": null,
            "args": null,
            "fragment": (v1/*:: as any*/),
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(PickAttribute__id_graphql, pickAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "RangeAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "RangeAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(RangeAttribute__id_graphql, rangeAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "StatsAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "StatsAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(StatsAttribute__id_graphql, statsAttributeRelayModelInstanceResolver, 'id', true),
            "path": "attribute.__relay_model_instance"
          },
          "TraitsAttribute": {
            "alias": null,
            "args": null,
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "TraitsAttribute__id"
            },
            "kind": "RelayResolver",
            "name": "__relay_model_instance",
            "resolverModule": resolverDataInjector(TraitsAttribute__id_graphql, traitsAttributeRelayModelInstanceResolver, 'id', true),
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            (v3/*:: as any*/),
            {
              "kind": "InlineDataFragmentSpread",
              "name": "attributeHead_attribute",
              "selections": [
                (v3/*:: as any*/),
                {
                  "kind": "ClientExtension",
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "PickAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "ColorAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "ComposeAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "StatsAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "RangeAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "DateAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v10/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "locked",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeLockedResolver, '__relay_model_instance', true),
                          "path": "locked"
                        }
                      ],
                      "type": "TraitsAttribute",
                      "abstractKey": null
                    }
                  ]
                }
              ],
              "args": null,
              "argumentDefinitions": []
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "kind": "ClientEdgeToClientObject",
                  "concreteType": "AttributeOption",
                  "modelResolvers": null,
                  "serverObjectOperations": null,
                  "backingField": {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v11/*:: as any*/)
                  },
                  "linkedField": (v13/*:: as any*/)
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "concreteType": "PickAttribute",
                  "modelResolvers": {
                    "PickAttribute": {
                      "alias": null,
                      "args": null,
                      "fragment": (v1/*:: as any*/),
                      "kind": "RelayResolver",
                      "name": "__relay_model_instance",
                      "resolverModule": resolverDataInjector(PickAttribute__id_graphql, pickAttributeRelayModelInstanceResolver, 'id', true),
                      "path": "attribute.groupBy.__relay_model_instance"
                    }
                  },
                  "serverObjectOperations": null,
                  "backingField": {
                    "alias": null,
                    "args": null,
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "groupBy",
                    "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeGroupByResolver, '__relay_model_instance', true),
                    "path": "attribute.groupBy"
                  },
                  "linkedField": {
                    "alias": null,
                    "args": null,
                    "concreteType": "PickAttribute",
                    "kind": "LinkedField",
                    "name": "groupBy",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v4/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "key",
                        "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeKeyResolver, '__relay_model_instance', true),
                        "path": "attribute.groupBy.key"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v4/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "label",
                        "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeLabelResolver, '__relay_model_instance', true),
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
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "options",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeOptionsResolver, '__relay_model_instance', true),
                          "path": "attribute.groupBy.options",
                          "normalizationInfo": (v11/*:: as any*/)
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
                              "fragment": (v12/*:: as any*/),
                              "kind": "RelayResolver",
                              "name": "key",
                              "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
                              "path": "attribute.groupBy.options.key"
                            },
                            {
                              "alias": null,
                              "args": null,
                              "fragment": (v12/*:: as any*/),
                              "kind": "RelayResolver",
                              "name": "label",
                              "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
                              "path": "attribute.groupBy.options.label"
                            },
                            {
                              "alias": null,
                              "args": null,
                              "fragment": (v12/*:: as any*/),
                              "kind": "RelayResolver",
                              "name": "hint",
                              "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHintResolver, '__relay_model_instance', true),
                              "path": "attribute.groupBy.options.hint"
                            },
                            {
                              "alias": null,
                              "args": null,
                              "fragment": (v12/*:: as any*/),
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
                }
              ],
              "type": "PickAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "kind": "ClientEdgeToClientObject",
                  "concreteType": "AttributeOption",
                  "modelResolvers": null,
                  "serverObjectOperations": null,
                  "backingField": {
                    "alias": null,
                    "args": null,
                    "fragment": (v5/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v11/*:: as any*/)
                  },
                  "linkedField": (v13/*:: as any*/)
                }
              ],
              "type": "ColorAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v6/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "partLabels",
                  "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributePartLabelsResolver, '__relay_model_instance', true),
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
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v11/*:: as any*/)
                  },
                  "linkedField": (v13/*:: as any*/)
                }
              ],
              "type": "ComposeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v7/*:: as any*/),
                  "kind": "RelayLiveResolver",
                  "name": "rangeMin",
                  "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeRangeMinResolver, '__relay_model_instance', true),
                  "path": "attribute.rangeMin"
                },
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v7/*:: as any*/),
                  "kind": "RelayLiveResolver",
                  "name": "rangeMax",
                  "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeRangeMaxResolver, '__relay_model_instance', true),
                  "path": "attribute.rangeMax"
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "concreteType": "AttributeOption",
                  "modelResolvers": null,
                  "serverObjectOperations": null,
                  "backingField": {
                    "alias": null,
                    "args": null,
                    "fragment": (v7/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v11/*:: as any*/)
                  },
                  "linkedField": (v13/*:: as any*/)
                }
              ],
              "type": "StatsAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v8/*:: as any*/),
                  "kind": "RelayLiveResolver",
                  "name": "rangeMin",
                  "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeRangeMinResolver, '__relay_model_instance', true),
                  "path": "attribute.rangeMin"
                },
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v8/*:: as any*/),
                  "kind": "RelayLiveResolver",
                  "name": "rangeMax",
                  "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeRangeMaxResolver, '__relay_model_instance', true),
                  "path": "attribute.rangeMax"
                },
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v8/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "unit",
                  "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeUnitResolver, '__relay_model_instance', true),
                  "path": "attribute.unit"
                },
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v8/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "hasCases",
                  "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeHasCasesResolver, '__relay_model_instance', true),
                  "path": "attribute.hasCases"
                },
                {
                  "alias": null,
                  "args": null,
                  "fragment": (v8/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "dependsOnSpecies",
                  "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeDependsOnSpeciesResolver, '__relay_model_instance', true),
                  "path": "attribute.dependsOnSpecies"
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "concreteType": "SpeciesRange",
                  "modelResolvers": null,
                  "serverObjectOperations": null,
                  "backingField": {
                    "alias": null,
                    "args": null,
                    "fragment": (v8/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "speciesRanges",
                    "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeSpeciesRangesResolver, '__relay_model_instance', true),
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
                        "fragment": (v14/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "speciesKey",
                        "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesKeyResolver, '__relay_model_instance', true),
                        "path": "attribute.speciesRanges.speciesKey"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v14/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "speciesLabel",
                        "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesLabelResolver, '__relay_model_instance', true),
                        "path": "attribute.speciesRanges.speciesLabel"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v14/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "speciesHint",
                        "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpeciesHintResolver, '__relay_model_instance', true),
                        "path": "attribute.speciesRanges.speciesHint"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v14/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "span",
                        "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeSpanResolver, '__relay_model_instance', true),
                        "path": "attribute.speciesRanges.span"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "fragment": (v14/*:: as any*/),
                        "kind": "RelayResolver",
                        "name": "bands",
                        "resolverModule": resolverDataInjector(SpeciesRange____relay_model_instance_graphql, speciesRangeBandsResolver, '__relay_model_instance', true),
                        "path": "attribute.speciesRanges.bands"
                      }
                    ],
                    "storageKey": null
                  }
                }
              ],
              "type": "RangeAttribute",
              "abstractKey": null
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            (v3/*:: as any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v18/*:: as any*/),
                (v19/*:: as any*/),
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": (v20/*:: as any*/),
                  "linkedField": (v27/*:: as any*/)
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "groupBy",
                    "args": null,
                    "fragment": (v17/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": false
                  },
                  "linkedField": {
                    "alias": null,
                    "args": null,
                    "concreteType": "PickAttribute",
                    "kind": "LinkedField",
                    "name": "groupBy",
                    "plural": false,
                    "selections": [
                      (v18/*:: as any*/),
                      (v19/*:: as any*/),
                      {
                        "kind": "ClientEdgeToClientObject",
                        "backingField": (v20/*:: as any*/),
                        "linkedField": {
                          "alias": null,
                          "args": null,
                          "concreteType": "AttributeOption",
                          "kind": "LinkedField",
                          "name": "options",
                          "plural": true,
                          "selections": [
                            (v23/*:: as any*/),
                            (v24/*:: as any*/),
                            (v25/*:: as any*/),
                            (v26/*:: as any*/)
                          ],
                          "storageKey": null
                        }
                      },
                      (v15/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                },
                (v15/*:: as any*/)
              ],
              "type": "PickAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v28/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v28/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v27/*:: as any*/)
                },
                (v15/*:: as any*/)
              ],
              "type": "ColorAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "partLabels",
                  "args": null,
                  "fragment": (v29/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v29/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v27/*:: as any*/)
                },
                (v15/*:: as any*/)
              ],
              "type": "ComposeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "rangeMin",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "rangeMax",
                  "args": null,
                  "fragment": (v30/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v30/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v27/*:: as any*/)
                },
                (v15/*:: as any*/)
              ],
              "type": "StatsAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "rangeMin",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "rangeMax",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "unit",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "hasCases",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "dependsOnSpecies",
                  "args": null,
                  "fragment": (v31/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "speciesRanges",
                    "args": null,
                    "fragment": (v31/*:: as any*/),
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
                        "fragment": (v32/*:: as any*/),
                        "kind": "RelayResolver",
                        "storageKey": null,
                        "isOutputType": true
                      },
                      {
                        "name": "speciesLabel",
                        "args": null,
                        "fragment": (v32/*:: as any*/),
                        "kind": "RelayResolver",
                        "storageKey": null,
                        "isOutputType": true
                      },
                      {
                        "name": "speciesHint",
                        "args": null,
                        "fragment": (v32/*:: as any*/),
                        "kind": "RelayResolver",
                        "storageKey": null,
                        "isOutputType": true
                      },
                      {
                        "name": "span",
                        "args": null,
                        "fragment": (v32/*:: as any*/),
                        "kind": "RelayResolver",
                        "storageKey": null,
                        "isOutputType": true
                      },
                      {
                        "name": "bands",
                        "args": null,
                        "fragment": (v32/*:: as any*/),
                        "kind": "RelayResolver",
                        "storageKey": null,
                        "isOutputType": true
                      }
                    ],
                    "storageKey": null
                  }
                },
                (v15/*:: as any*/)
              ],
              "type": "RangeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v33/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v15/*:: as any*/)
              ],
              "type": "DateAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "key",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v34/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v15/*:: as any*/)
              ],
              "type": "TraitsAttribute",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      }
    ],
    "clientAbstractTypes": {
      "__isAttribute": [
        "ColorAttribute",
        "ComposeAttribute",
        "DateAttribute",
        "PickAttribute",
        "RangeAttribute",
        "StatsAttribute",
        "TraitsAttribute"
      ]
    }
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

(node as any).hash = "bf32ae802f9828bc3fc6d5514ae7d1be";

export default node;
