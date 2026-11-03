/**
 * @generated SignedSource<<dd28be318fa1e3ef5cfe40b1253e1c21>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { ageMax as attributeOptionAgeMaxResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionAgeMaxResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionAgeMaxResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
import { ageMin as attributeOptionAgeMinResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionAgeMinResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionAgeMinResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
import { chance as attributeOptionChanceResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionChanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionChanceResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
import { heightMax as attributeOptionHeightMaxResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionHeightMaxResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionHeightMaxResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
import { heightMin as attributeOptionHeightMinResolverType } from "../graph/attributeOption";
// Type assertion validating that `attributeOptionHeightMinResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(attributeOptionHeightMinResolverType satisfies (
  __relay_model_instance: AttributeOption____relay_model_instance$data['__relay_model_instance'],
) => number | null | undefined);
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
import { options as statsAttributeOptionsResolverType } from "../graph/kinds/statsAttribute";
// Type assertion validating that `statsAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(statsAttributeOptionsResolverType satisfies (
  __relay_model_instance: StatsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { options as traitsAttributeOptionsResolverType } from "../graph/kinds/traitsAttribute";
// Type assertion validating that `traitsAttributeOptionsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(traitsAttributeOptionsResolverType satisfies (
  __relay_model_instance: TraitsAttribute____relay_model_instance$data['__relay_model_instance'],
) => LiveState<ReadonlyArray<AttributeOption>>);
import { AttributeOption } from "../graph/attributeOption";
export type AddValueSheetQuery$variables = {
  id: string;
};
export type AddValueSheetQuery$data = {
  readonly attribute: {
    readonly __typename: string;
    readonly options?: ReadonlyArray<{
      readonly ageMax: number | null | undefined;
      readonly ageMin: number | null | undefined;
      readonly chance: number | null | undefined;
      readonly heightMax: number | null | undefined;
      readonly heightMin: number | null | undefined;
      readonly key: string;
      readonly label: string;
      readonly swatches: ReadonlyArray<string>;
    }>;
    readonly partLabels?: ReadonlyArray<string>;
    readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
  } | null | undefined;
};
export type AddValueSheetQuery = {
  response: AddValueSheetQuery$data;
  variables: AddValueSheetQuery$variables;
};

import {ageMax as attributeOptionAgeMaxResolver} from '../graph/attributeOption';
import {ageMin as attributeOptionAgeMinResolver} from '../graph/attributeOption';
import {chance as attributeOptionChanceResolver} from '../graph/attributeOption';
import {heightMax as attributeOptionHeightMaxResolver} from '../graph/attributeOption';
import {heightMin as attributeOptionHeightMinResolver} from '../graph/attributeOption';
import {key as attributeOptionKeyResolver} from '../graph/attributeOption';
import {label as attributeOptionLabelResolver} from '../graph/attributeOption';
import {swatches as attributeOptionSwatchesResolver} from '../graph/attributeOption';
import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {head as colorAttributeHeadResolver} from '../graph/kinds/colorAttribute';
import {options as colorAttributeOptionsResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {head as composeAttributeHeadResolver} from '../graph/kinds/composeAttribute';
import {options as composeAttributeOptionsResolver} from '../graph/kinds/composeAttribute';
import {partLabels as composeAttributePartLabelsResolver} from '../graph/kinds/composeAttribute';
import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import {head as dateAttributeHeadResolver} from '../graph/kinds/dateAttribute';
import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import {head as pickAttributeHeadResolver} from '../graph/kinds/pickAttribute';
import {options as pickAttributeOptionsResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {head as rangeAttributeHeadResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {head as statsAttributeHeadResolver} from '../graph/kinds/statsAttribute';
import {options as statsAttributeOptionsResolver} from '../graph/kinds/statsAttribute';
import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import {head as traitsAttributeHeadResolver} from '../graph/kinds/traitsAttribute';
import {options as traitsAttributeOptionsResolver} from '../graph/kinds/traitsAttribute';
import {attribute as queryAttributeResolver} from '../graph/root';
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "PickAttribute____relay_model_instance"
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ColorAttribute____relay_model_instance"
},
v5 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "ComposeAttribute____relay_model_instance"
},
v6 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "StatsAttribute____relay_model_instance"
},
v7 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "TraitsAttribute____relay_model_instance"
},
v8 = {
  "kind": "WeakModel",
  "concreteType": "AttributeOption",
  "plural": true
},
v9 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "AttributeOption____relay_model_instance"
},
v10 = {
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
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "key",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionKeyResolver, '__relay_model_instance', true),
      "path": "attribute.options.key"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "label",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionLabelResolver, '__relay_model_instance', true),
      "path": "attribute.options.label"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "swatches",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionSwatchesResolver, '__relay_model_instance', true),
      "path": "attribute.options.swatches"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "chance",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionChanceResolver, '__relay_model_instance', true),
      "path": "attribute.options.chance"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "ageMin",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionAgeMinResolver, '__relay_model_instance', true),
      "path": "attribute.options.ageMin"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "ageMax",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionAgeMaxResolver, '__relay_model_instance', true),
      "path": "attribute.options.ageMax"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "heightMin",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHeightMinResolver, '__relay_model_instance', true),
      "path": "attribute.options.heightMin"
    },
    {
      "alias": null,
      "args": null,
      "fragment": (v9/*:: as any*/),
      "kind": "RelayResolver",
      "name": "heightMax",
      "resolverModule": resolverDataInjector(AttributeOption____relay_model_instance_graphql, attributeOptionHeightMaxResolver, '__relay_model_instance', true),
      "path": "attribute.options.heightMax"
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v11/*:: as any*/)
],
v13 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v12/*:: as any*/),
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
v14 = {
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
},
v15 = {
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
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "label",
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
    },
    {
      "name": "chance",
      "args": null,
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "ageMin",
      "args": null,
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "ageMax",
      "args": null,
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "heightMin",
      "args": null,
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    },
    {
      "name": "heightMax",
      "args": null,
      "fragment": (v14/*:: as any*/),
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": true
    }
  ],
  "storageKey": null
},
v16 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v12/*:: as any*/),
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
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v12/*:: as any*/),
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
v18 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v12/*:: as any*/),
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
v19 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v12/*:: as any*/),
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
    "name": "AddValueSheetQuery",
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
            "fragment": {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PickAttribute__id"
            },
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            (v2/*:: as any*/),
            {
              "kind": "InlineDataFragmentSpread",
              "name": "attributeHead_attribute",
              "selections": [
                (v2/*:: as any*/),
                {
                  "kind": "ClientExtension",
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
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
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
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
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
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
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
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
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
                        }
                      ],
                      "type": "TraitsAttribute",
                      "abstractKey": null
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "fragment": {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "DateAttribute____relay_model_instance"
                          },
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
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
                          "fragment": {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "RangeAttribute____relay_model_instance"
                          },
                          "kind": "RelayLiveResolver",
                          "name": "head",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeHeadResolver, '__relay_model_instance', true),
                          "path": "head"
                        }
                      ],
                      "type": "RangeAttribute",
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
                  "alias": null,
                  "args": null,
                  "fragment": (v5/*:: as any*/),
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
                    "fragment": (v5/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v8/*:: as any*/)
                  },
                  "linkedField": (v10/*:: as any*/)
                }
              ],
              "type": "ComposeAttribute",
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
                    "fragment": (v3/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v8/*:: as any*/)
                  },
                  "linkedField": (v10/*:: as any*/)
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
                    "fragment": (v4/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v8/*:: as any*/)
                  },
                  "linkedField": (v10/*:: as any*/)
                }
              ],
              "type": "ColorAttribute",
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
                    "fragment": (v6/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v8/*:: as any*/)
                  },
                  "linkedField": (v10/*:: as any*/)
                }
              ],
              "type": "StatsAttribute",
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
                    "fragment": (v7/*:: as any*/),
                    "kind": "RelayLiveResolver",
                    "name": "options",
                    "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeOptionsResolver, '__relay_model_instance', true),
                    "path": "attribute.options",
                    "normalizationInfo": (v8/*:: as any*/)
                  },
                  "linkedField": (v10/*:: as any*/)
                }
              ],
              "type": "TraitsAttribute",
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
    "name": "AddValueSheetQuery",
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "attribute",
          "plural": false,
          "selections": [
            (v2/*:: as any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v13/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v15/*:: as any*/)
                },
                (v11/*:: as any*/)
              ],
              "type": "PickAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v16/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v15/*:: as any*/)
                },
                (v11/*:: as any*/)
              ],
              "type": "ColorAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "partLabels",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v17/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v15/*:: as any*/)
                },
                (v11/*:: as any*/)
              ],
              "type": "ComposeAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v18/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v15/*:: as any*/)
                },
                (v11/*:: as any*/)
              ],
              "type": "StatsAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": (v19/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "kind": "ClientEdgeToClientObject",
                  "backingField": {
                    "name": "options",
                    "args": null,
                    "fragment": (v19/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  "linkedField": (v15/*:: as any*/)
                },
                (v11/*:: as any*/)
              ],
              "type": "TraitsAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "name": "__relay_model_instance",
                        "args": null,
                        "fragment": {
                          "kind": "InlineFragment",
                          "selections": (v12/*:: as any*/),
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
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v11/*:: as any*/)
              ],
              "type": "DateAttribute",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "name": "head",
                  "args": null,
                  "fragment": {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "name": "__relay_model_instance",
                        "args": null,
                        "fragment": {
                          "kind": "InlineFragment",
                          "selections": (v12/*:: as any*/),
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
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v11/*:: as any*/)
              ],
              "type": "RangeAttribute",
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
    "cacheID": "ea1575f05b09608ab9f7efeb66569b13",
    "id": null,
    "metadata": {},
    "name": "AddValueSheetQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "d625bbc6d14bc1dcb233755695d6b3ce";

export default node;
