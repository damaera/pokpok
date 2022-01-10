// My Pokemon List page; should show a list (like Pokemon List page, but with
// each of their nicknames as well) of all Pokemons you have caught. It should
// also be possible to remove/release a Pokemon from the list on this page. The
// pokemons in this list persist even after a full page reload.

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MyPokemonItem, persistentStore } from "../lib/storage";
import { baseSize, color, typography } from "../ui/constant";
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
  width: 200px;
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
  background-color: solid 1px ${color.backgroundSecondary};
  padding: ${baseSize / 4}px;
  font-weight: bold;
  font-size: ${typography.xs};
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
      <span>{nickname}</span>
      {isDeleteShown ? (
        <RemoveButton
          onClick={(_) => {
            onRemove(nickname);
          }}
        >
          delete
        </RemoveButton>
      ) : null}
    </Nickname>
  );
};

const MyPokemons: React.FC<{}> = () => {
  const [allMyPokemonsPersist, setAllMyPokemons] = useState({});

  useEffect(() => {
    setAllMyPokemons(persistentStore.listAllMyPokemons());
  }, []);

  const allMyPokemons = groupedByIdPokemons(
    Object.values(allMyPokemonsPersist)
  );

  return (
    <Wrapper>
      {Object.keys(allMyPokemons).map((id) => {
        const pokemons = allMyPokemons[id];
        const firstPokemon = pokemons[0];
        return (
          <PokeWrapper key={id} id={id}>
            <div style={{ zIndex: 2 }}>
              <PokeCard
                key={firstPokemon.id}
                totalOwned={pokemons.length}
                pokemon={{
                  id: parseInt(firstPokemon.id),
                  name: firstPokemon.name,
                  image: firstPokemon.image,
                }}
                isLoading={false}
              />
            </div>
            <NicknameWrapper>
              {pokemons.map((p) => {
                return (
                  <NicknameItem
                    onRemove={(_) => {
                      const newPokemons =
                        persistentStore.removePokemonByNickname(p.nickname);

                      setAllMyPokemons(newPokemons);
                    }}
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
  );
};

export { MyPokemons };
