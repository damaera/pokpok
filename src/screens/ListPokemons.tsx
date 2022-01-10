// Pokemon List page; should show a list of Pokemons’ names and the owned
// total. When a Pokemon is clicked, it should go to that Pokemon Detail page.

import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { useListPokemonsQuery } from "../generated/graphql";
import { usePersistStore } from "../lib/PersistStoreContext";
import { routes } from "../routes";
import { SecondaryButton } from "../ui/Button";
import { ErrorState } from "../ui/ErrorState";
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

  const persistStore = usePersistStore();

  if (error) {
    return (
      <ErrorState
        title="Oh no 😢"
        subtitle={error.message || "Something wrong happened"}
      />
    );
  }

  return (
    <>
      <PokemonWrapper>
        {data?.pokemons?.results?.map((pokemon, i) => (
          <Link
            to={routes.pokemonDetail((pokemon?.id || 0).toString())}
            key={pokemon?.id || 0}
          >
            <PokeCard
              isHoverable
              totalOwned={
                persistStore.actions.getPokemonsById(pokemon?.id + "" || "")
                  .length
              }
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
          <SecondaryButton
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
          </SecondaryButton>
          <Spacer />
        </LoadMoreWrapper>
      )}
    </>
  );
};

export { ListPokemons };
