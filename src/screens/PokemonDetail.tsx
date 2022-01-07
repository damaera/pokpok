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
import { apolloClient } from "../apollo";
import { PokemonItem, useGetPokemonQuery } from "../generated/graphql";
import { PokeBaseStats } from "../ui/pokemon/PokeBaseStats";
import { PokeCard } from "../ui/pokemon/PokeCard";
import { PokeCatcher } from "../ui/pokemon/PokeCatcher";

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
    console.log(error.message);
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

  return (
    <Wrapper>
      {cachedPokemonItem && loading ? (
        <PokeCard
          isLoading={false}
          pokemon={{
            id: cachedPokemonItem?.id || -1,
            name: cachedPokemonItem?.name || "",
            image: cachedPokemonItem?.image || "",
          }}
        />
      ) : (
        <PokeCard
          isLoading={loading}
          pokemon={{
            id: data?.pokemon?.id || -1,
            name: data?.pokemon?.name || "",
            image: data?.pokemon?.sprites?.front_default || "",
          }}
        />
      )}
      <PokeCatcher
        onCatchPokemon={(isSuccess) => console.log(isSuccess)}
        isLoading={loading}
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
