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
import { persistentStore } from "../lib/storage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
`;

const PokemonDetail: React.FC<{}> = () => {
  const params = useParams();
  const pokemonId = params.id || "";

  const { loading, error, data } = useGetPokemonQuery({
    variables: {
      name: pokemonId,
    },
  });

  if (error) {
    return <div>Error</div>;
  }

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

  return (
    <Wrapper>
      <PokeCard
        isLoading={cachedPokemonItem ? false : loading}
        totalOwned={
          persistentStore.getPokemonsById(pokemon.id + "" || "").length
        }
        pokemon={pokemon}
      />
      <PokeCatcher
        checkNicknameExist={(nickname) => {
          return !!persistentStore.getPokemonByNickname(nickname);
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
          persistentStore.savePokemon({
            ...pokemon,
            id: pokemon.id + "",
            nickname,
          });
        }}
        isLoading={!!cachedPokemonItem || loading}
      />
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
