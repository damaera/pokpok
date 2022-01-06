import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListPokemons } from "./screens/ListPokemons";
import { PokemonDetail } from "./screens/PokemonDetail";
import { MyPokemons } from "./screens/MyPokemons";

function App() {
  return (
    <div className="App">
      <div>this is header</div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPokemons />} />
          <Route path="/me" element={<MyPokemons />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
