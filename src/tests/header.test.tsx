import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "../ui/Header";
import { MemoryRouter } from "react-router-dom";
import { routes } from "../routes";
import { color } from "../ui/constant";
import { MockedProvider } from "@apollo/client/testing";
import App from "../App";

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
    const discoverLink = screen.getByText(/discover/i);

    // assert
    expect(pokpokTitle).toBeInTheDocument();
    expect(myPokemonsLink).toBeInTheDocument();
    expect(discoverLink).toBeInTheDocument();
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

describe("Header integrations", () => {
  test("click my pokemons should go to my pokemons page", () => {
    // arrange
    render(
      <MemoryRouter>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );
    const myPokemonsLink = screen.getByText(/my pokemons/i);

    // act
    fireEvent.click(myPokemonsLink);

    // assert
    expect(screen.getByText(/No pokemon/i)).toBeInTheDocument();
  });
});
