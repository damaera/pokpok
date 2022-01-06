// Pokemon List page; should show a list of Pokemons’ names and the owned
// total. When a Pokemon is clicked, it should go to that Pokemon Detail page.

import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { useListPokemonsQuery } from "../generated/graphql";
import { routes } from "../routes";
import { PokeCard } from "../ui/PokeCard";
import { Spacer } from "../ui/Spacer";

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ListPokemons: React.FC<{}> = () => {
  const { loading, error, data } = useListPokemonsQuery({
    variables: {
      limit: 12,
      offset: 0,
    },
  });

  return (
    <PokemonWrapper>
      {data?.pokemons?.results?.map((pokemon, i) => (
        <Link to={routes.pokemonDetail((pokemon?.id || 0).toString())}>
          <PokeCard
            key={pokemon?.id || 0}
            id={pokemon?.id || 0}
            name={pokemon?.name || ""}
            image={pokemon?.image || ""}
          />
        </Link>
      ))}
    </PokemonWrapper>
  );
};

export { ListPokemons };
