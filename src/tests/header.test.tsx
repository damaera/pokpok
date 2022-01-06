import { render, screen } from "@testing-library/react";
import { Header } from "../ui/Header";
import { MemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { color } from "../ui/constant";

describe("Header", () => {
  test("renders title and links", () => {
    // arrange
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const pokpokTitle = screen.getByText(/pokpok/i);
    const myPokemonsLink = screen.getByText(/my pokemons/i);
    const allPokemonsLink = screen.getByText(/all pokemons/i);

    // assert
    expect(pokpokTitle).toBeInTheDocument();
    expect(myPokemonsLink).toBeInTheDocument();
    expect(allPokemonsLink).toBeInTheDocument();
  });

  test("link bg active style change based on route", () => {
    // arrange
    render(
      <MemoryRouter initialEntries={[routes.myPokemons]}>
        <Header />
      </MemoryRouter>
    );
    const myPokemonsLink = screen.getByText(/my pokemons/i);

    // assert
    expect(myPokemonsLink).toHaveStyle({
      background: color.backgroundSecondary,
    });
  });
});

// describe("Header integrations", () => {
//   test("click my pokemons should go to my pokemons page", () => {
//     // arrange
//     render(
//       <MemoryRouter>
//         <App />
//       </MemoryRouter>
//     );
//     const myPokemonsLink = screen.getByText(/my pokemons/i);

//     // act
//     fireEvent.click(myPokemonsLink);

//     // assert
//     expect(screen.getByText(/this is my pokemons/i)).toBeInTheDocument();
//   });
// });
