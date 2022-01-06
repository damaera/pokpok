import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";
import { baseSize, color, typography } from "./constant";

import { routes } from "../routes";

const Wrapper = styled.header`
  background-color: white;
  padding: ${baseSize / 2}px ${baseSize}px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const WSpacer = styled.div<{ w?: number }>`
  width: ${(props) => (props.w || 1) * baseSize}px;
  height: 100%;
`;

const Header: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Section>
        <Link to={routes.listPokemons}>
          <Title>PokPok 🐡</Title>
        </Link>
      </Section>

      <Section>
        <NavLink to={routes.listPokemons}>
          {({ isActive }) => (
            <LinkItem isActive={isActive}>All Pokemons 📒</LinkItem>
          )}
        </NavLink>
        <WSpacer />
        <NavLink to={routes.myPokemons}>
          {({ isActive }) => (
            <LinkItem isActive={isActive}>My Pokemons 🔖</LinkItem>
          )}
        </NavLink>
      </Section>
    </Wrapper>
  );
};

export { Header };
