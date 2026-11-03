/**
 * @generated SignedSource<<bda55f2d5c55b02b6ff3105b5b1c28b8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { LiveState, FragmentRefs, DataID } from "relay-runtime";
import { folders as queryFoldersResolverType } from "../graph/root";
// Type assertion validating that `queryFoldersResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(queryFoldersResolverType satisfies () => LiveState<ReadonlyArray<SavedFolder>>);
import { saved as querySavedResolverType } from "../graph/root";
// Type assertion validating that `querySavedResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(querySavedResolverType satisfies () => LiveState<ReadonlyArray<SavedEntry>>);
import { entries as rollEntriesResolverType } from "../graph/roll";
// Type assertion validating that `rollEntriesResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntriesResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => ReadonlyArray<RollEntry>);
import { attribute as rollEntryAttributeResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryAttributeResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryAttributeResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly __typename: "ColorAttribute" | "ComposeAttribute" | "DateAttribute" | "PickAttribute" | "RangeAttribute" | "StatsAttribute" | "TraitsAttribute";
  readonly id: DataID;
});
import { detail as rollEntryDetailResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryDetailResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryDetailResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { value as rollEntryValueResolverType } from "../graph/rollEntry";
// Type assertion validating that `rollEntryValueResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollEntryValueResolverType satisfies (
  __relay_model_instance: RollEntry____relay_model_instance$data['__relay_model_instance'],
) => string);
import { headline as rollHeadlineResolverType } from "../graph/roll";
// Type assertion validating that `rollHeadlineResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollHeadlineResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string);
import { key as rollKeyResolverType } from "../graph/roll";
// Type assertion validating that `rollKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollKeyResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string);
import { name as rollNameResolverType } from "../graph/roll";
// Type assertion validating that `rollNameResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(rollNameResolverType satisfies (
  __relay_model_instance: Roll____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { folder as savedEntryFolderResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntryFolderResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntryFolderResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => string | null | undefined);
import { roll as savedEntryRollResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntryRollResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntryRollResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => {
  readonly id: DataID;
} | null | undefined);
import { savedAt as savedEntrySavedAtResolverType } from "../graph/savedEntry";
// Type assertion validating that `savedEntrySavedAtResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedEntrySavedAtResolverType satisfies (
  __relay_model_instance: SavedEntry____relay_model_instance$data['__relay_model_instance'],
) => string);
import { count as savedFolderCountResolverType } from "../graph/savedFolder";
// Type assertion validating that `savedFolderCountResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedFolderCountResolverType satisfies (
  __relay_model_instance: SavedFolder____relay_model_instance$data['__relay_model_instance'],
) => LiveState<number>);
import { key as savedFolderKeyResolverType } from "../graph/savedFolder";
// Type assertion validating that `savedFolderKeyResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedFolderKeyResolverType satisfies (
  __relay_model_instance: SavedFolder____relay_model_instance$data['__relay_model_instance'],
) => string);
import { name as savedFolderNameResolverType } from "../graph/savedFolder";
// Type assertion validating that `savedFolderNameResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(savedFolderNameResolverType satisfies (
  __relay_model_instance: SavedFolder____relay_model_instance$data['__relay_model_instance'],
) => string);
import { RollEntry } from "../graph/rollEntry";
import { SavedEntry } from "../graph/root";
import { SavedFolder } from "../graph/root";
export type SavedQuery$variables = Record<PropertyKey, never>;
export type SavedQuery$data = {
  readonly folders: ReadonlyArray<{
    readonly count: number;
    readonly key: string;
    readonly name: string;
  }>;
  readonly saved: ReadonlyArray<{
    readonly folder: string | null | undefined;
    readonly roll: {
      readonly entries: ReadonlyArray<{
        readonly attribute: {
          readonly " $fragmentSpreads": FragmentRefs<"attributeHead_attribute">;
        };
        readonly detail: string | null | undefined;
        readonly value: string;
      }>;
      readonly headline: string;
      readonly key: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly savedAt: string;
  }>;
};
export type SavedQuery = {
  response: SavedQuery$data;
  variables: SavedQuery$variables;
};

import {ColorAttribute as colorAttributeRelayModelInstanceResolver} from '../graph/kinds/colorAttribute';
import {head as colorAttributeHeadResolver} from '../graph/kinds/colorAttribute';
import {ComposeAttribute as composeAttributeRelayModelInstanceResolver} from '../graph/kinds/composeAttribute';
import {head as composeAttributeHeadResolver} from '../graph/kinds/composeAttribute';
import {DateAttribute as dateAttributeRelayModelInstanceResolver} from '../graph/kinds/dateAttribute';
import {head as dateAttributeHeadResolver} from '../graph/kinds/dateAttribute';
import {PickAttribute as pickAttributeRelayModelInstanceResolver} from '../graph/kinds/pickAttribute';
import {head as pickAttributeHeadResolver} from '../graph/kinds/pickAttribute';
import {RangeAttribute as rangeAttributeRelayModelInstanceResolver} from '../graph/kinds/rangeAttribute';
import {head as rangeAttributeHeadResolver} from '../graph/kinds/rangeAttribute';
import {StatsAttribute as statsAttributeRelayModelInstanceResolver} from '../graph/kinds/statsAttribute';
import {head as statsAttributeHeadResolver} from '../graph/kinds/statsAttribute';
import {TraitsAttribute as traitsAttributeRelayModelInstanceResolver} from '../graph/kinds/traitsAttribute';
import {head as traitsAttributeHeadResolver} from '../graph/kinds/traitsAttribute';
import {Roll as rollRelayModelInstanceResolver} from '../graph/roll';
import {entries as rollEntriesResolver} from '../graph/roll';
import {headline as rollHeadlineResolver} from '../graph/roll';
import {key as rollKeyResolver} from '../graph/roll';
import {name as rollNameResolver} from '../graph/roll';
import {attribute as rollEntryAttributeResolver} from '../graph/rollEntry';
import {detail as rollEntryDetailResolver} from '../graph/rollEntry';
import {value as rollEntryValueResolver} from '../graph/rollEntry';
import {folders as queryFoldersResolver} from '../graph/root';
import {saved as querySavedResolver} from '../graph/root';
import {folder as savedEntryFolderResolver} from '../graph/savedEntry';
import {roll as savedEntryRollResolver} from '../graph/savedEntry';
import {savedAt as savedEntrySavedAtResolver} from '../graph/savedEntry';
import {count as savedFolderCountResolver} from '../graph/savedFolder';
import {key as savedFolderKeyResolver} from '../graph/savedFolder';
import {name as savedFolderNameResolver} from '../graph/savedFolder';
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
import RollEntry____relay_model_instance_graphql from './RollEntry____relay_model_instance.graphql';
import Roll____relay_model_instance_graphql from './Roll____relay_model_instance.graphql';
import Roll__id_graphql from './Roll__id.graphql';
import SavedEntry____relay_model_instance_graphql from './SavedEntry____relay_model_instance.graphql';
import SavedFolder____relay_model_instance_graphql from './SavedFolder____relay_model_instance.graphql';
import StatsAttribute____relay_model_instance_graphql from './StatsAttribute____relay_model_instance.graphql';
import StatsAttribute__id_graphql from './StatsAttribute__id.graphql';
import TraitsAttribute____relay_model_instance_graphql from './TraitsAttribute____relay_model_instance.graphql';
import TraitsAttribute__id_graphql from './TraitsAttribute__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ConcreteRequest = (function(){
var v0 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SavedFolder____relay_model_instance"
},
v1 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "SavedEntry____relay_model_instance"
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "Roll____relay_model_instance"
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "RollEntry____relay_model_instance"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__relay_model_instance",
    "storageKey": null
  }
],
v6 = {
  "kind": "InlineFragment",
  "selections": (v5/*:: as any*/),
  "type": "SavedFolder",
  "abstractKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": (v5/*:: as any*/),
  "type": "SavedEntry",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = [
  (v8/*:: as any*/)
],
v10 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "name": "__relay_model_instance",
      "args": null,
      "fragment": {
        "kind": "InlineFragment",
        "selections": (v9/*:: as any*/),
        "type": "Roll",
        "abstractKey": null
      },
      "kind": "RelayResolver",
      "storageKey": null,
      "isOutputType": false
    }
  ],
  "type": "Roll",
  "abstractKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": (v5/*:: as any*/),
  "type": "RollEntry",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "hasClientEdges": true
    },
    "name": "SavedQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "SavedFolder",
        "modelResolvers": null,
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayLiveResolver",
          "name": "folders",
          "resolverModule": queryFoldersResolver,
          "path": "folders",
          "normalizationInfo": {
            "kind": "WeakModel",
            "concreteType": "SavedFolder",
            "plural": true
          }
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedFolder",
          "kind": "LinkedField",
          "name": "folders",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "key",
              "resolverModule": resolverDataInjector(SavedFolder____relay_model_instance_graphql, savedFolderKeyResolver, '__relay_model_instance', true),
              "path": "folders.key"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayResolver",
              "name": "name",
              "resolverModule": resolverDataInjector(SavedFolder____relay_model_instance_graphql, savedFolderNameResolver, '__relay_model_instance', true),
              "path": "folders.name"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v0/*:: as any*/),
              "kind": "RelayLiveResolver",
              "name": "count",
              "resolverModule": resolverDataInjector(SavedFolder____relay_model_instance_graphql, savedFolderCountResolver, '__relay_model_instance', true),
              "path": "folders.count"
            }
          ],
          "storageKey": null
        }
      },
      {
        "kind": "ClientEdgeToClientObject",
        "concreteType": "SavedEntry",
        "modelResolvers": null,
        "serverObjectOperations": null,
        "backingField": {
          "alias": null,
          "args": null,
          "fragment": null,
          "kind": "RelayLiveResolver",
          "name": "saved",
          "resolverModule": querySavedResolver,
          "path": "saved",
          "normalizationInfo": {
            "kind": "WeakModel",
            "concreteType": "SavedEntry",
            "plural": true
          }
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedEntry",
          "kind": "LinkedField",
          "name": "saved",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayResolver",
              "name": "savedAt",
              "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntrySavedAtResolver, '__relay_model_instance', true),
              "path": "saved.savedAt"
            },
            {
              "alias": null,
              "args": null,
              "fragment": (v1/*:: as any*/),
              "kind": "RelayResolver",
              "name": "folder",
              "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntryFolderResolver, '__relay_model_instance', true),
              "path": "saved.folder"
            },
            {
              "kind": "ClientEdgeToClientObject",
              "concreteType": "Roll",
              "modelResolvers": {
                "Roll": {
                  "alias": null,
                  "args": null,
                  "fragment": {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Roll__id"
                  },
                  "kind": "RelayResolver",
                  "name": "__relay_model_instance",
                  "resolverModule": resolverDataInjector(Roll__id_graphql, rollRelayModelInstanceResolver, 'id', true),
                  "path": "saved.roll.__relay_model_instance"
                }
              },
              "serverObjectOperations": null,
              "backingField": {
                "alias": null,
                "args": null,
                "fragment": (v1/*:: as any*/),
                "kind": "RelayResolver",
                "name": "roll",
                "resolverModule": resolverDataInjector(SavedEntry____relay_model_instance_graphql, savedEntryRollResolver, '__relay_model_instance', true),
                "path": "saved.roll"
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Roll",
                "kind": "LinkedField",
                "name": "roll",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v2/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "key",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollKeyResolver, '__relay_model_instance', true),
                    "path": "saved.roll.key"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v2/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "name",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollNameResolver, '__relay_model_instance', true),
                    "path": "saved.roll.name"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "fragment": (v2/*:: as any*/),
                    "kind": "RelayResolver",
                    "name": "headline",
                    "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollHeadlineResolver, '__relay_model_instance', true),
                    "path": "saved.roll.headline"
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "concreteType": "RollEntry",
                    "modelResolvers": null,
                    "serverObjectOperations": null,
                    "backingField": {
                      "alias": null,
                      "args": null,
                      "fragment": (v2/*:: as any*/),
                      "kind": "RelayResolver",
                      "name": "entries",
                      "resolverModule": resolverDataInjector(Roll____relay_model_instance_graphql, rollEntriesResolver, '__relay_model_instance', true),
                      "path": "saved.roll.entries",
                      "normalizationInfo": {
                        "kind": "WeakModel",
                        "concreteType": "RollEntry",
                        "plural": true
                      }
                    },
                    "linkedField": {
                      "alias": null,
                      "args": null,
                      "concreteType": "RollEntry",
                      "kind": "LinkedField",
                      "name": "entries",
                      "plural": true,
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
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
                              "path": "saved.roll.entries.attribute.__relay_model_instance"
                            }
                          },
                          "serverObjectOperations": null,
                          "backingField": {
                            "alias": null,
                            "args": null,
                            "fragment": (v3/*:: as any*/),
                            "kind": "RelayResolver",
                            "name": "attribute",
                            "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryAttributeResolver, '__relay_model_instance', true),
                            "path": "saved.roll.entries.attribute"
                          },
                          "linkedField": {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "InlineDataFragmentSpread",
                                "name": "attributeHead_attribute",
                                "selections": [
                                  (v4/*:: as any*/),
                                  {
                                    "kind": "ClientExtension",
                                    "selections": [
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "fragment": {
                                              "args": null,
                                              "kind": "FragmentSpread",
                                              "name": "PickAttribute____relay_model_instance"
                                            },
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
                                            "fragment": {
                                              "args": null,
                                              "kind": "FragmentSpread",
                                              "name": "ColorAttribute____relay_model_instance"
                                            },
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
                                            "fragment": {
                                              "args": null,
                                              "kind": "FragmentSpread",
                                              "name": "ComposeAttribute____relay_model_instance"
                                            },
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
                                            "fragment": {
                                              "args": null,
                                              "kind": "FragmentSpread",
                                              "name": "StatsAttribute____relay_model_instance"
                                            },
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
                                            "fragment": {
                                              "args": null,
                                              "kind": "FragmentSpread",
                                              "name": "TraitsAttribute____relay_model_instance"
                                            },
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
                          "name": "value",
                          "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryValueResolver, '__relay_model_instance', true),
                          "path": "saved.roll.entries.value"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "fragment": (v3/*:: as any*/),
                          "kind": "RelayResolver",
                          "name": "detail",
                          "resolverModule": resolverDataInjector(RollEntry____relay_model_instance_graphql, rollEntryDetailResolver, '__relay_model_instance', true),
                          "path": "saved.roll.entries.detail"
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
          "storageKey": null
        }
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SavedQuery",
    "selections": [
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "folders",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": true
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedFolder",
          "kind": "LinkedField",
          "name": "folders",
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
              "name": "name",
              "args": null,
              "fragment": (v6/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "count",
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
      {
        "kind": "ClientEdgeToClientObject",
        "backingField": {
          "name": "saved",
          "args": null,
          "fragment": null,
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": true
        },
        "linkedField": {
          "alias": null,
          "args": null,
          "concreteType": "SavedEntry",
          "kind": "LinkedField",
          "name": "saved",
          "plural": true,
          "selections": [
            {
              "name": "savedAt",
              "args": null,
              "fragment": (v7/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "name": "folder",
              "args": null,
              "fragment": (v7/*:: as any*/),
              "kind": "RelayResolver",
              "storageKey": null,
              "isOutputType": true
            },
            {
              "kind": "ClientEdgeToClientObject",
              "backingField": {
                "name": "roll",
                "args": null,
                "fragment": (v7/*:: as any*/),
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": false
              },
              "linkedField": {
                "alias": null,
                "args": null,
                "concreteType": "Roll",
                "kind": "LinkedField",
                "name": "roll",
                "plural": false,
                "selections": [
                  {
                    "name": "key",
                    "args": null,
                    "fragment": (v10/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "name",
                    "args": null,
                    "fragment": (v10/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "name": "headline",
                    "args": null,
                    "fragment": (v10/*:: as any*/),
                    "kind": "RelayResolver",
                    "storageKey": null,
                    "isOutputType": true
                  },
                  {
                    "kind": "ClientEdgeToClientObject",
                    "backingField": {
                      "name": "entries",
                      "args": null,
                      "fragment": (v10/*:: as any*/),
                      "kind": "RelayResolver",
                      "storageKey": null,
                      "isOutputType": true
                    },
                    "linkedField": {
                      "alias": null,
                      "args": null,
                      "concreteType": "RollEntry",
                      "kind": "LinkedField",
                      "name": "entries",
                      "plural": true,
                      "selections": [
                        {
                          "kind": "ClientEdgeToClientObject",
                          "backingField": {
                            "name": "attribute",
                            "args": null,
                            "fragment": (v11/*:: as any*/),
                            "kind": "RelayResolver",
                            "storageKey": null,
                            "isOutputType": false
                          },
                          "linkedField": {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "attribute",
                            "plural": false,
                            "selections": [
                              (v4/*:: as any*/),
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
                                            "selections": (v9/*:: as any*/),
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
                                    "kind": "RelayResolver",
                                    "storageKey": null,
                                    "isOutputType": true
                                  },
                                  (v8/*:: as any*/)
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
                                    "fragment": {
                                      "kind": "InlineFragment",
                                      "selections": [
                                        {
                                          "name": "__relay_model_instance",
                                          "args": null,
                                          "fragment": {
                                            "kind": "InlineFragment",
                                            "selections": (v9/*:: as any*/),
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
                                    "kind": "RelayResolver",
                                    "storageKey": null,
                                    "isOutputType": true
                                  },
                                  (v8/*:: as any*/)
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
                                    "fragment": {
                                      "kind": "InlineFragment",
                                      "selections": [
                                        {
                                          "name": "__relay_model_instance",
                                          "args": null,
                                          "fragment": {
                                            "kind": "InlineFragment",
                                            "selections": (v9/*:: as any*/),
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
                                    "kind": "RelayResolver",
                                    "storageKey": null,
                                    "isOutputType": true
                                  },
                                  (v8/*:: as any*/)
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
                                    "fragment": {
                                      "kind": "InlineFragment",
                                      "selections": [
                                        {
                                          "name": "__relay_model_instance",
                                          "args": null,
                                          "fragment": {
                                            "kind": "InlineFragment",
                                            "selections": (v9/*:: as any*/),
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
                                    "kind": "RelayResolver",
                                    "storageKey": null,
                                    "isOutputType": true
                                  },
                                  (v8/*:: as any*/)
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
                                    "fragment": {
                                      "kind": "InlineFragment",
                                      "selections": [
                                        {
                                          "name": "__relay_model_instance",
                                          "args": null,
                                          "fragment": {
                                            "kind": "InlineFragment",
                                            "selections": (v9/*:: as any*/),
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
                                    },
                                    "kind": "RelayResolver",
                                    "storageKey": null,
                                    "isOutputType": true
                                  },
                                  (v8/*:: as any*/)
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
                                            "selections": (v9/*:: as any*/),
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
                                  (v8/*:: as any*/)
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
                                            "selections": (v9/*:: as any*/),
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
                                  (v8/*:: as any*/)
                                ],
                                "type": "RangeAttribute",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        },
                        {
                          "name": "value",
                          "args": null,
                          "fragment": (v11/*:: as any*/),
                          "kind": "RelayResolver",
                          "storageKey": null,
                          "isOutputType": true
                        },
                        {
                          "name": "detail",
                          "args": null,
                          "fragment": (v11/*:: as any*/),
                          "kind": "RelayResolver",
                          "storageKey": null,
                          "isOutputType": true
                        }
                      ],
                      "storageKey": null
                    }
                  },
                  (v8/*:: as any*/)
                ],
                "storageKey": null
              }
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
    "cacheID": "fc2c5c82a68a6539dcc99e2771a5603b",
    "id": null,
    "metadata": {},
    "name": "SavedQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "27c3a13b28492ce22ef578842b046a9c";

export default node;
