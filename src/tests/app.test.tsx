import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders pokpok", () => {
  // arrange
  render(
    <MemoryRouter>
      <MockedProvider>
        <App />
      </MockedProvider>
    </MemoryRouter>
  );

  const pokpokEl = screen.getByText(/pokpok/i);

  // assert
  expect(pokpokEl).toBeInTheDocument();
});
