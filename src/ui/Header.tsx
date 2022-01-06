import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";
import { baseSize, color, typography } from "./constant";

import { routes } from "../routes";
import { Spacer } from "./Spacer";

const Wrapper = styled.header`
  position: fixed;
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: ${baseSize / 2}px ${baseSize}px;
  border-bottom: solid 2px ${color.backgroundSecondary};

  background-color: ${color.background};

  @media (min-width: 540px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  display: flex;
`;

const LinkItem = styled.div<{ isActive: boolean }>`
  font-weight: 700;
  padding: ${baseSize / 2}px ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  border: solid 2px ${color.backgroundSecondary};
  background-color: ${(props) =>
    props.isActive ? color.backgroundSecondary : color.background};
`;

const Title = styled.div`
  font-size: ${typography.xl}px;
  font-weight: 900;
`;

const Header: React.FC<{}> = () => {
  return (
    <>
      <Wrapper>
        <Section>
          <Link to={routes.listPokemons}>
            <Title>PokPok 🐡</Title>
          </Link>
        </Section>

        <Spacer size={0.5} />
        <Section>
          <NavLink to={routes.listPokemons}>
            {({ isActive }) => (
              <LinkItem isActive={isActive}>Discover 🔍</LinkItem>
            )}
          </NavLink>
          <Spacer size={0.5} />
          <NavLink to={routes.myPokemons}>
            {({ isActive }) => (
              <LinkItem isActive={isActive}>My Pokemons 🔖</LinkItem>
            )}
          </NavLink>
        </Section>
      </Wrapper>
      <Spacer size={4} />
    </>
  );
};

export { Header };
