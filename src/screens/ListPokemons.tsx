// Pokemon List page; should show a list of Pokemons’ names and the owned
// total. When a Pokemon is clicked, it should go to that Pokemon Detail page.

import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useListPokemonsQuery } from "../generated/graphql";
import { routes } from "../routes";
import { Button } from "../ui/Button";
import { baseSize, color, typography } from "../ui/constant";
import { PokeCard } from "../ui/pokemon/PokeCard";
import { Spacer } from "../ui/Spacer";

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadMoreButton = styled.button`
  padding: ${baseSize / 1.5}px ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  border: none;
  outline: none;
  //
  background-color: ${color.foreground};
  opacity: 1;
  //
  font-size: ${typography.md}px;
  font-weight: bold;
  color: ${color.background};
  //
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const PAGE_LIMIT = 60;

const ListPokemons: React.FC<{}> = () => {
  const { loading, error, data, fetchMore } = useListPokemonsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: PAGE_LIMIT,
      offset: 0,
    },
  });

  const loadingEl = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
    <PokeCard key={i} isLoading={true} />
  ));

  return (
    <>
      <PokemonWrapper>
        {data?.pokemons?.results?.map((pokemon, i) => (
          <Link
            to={routes.pokemonDetail((pokemon?.id || 0).toString())}
            key={pokemon?.id || 0}
          >
            <PokeCard
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
      </PokemonWrapper>
      {data?.pokemons?.nextOffset && (
        <LoadMoreWrapper>
          <Spacer />
          <Button
            onClick={(_) =>
              fetchMore({
                variables: {
                  offset: data?.pokemons?.nextOffset,
                  limit: PAGE_LIMIT,
                },
              })
            }
          >
            Load more pokemons ➡️
          </Button>
          <Spacer />
        </LoadMoreWrapper>
      )}
    </>
  );
};

export { ListPokemons };
