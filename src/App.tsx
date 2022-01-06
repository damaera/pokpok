import styled from "@emotion/styled";
import { Routes, Route } from "react-router-dom";

import { ListPokemons } from "./screens/ListPokemons";
import { PokemonDetail } from "./screens/PokemonDetail";
import { MyPokemons } from "./screens/MyPokemons";
import { Header } from "./ui/Header";
import { baseSize } from "./ui/constant";
import { GlobalStyle } from "./ui/GlobalStyle";

const Content = styled.section`
  padding: ${baseSize}px;

  font-size: ${baseSize}px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <GlobalStyle />
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<ListPokemons />} />
            <Route path="/me" element={<MyPokemons />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </Content>
      </Container>
    </div>
  );
}

export default App;
