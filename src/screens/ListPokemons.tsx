// Pokemon List page; should show a list of Pokemons’ names and the owned
// total. When a Pokemon is clicked, it should go to that Pokemon Detail page.

import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useListPokemonsQuery } from "../generated/graphql";
import { routes } from "../routes";
import { PokeCard } from "../ui/PokeCard";

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PAGE_LIMIT = 30;

const ListPokemons: React.FC<{}> = () => {
  const { loading, error, data, fetchMore } = useListPokemonsQuery({
    variables: {
      limit: PAGE_LIMIT,
      offset: 0,
    },
  });

  const loadingEl = (
    <PokemonWrapper>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <PokeCard key={i} isLoading={true} />
      ))}
    </PokemonWrapper>
  );

  return (
    <PokemonWrapper>
      {data?.pokemons?.results?.map((pokemon, i) => (
        <Link to={routes.pokemonDetail((pokemon?.id || 0).toString())}>
          <PokeCard
            key={pokemon?.id || 0}
            pokemon={{
              id: pokemon?.id || 0,
              name: pokemon?.name || "",
              image: pokemon?.image || "",
            }}
            isLoading={false}
          />
        </Link>
      ))}
      {loading && loadingEl}

      <button
        onClick={(_) =>
          fetchMore({
            variables: {
              offset: data?.pokemons?.nextOffset,
              limit: PAGE_LIMIT,
            },
          })
        }
      >
        fetch more
      </button>
    </PokemonWrapper>
  );
};

export { ListPokemons };
