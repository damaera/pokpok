import { render, screen } from "@testing-library/react";
import { PokeCard } from "../ui/pokemon/PokeCard";

describe("PokeCard", () => {
  test("render pokemon", () => {
    // arrange
    render(
      <PokeCard
        isLoading={false}
        pokemon={{ id: 1, name: "pokename", image: "pokeimage" }}
      />
    );
    const pokeName = screen.getByText(/pokename/i);

    // assert
    expect(pokeName).toBeInTheDocument();
  });

  test("render total owned", () => {
    // arrange
    render(
      <PokeCard
        isLoading={false}
        pokemon={{ id: 1, name: "pokename", image: "pokeimage" }}
        totalOwned={3}
      />
    );

    const totalOwned = screen.getByText(/own 3/i);

    // assert
    expect(totalOwned).toBeInTheDocument();
  });
});
