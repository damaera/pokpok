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

type MyPokemonItem = {
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

const savePokemon: (pokemon: MyPokemonItem) => void = (pokemon) => {
  const allPokemons = listAllMyPokemons()
  const newAllPokemons: Record<string, MyPokemonItem> = { ...allPokemons, [pokemon.nickname]: pokemon }
  storage.setItem(KEY, JSON.stringify(newAllPokemons))
}


const persistentStore = {
  listAllMyPokemons,
  getPokemonByNickname,
  getPokemonsById,
  savePokemon
}

export { persistentStore }