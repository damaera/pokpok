// Pokemon Detail page; should show a picture of the Pokemon with its moves
// and types (this information is from the API, feel free to add more information
// on the Pokemon if you want to). The mandatory thing is that there should be
// a button to catch the Pokemon, (success probability is 50%), if success then
// the user can give the Pokemon a nickname and add that Pokemon to `My
// Pokemon List’. You can catch the same pokemon multiple times but need to
// give a different nickname for each pokemon.

import { useParams } from "react-router-dom";
import { useGetPokemonQuery } from "../generated/graphql";
import { PokeBaseStats } from "../ui/pokemon/PokeBaseStats";

const PokemonDetail: React.FC<{}> = () => {
  const params = useParams();
  const pokemonId = params.id || "";

  const { loading, error, data } = useGetPokemonQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      name: pokemonId,
    },
  });

  console.log(data);

  return (
    <div>
      Pokemon Detail
      <div>{data?.pokemon?.name}</div>
      <div>
        <h3>Base stats</h3>
        <PokeBaseStats
          isLoading={loading}
          stats={
            data?.pokemon?.stats?.map((s) => ({
              name: s?.stat?.name || "",
              value: s?.base_stat || 0,
            })) || []
          }
        />
      </div>
    </div>
  );
};

export { PokemonDetail };
