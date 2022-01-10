// My Pokemon List page; should show a list (like Pokemon List page, but with
// each of their nicknames as well) of all Pokemons you have caught. It should
// also be possible to remove/release a Pokemon from the list on this page. The
// pokemons in this list persist even after a full page reload.

import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePersistStore } from "../lib/PersistStoreContext";
import { MyPokemonItem } from "../lib/storage";
import { routes } from "../routes";
import { baseSize, color, typography } from "../ui/constant";
import { ErrorState } from "../ui/ErrorState";
import { PokeCard } from "../ui/pokemon/PokeCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const PokeWrapper = styled.div`
  position: relative;
  display: flex;
`;
const NicknameWrapper = styled.div`
  position: relative;
  width: 240px;
  padding: ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  background-color: white;
  height: 320px;
  overflow-y: auto;
  margin: ${baseSize / 3}px;
  z-index: 0;
  left: -${baseSize}px;
`;

const Nickname = styled.div`
  border-bottom: solid 1px ${color.backgroundSecondary};
  padding: ${baseSize / 4}px;
  font-weight: bold;
  font-size: ${typography.xs};
  position: relative;
  cursor: pointer;
  background-color: ${color.background};
  border-radius: ${baseSize / 4}px;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: ${color.backgroundSecondary};
  }
`;
const RemoveButton = styled.button`
  flex: 1;
  background-color: solid 1px ${color.backgroundSecondary};
  padding: ${baseSize / 8}px ${baseSize / 4}px;
  font-weight: bold;
  font-size: ${typography.xs};
  text-transform: uppercase;
  cursor: pointer;
`;

const groupedByIdPokemons = (pokemons: Array<MyPokemonItem>) => {
  const groupedPokemons: Record<string, Array<MyPokemonItem>> = {};

  pokemons.forEach((p) => {
    const ps = groupedPokemons[p.id] || [];

    groupedPokemons[p.id] = [...ps, p];
  });

  return groupedPokemons;
};

const NicknameItem: React.FC<{
  nickname: string;
  onRemove: (nickname: string) => void;
}> = ({ nickname, onRemove }) => {
  const [isDeleteShown, setShowDelete] = useState(false);

  return (
    <Nickname
      onMouseEnter={(_) => {
        setShowDelete(true);
      }}
      onMouseLeave={(_) => {
        setShowDelete(false);
      }}
    >
      <span style={{ flex: 2 }}>{nickname}</span>
      {isDeleteShown ? (
        <RemoveButton
          onClick={(_) => {
            onRemove(nickname);
          }}
        >
          remove?
        </RemoveButton>
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </Nickname>
  );
};

const MyPokemons: React.FC<{}> = () => {
  const persistStore = usePersistStore();

  const allMyPokemons = groupedByIdPokemons(Object.values(persistStore.value));

  if (Object.keys(allMyPokemons).length === 0) {
    return (
      <ErrorState
        title="No pokemon here"
        subtitle={"You don't catch any pokemons"}
      />
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>My pokemons 🐡</h2>
      <Wrapper>
        {Object.keys(allMyPokemons).map((id) => {
          const pokemons = allMyPokemons[id];
          const firstPokemon = pokemons[0];
          return (
            <PokeWrapper key={id} id={id}>
              <div style={{ zIndex: 2 }}>
                <Link to={routes.pokemonDetail(firstPokemon.id)}>
                  <PokeCard
                    isHoverable
                    key={firstPokemon.id}
                    totalOwned={pokemons.length}
                    pokemon={{
                      id: parseInt(firstPokemon.id),
                      name: firstPokemon.name,
                      image: firstPokemon.image,
                    }}
                    isLoading={false}
                  />
                </Link>
              </div>
              <NicknameWrapper>
                {pokemons.map((p) => {
                  return (
                    <NicknameItem
                      onRemove={(_) =>
                        persistStore.actions.removePokemonByNickname(p.nickname)
                      }
                      key={p.nickname}
                      nickname={p.nickname}
                    ></NicknameItem>
                  );
                })}
              </NicknameWrapper>
            </PokeWrapper>
          );
        })}
      </Wrapper>
    </div>
  );
};

export { MyPokemons };
