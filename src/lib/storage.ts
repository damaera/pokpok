
const storage = window.localStorage

const KEY = "pokemons"

const parse = (str: string | null, empty = {}) => {
  try {
    if (str) {
      return JSON.parse(str)
    } else {
      return empty
    }
  } catch {
    return empty
  }
}

export type MyPokemonItem = {
  id: string,
  name: string,
  nickname: string,
  image: string
}

// nickname
const listAllMyPokemons: () => Record<string, MyPokemonItem> = () => {
  const pokemons = storage.getItem(KEY)
  return parse(pokemons)
}

const getPokemonByNickname: (nickname: string) => MyPokemonItem = (nickname) => {
  const allPokemons = listAllMyPokemons()
  return allPokemons[nickname]
}

const getPokemonsById: (id: string) => Array<MyPokemonItem> = (id) => {
  const allPokemons = listAllMyPokemons()
  return Object.values(allPokemons).filter(p => p.id === id)
}

const savePokemon: (pokemon: MyPokemonItem) => Record<string, MyPokemonItem> = (pokemon) => {
  const allPokemons = listAllMyPokemons()
  const newAllPokemons: Record<string, MyPokemonItem> = { ...allPokemons, [pokemon.nickname]: pokemon }
  storage.setItem(KEY, JSON.stringify(newAllPokemons))
  return newAllPokemons
}

const removePokemonByNickname: (nickname: string) => Record<string, MyPokemonItem> = (nickname) => {
  const allPokemons = listAllMyPokemons()
  delete allPokemons[nickname]
  storage.setItem(KEY, JSON.stringify(allPokemons))
  return allPokemons
}


const persistentStorage = {
  listAllMyPokemons,
  getPokemonByNickname,
  getPokemonsById,
  savePokemon,
  removePokemonByNickname,
}


export { persistentStorage }