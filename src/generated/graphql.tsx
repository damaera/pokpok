import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Ability = {
  __typename?: 'Ability';
  ability?: Maybe<BaseName>;
  is_hidden?: Maybe<Scalars['Boolean']>;
  slot?: Maybe<Scalars['Int']>;
};

export type BaseList = {
  __typename?: 'BaseList';
  count?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<BaseName>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type BaseName = {
  __typename?: 'BaseName';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  message?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['JSON']>;
  response?: Maybe<Scalars['JSON']>;
  status?: Maybe<Scalars['Boolean']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type GameIndex = {
  __typename?: 'GameIndex';
  game_index?: Maybe<Scalars['Int']>;
  version?: Maybe<BaseName>;
};

export type HeldItem = {
  __typename?: 'HeldItem';
  item?: Maybe<BaseName>;
  version_details?: Maybe<Array<Maybe<VersionDetail>>>;
};

export type Move = {
  __typename?: 'Move';
  move?: Maybe<BaseName>;
  version_group_details?: Maybe<Array<Maybe<VersionGroupDetail>>>;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  abilities?: Maybe<Array<Maybe<Ability>>>;
  base_experience?: Maybe<Scalars['Int']>;
  forms?: Maybe<Array<Maybe<BaseName>>>;
  game_indices?: Maybe<Array<Maybe<GameIndex>>>;
  height?: Maybe<Scalars['Int']>;
  held_items?: Maybe<Array<Maybe<HeldItem>>>;
  id?: Maybe<Scalars['Int']>;
  is_default?: Maybe<Scalars['Boolean']>;
  location_area_encounters?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  moves?: Maybe<Array<Maybe<Move>>>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  species?: Maybe<BaseName>;
  sprites?: Maybe<Sprite>;
  stats?: Maybe<Array<Maybe<Stat>>>;
  status?: Maybe<Scalars['Boolean']>;
  types?: Maybe<Array<Maybe<Type>>>;
  weight?: Maybe<Scalars['Int']>;
};

export type PokemonItem = {
  __typename?: 'PokemonItem';
  artwork?: Maybe<Scalars['String']>;
  dreamworld?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PokemonList = {
  __typename?: 'PokemonList';
  count?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
  nextOffset?: Maybe<Scalars['Int']>;
  params?: Maybe<Scalars['JSON']>;
  prevOffset?: Maybe<Scalars['Int']>;
  previous?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<PokemonItem>>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  abilities?: Maybe<BaseList>;
  ability?: Maybe<BaseResponse>;
  berries?: Maybe<BaseList>;
  berry?: Maybe<BaseResponse>;
  eggGroup?: Maybe<BaseResponse>;
  eggGroups?: Maybe<BaseList>;
  encounterMethod?: Maybe<BaseResponse>;
  encounterMethods?: Maybe<BaseList>;
  evolutionChain?: Maybe<BaseResponse>;
  evolutionChains?: Maybe<BaseList>;
  evolutionTrigger?: Maybe<BaseResponse>;
  evolutionTriggers?: Maybe<BaseList>;
  gender?: Maybe<BaseResponse>;
  genders?: Maybe<BaseList>;
  growthRate?: Maybe<BaseResponse>;
  growthRates?: Maybe<BaseList>;
  location?: Maybe<BaseResponse>;
  locations?: Maybe<BaseList>;
  move?: Maybe<BaseResponse>;
  moves?: Maybe<BaseList>;
  nature?: Maybe<BaseResponse>;
  natures?: Maybe<BaseList>;
  pokemon?: Maybe<Pokemon>;
  pokemons?: Maybe<PokemonList>;
  region?: Maybe<BaseResponse>;
  regions?: Maybe<BaseList>;
  species?: Maybe<BaseList>;
  types?: Maybe<BaseList>;
};


export type QueryAbilityArgs = {
  ability: Scalars['String'];
};


export type QueryBerryArgs = {
  berry: Scalars['String'];
};


export type QueryEggGroupArgs = {
  eggGroup: Scalars['String'];
};


export type QueryEncounterMethodArgs = {
  encounterMethod: Scalars['String'];
};


export type QueryEvolutionChainArgs = {
  id: Scalars['String'];
};


export type QueryEvolutionTriggerArgs = {
  name: Scalars['String'];
};


export type QueryGenderArgs = {
  gender: Scalars['String'];
};


export type QueryGrowthRateArgs = {
  growthRate: Scalars['String'];
};


export type QueryLocationArgs = {
  location: Scalars['String'];
};


export type QueryMoveArgs = {
  move: Scalars['String'];
};


export type QueryNatureArgs = {
  nature: Scalars['String'];
};


export type QueryPokemonArgs = {
  name: Scalars['String'];
};


export type QueryPokemonsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRegionArgs = {
  region: Scalars['String'];
};

export type Sprite = {
  __typename?: 'Sprite';
  back_default?: Maybe<Scalars['String']>;
  back_female?: Maybe<Scalars['String']>;
  back_shiny?: Maybe<Scalars['String']>;
  back_shiny_female?: Maybe<Scalars['String']>;
  front_default?: Maybe<Scalars['String']>;
  front_female?: Maybe<Scalars['String']>;
  front_shiny?: Maybe<Scalars['String']>;
  front_shiny_female?: Maybe<Scalars['String']>;
};

export type Stat = {
  __typename?: 'Stat';
  base_stat?: Maybe<Scalars['Int']>;
  effort?: Maybe<Scalars['Int']>;
  stat?: Maybe<BaseName>;
};

export type Type = {
  __typename?: 'Type';
  slot?: Maybe<Scalars['Int']>;
  type?: Maybe<BaseName>;
};

export type VersionDetail = {
  __typename?: 'VersionDetail';
  rarity?: Maybe<Scalars['Int']>;
  version?: Maybe<BaseName>;
};

export type VersionGroupDetail = {
  __typename?: 'VersionGroupDetail';
  level_learned_at?: Maybe<Scalars['Int']>;
  move_learn_method?: Maybe<BaseName>;
  version_group?: Maybe<BaseName>;
};

export type GetPokemonQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetPokemonQuery = { __typename?: 'Query', pokemon?: { __typename?: 'Pokemon', status?: boolean | null | undefined, message?: string | null | undefined, id?: number | null | undefined, name?: string | null | undefined, height?: number | null | undefined, weight?: number | null | undefined, base_experience?: number | null | undefined, abilities?: Array<{ __typename?: 'Ability', is_hidden?: boolean | null | undefined, slot?: number | null | undefined, ability?: { __typename?: 'BaseName', id?: number | null | undefined, url?: string | null | undefined, name?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, stats?: Array<{ __typename?: 'Stat', base_stat?: number | null | undefined, effort?: number | null | undefined, stat?: { __typename?: 'BaseName', name?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined, sprites?: { __typename?: 'Sprite', back_shiny?: string | null | undefined, back_female?: string | null | undefined, back_default?: string | null | undefined, back_shiny_female?: string | null | undefined, front_default?: string | null | undefined, front_female?: string | null | undefined, front_shiny?: string | null | undefined, front_shiny_female?: string | null | undefined } | null | undefined, types?: Array<{ __typename?: 'Type', slot?: number | null | undefined, type?: { __typename?: 'BaseName', id?: number | null | undefined, url?: string | null | undefined, name?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type ListPokemonsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type ListPokemonsQuery = { __typename?: 'Query', pokemons?: { __typename?: 'PokemonList', status?: boolean | null | undefined, message?: string | null | undefined, count?: number | null | undefined, nextOffset?: number | null | undefined, prevOffset?: number | null | undefined, results?: Array<{ __typename?: 'PokemonItem', id?: number | null | undefined, url?: string | null | undefined, name?: string | null | undefined, image?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };


export const GetPokemonDocument = gql`
    query getPokemon($name: String!) {
  pokemon(name: $name) {
    status
    message
    id
    name
    height
    weight
    abilities {
      ability {
        id
        url
        name
      }
      is_hidden
      slot
    }
    base_experience
    stats {
      base_stat
      effort
      stat {
        name
      }
    }
    sprites {
      back_shiny
      back_female
      back_default
      back_shiny_female
      front_default
      front_female
      front_shiny
      front_shiny_female
    }
    types {
      slot
      type {
        id
        url
        name
      }
    }
  }
}
    `;

/**
 * __useGetPokemonQuery__
 *
 * To run a query within a React component, call `useGetPokemonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetPokemonQuery(baseOptions: Apollo.QueryHookOptions<GetPokemonQuery, GetPokemonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonQuery, GetPokemonQueryVariables>(GetPokemonDocument, options);
      }
export function useGetPokemonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonQuery, GetPokemonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonQuery, GetPokemonQueryVariables>(GetPokemonDocument, options);
        }
export type GetPokemonQueryHookResult = ReturnType<typeof useGetPokemonQuery>;
export type GetPokemonLazyQueryHookResult = ReturnType<typeof useGetPokemonLazyQuery>;
export type GetPokemonQueryResult = Apollo.QueryResult<GetPokemonQuery, GetPokemonQueryVariables>;
export const ListPokemonsDocument = gql`
    query listPokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    status
    message
    count
    nextOffset
    prevOffset
    results {
      id
      url
      name
      image
    }
  }
}
    `;

/**
 * __useListPokemonsQuery__
 *
 * To run a query within a React component, call `useListPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPokemonsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useListPokemonsQuery(baseOptions?: Apollo.QueryHookOptions<ListPokemonsQuery, ListPokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPokemonsQuery, ListPokemonsQueryVariables>(ListPokemonsDocument, options);
      }
export function useListPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPokemonsQuery, ListPokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPokemonsQuery, ListPokemonsQueryVariables>(ListPokemonsDocument, options);
        }
export type ListPokemonsQueryHookResult = ReturnType<typeof useListPokemonsQuery>;
export type ListPokemonsLazyQueryHookResult = ReturnType<typeof useListPokemonsLazyQuery>;
export type ListPokemonsQueryResult = Apollo.QueryResult<ListPokemonsQuery, ListPokemonsQueryVariables>;