/**
 * @generated SignedSource<<df787940b4c54906466a3e6d8e7bd618>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs, DataID } from "relay-runtime";
import { partLabels as composeAttributePartLabelsResolverType } from "../graph/kinds/composeAttribute";
// Type assertion validating that `composeAttributePartLabelsResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(composeAttributePartLabelsResolverType satisfies (
  __relay_model_instance: ComposeAttribute____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<string>);
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
export type AddValueSheetQuery$variables = {
  id: string;
};
export type AddValueSheetQuery$data = {
  readonly attribute: {
    readonly __typename: string;
    readonly partLabels?: ReadonlyArray<string>;
    readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
  } | null | undefined;
};
export type AddValueSheetQuery = {
  response: AddValueSheetQuery$data;
  variables: AddValueSheetQuery$variables;
};

import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {color as colorAttributeColorResolver} from '../graph/kinds/colorAttribute';
import {edited as colorAttributeEditedResolver} from '../graph/kinds/colorAttribute';
import {key as colorAttributeKeyResolver} from '../graph/kinds/colorAttribute';
import {label as colorAttributeLabelResolver} from '../graph/kinds/colorAttribute';
import {locked as colorAttributeLockedResolver} from '../graph/kinds/colorAttribute';
import {selected as colorAttributeSelectedResolver} from '../graph/kinds/colorAttribute';
import {summary as colorAttributeSummaryResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {color as composeAttributeColorResolver} from '../graph/kinds/composeAttribute';
import {edited as composeAttributeEditedResolver} from '../graph/kinds/composeAttribute';
import {key as composeAttributeKeyResolver} from '../graph/kinds/composeAttribute';
import {label as composeAttributeLabelResolver} from '../graph/kinds/composeAttribute';
import {locked as composeAttributeLockedResolver} from '../graph/kinds/composeAttribute';
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
import {key as pickAttributeKeyResolver} from '../graph/kinds/pickAttribute';
import {label as pickAttributeLabelResolver} from '../graph/kinds/pickAttribute';
import {locked as pickAttributeLockedResolver} from '../graph/kinds/pickAttribute';
import {selected as pickAttributeSelectedResolver} from '../graph/kinds/pickAttribute';
import {summary as pickAttributeSummaryResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {color as rangeAttributeColorResolver} from '../graph/kinds/rangeAttribute';
import {edited as rangeAttributeEditedResolver} from '../graph/kinds/rangeAttribute';
import {key as rangeAttributeKeyResolver} from '../graph/kinds/rangeAttribute';
import {label as rangeAttributeLabelResolver} from '../graph/kinds/rangeAttribute';
import {locked as rangeAttributeLockedResolver} from '../graph/kinds/rangeAttribute';
import {selected as rangeAttributeSelectedResolver} from '../graph/kinds/rangeAttribute';
import {summary as rangeAttributeSummaryResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {color as statsAttributeColorResolver} from '../graph/kinds/statsAttribute';
import {edited as statsAttributeEditedResolver} from '../graph/kinds/statsAttribute';
import {key as statsAttributeKeyResolver} from '../graph/kinds/statsAttribute';
import {label as statsAttributeLabelResolver} from '../graph/kinds/statsAttribute';
import {locked as statsAttributeLockedResolver} from '../graph/kinds/statsAttribute';
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
  "name": "RangeAttribute____relay_model_instance"
},
v8 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "DateAttribute____relay_model_instance"
},
v9 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "TraitsAttribute____relay_model_instance"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = [
  (v10/*:: as any*/)
],
v12 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v13 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v14 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v15 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v16 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v17 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
v18 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v11/*:: as any*/),
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
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(PickAttribute____relay_model_instance_graphql, pickAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
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
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(ColorAttribute____relay_model_instance_graphql, colorAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v4/*:: as any*/),
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
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v5/*:: as any*/),
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
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(StatsAttribute____relay_model_instance_graphql, statsAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v6/*:: as any*/),
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
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(RangeAttribute____relay_model_instance_graphql, rangeAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v7/*:: as any*/),
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
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(DateAttribute____relay_model_instance_graphql, dateAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v8/*:: as any*/),
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
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "key",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeKeyResolver, '__relay_model_instance', true),
                          "path": "key"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "label",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeLabelResolver, '__relay_model_instance', true),
                          "path": "label"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "color",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeColorResolver, '__relay_model_instance', true),
                          "path": "color"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "summary",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeSummaryResolver, '__relay_model_instance', true),
                          "path": "summary"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "edited",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeEditedResolver, '__relay_model_instance', true),
                          "path": "edited"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
                          "kind": "RelayLiveResolver",
                          "name": "selected",
                          "resolverModule": resolverDataInjector(TraitsAttribute____relay_model_instance_graphql, traitsAttributeSelectedResolver, '__relay_model_instance', true),
                          "path": "selected"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v9/*:: as any*/),
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
                  "alias": null,
                  "args": null,
                  "fragment": (v5/*:: as any*/),
                  "kind": "RelayResolver",
                  "name": "partLabels",
                  "resolverModule": resolverDataInjector(ComposeAttribute____relay_model_instance_graphql, composeAttributePartLabelsResolver, '__relay_model_instance', true),
                  "path": "attribute.partLabels"
                }
              ],
              "type": "ComposeAttribute",
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
                  "name": "key",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v12/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v13/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
                  "name": "color",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "partLabels",
                  "args": null,
                  "fragment": (v14/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v15/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v16/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v17/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
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
                (v10/*:: as any*/)
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
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "label",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "color",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "summary",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "edited",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "selected",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                {
                  "name": "locked",
                  "args": null,
                  "fragment": (v18/*:: as any*/),
                  "kind": "RelayResolver",
                  "storageKey": null,
                  "isOutputType": true
                },
                (v10/*:: as any*/)
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
    "cacheID": "ea1575f05b09608ab9f7efeb66569b13",
    "id": null,
    "metadata": {},
    "name": "AddValueSheetQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "aa4c12b92db18340bd564500e0517e5a";

export default node;
