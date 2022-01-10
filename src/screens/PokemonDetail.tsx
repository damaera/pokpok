// Pokemon Detail page; should show a picture of the Pokemon with its moves
// and types (this information is from the API, feel free to add more information
// on the Pokemon if you want to). The mandatory thing is that there should be
// a button to catch the Pokemon, (success probability is 50%), if success then
// the user can give the Pokemon a nickname and add that Pokemon to `My
// Pokemon List’. You can catch the same pokemon multiple times but need to
// give a different nickname for each pokemon.

import { gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { apolloClient } from "../lib/apollo";
import { PokemonItem, useGetPokemonQuery } from "../generated/graphql";
import { PokeBaseStats } from "../ui/pokemon/PokeBaseStats";
import { PokeCard } from "../ui/pokemon/PokeCard";
import { PokeCatcher } from "../ui/pokemon/PokeCatcher";
import { usePersistStore } from "../lib/PersistStoreContext";
import { ErrorState } from "../ui/ErrorState";
import { Card } from "../ui/Card";
import { TYPES_EMOJI } from "../lib/pokemon";
import { typography } from "../ui/constant";
import { Spacer } from "../ui/Spacer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
`;

const Item = styled.div`
  text-transform: capitalize;
  font-size: ${typography.md}px;
`;
const CardTitle = styled.div`
  font-weight: bold;
  font-size: ${typography.md}px;
`;

const PokemonDetail: React.FC<{}> = () => {
  const params = useParams();
  const pokemonId = params.id || "";
  const persistStore = usePersistStore();

  const { loading, error, data } = useGetPokemonQuery({
    variables: {
      name: pokemonId,
    },
  });

  const cachedPokemonItem: PokemonItem | null = apolloClient.readFragment({
    id: `PokemonItem:${params.id}`,
    fragment: gql`
      fragment ThisPokemon on PokemonItem {
        id
        name
        image
      }
    `,
  });

  const pokemon =
    cachedPokemonItem && loading
      ? {
          id: cachedPokemonItem?.id || -1,
          name: cachedPokemonItem?.name || "",
          image: cachedPokemonItem?.image || "",
        }
      : {
          id: data?.pokemon?.id || -1,
          name: data?.pokemon?.name || "",
          image: data?.pokemon?.sprites?.front_default || "",
        };

  if (error) {
    return (
      <ErrorState
        title="Oh no 😢"
        subtitle={error.message || "Something wrong happened"}
      />
    );
  }
  return (
    <Wrapper>
      <PokeCard
        isLoading={cachedPokemonItem ? false : loading}
        totalOwned={
          persistStore.actions.getPokemonsById(pokemon.id + "" || "").length
        }
        pokemon={pokemon}
      />
      <PokeCatcher
        checkNicknameExist={(nickname) => {
          return !!persistStore.actions.getPokemonByNickname(nickname);
        }}
        onSavePokemon={(nickname) => {
          let pokemon = {
            id: data?.pokemon?.id || -1,
            name: data?.pokemon?.name || "",
            image: data?.pokemon?.sprites?.front_default || "",
          };
          if (loading && cachedPokemonItem) {
            pokemon = {
              id: cachedPokemonItem?.id || -1,
              name: cachedPokemonItem?.name || "",
              image: cachedPokemonItem?.image || "",
            };
          }
          persistStore.actions.savePokemon({
            ...pokemon,
            id: pokemon.id + "",
            nickname,
          });
        }}
        isLoading={!!cachedPokemonItem || loading}
      />
      <Card style={{ width: 300 }}>
        <CardTitle>Types</CardTitle>
        <Spacer size={0.5} />
        {data?.pokemon?.types?.map((t, i) => {
          return (
            <Item key={i}>
              {t?.type?.name} {TYPES_EMOJI[t?.type?.name || "unknown"]}
            </Item>
          );
        })}
        <Spacer />
        <CardTitle>Abilities</CardTitle>
        <Spacer size={0.5} />
        {data?.pokemon?.abilities?.map((a, i) => {
          return <Item key={i}>{a?.ability?.name?.replace("-", " ")} </Item>;
        })}
      </Card>
      <Card style={{ width: 300 }}>
        <CardTitle>Moves</CardTitle>
        <Spacer size={0.5} />
        {data?.pokemon?.moves?.map((a, i) => {
          return <Item key={i}>{a?.move?.name?.replace("-", " ")} </Item>;
        })}
      </Card>
      <PokeBaseStats
        isLoading={loading}
        stats={
          data?.pokemon?.stats?.map((s) => ({
            name: s?.stat?.name || "",
            value: s?.base_stat || 0,
          })) || []
        }
      />
    </Wrapper>
  );
};

export { PokemonDetail };
