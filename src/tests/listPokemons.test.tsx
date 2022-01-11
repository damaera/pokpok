import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ListPokemonsDocument } from "../generated/graphql";
import { ListPokemons } from "../screens/ListPokemons";

const mocks = [
  {
    request: {
      query: ListPokemonsDocument,
      variables: {
        limit: 30,
        offset: 0,
      },
    },
    result: {
      data: {
        pokemons: {
          count: 20,
          message: "",
          nextOffset: 2,
          prevOffset: 0,
          results: [{ id: 1, url: "url one", name: "poke one" }],
          status: true,
        },
      },
    },
  },
];

test("renders my pokemons", () => {
  // arrange
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListPokemons />
      </MockedProvider>
    </MemoryRouter>
  );

  const pokeOneEl = screen.getByText(/poke one/i);

  // assert
  expect(pokeOneEl).toBeInTheDocument();
});
