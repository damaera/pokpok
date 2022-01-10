import React, { createContext, useContext, useEffect, useState } from "react";
import { MyPokemonItem, persistentStorage } from "./storage";

type Context = {
  value: Record<string, MyPokemonItem>;
  actions: typeof persistentStorage;
};

const PersistStoreContext = createContext<Context>({
  value: {},
  actions: persistentStorage,
});

const usePersistStore = () => {
  return useContext(PersistStoreContext);
};

const PersistStoreProvider: React.FC<{}> = (props) => {
  const [value, setValue] = useState({});

  useEffect(() => {
    setValue(persistentStorage.listAllMyPokemons());
  }, []);

  return (
    <PersistStoreContext.Provider
      value={{
        value,
        actions: {
          ...persistentStorage,
          savePokemon(pokemon) {
            const newPokemons = persistentStorage.savePokemon(pokemon);
            setValue(newPokemons);
            return newPokemons;
          },
          removePokemonByNickname(nickname) {
            const newPokemons =
              persistentStorage.removePokemonByNickname(nickname);
            setValue(newPokemons);
            return newPokemons;
          },
        },
      }}
    >
      {props.children}
    </PersistStoreContext.Provider>
  );
};

export { PersistStoreProvider, usePersistStore };
