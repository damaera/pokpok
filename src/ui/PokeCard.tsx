import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { baseSize, color, typography } from "./constant";
import { Spacer } from "./Spacer";

const Card = styled.div`
  margin: ${baseSize / 4}px;
  padding: ${baseSize}px;

  background: ${color.background};
  border-radius: ${baseSize / 2}px;
  border: solid 2px ${color.backgroundSecondary};
  opacity: 1;
  position: relative;
  transition: top 0.1s, opacity 0.2s;
  top: 0px;

  &:hover {
    top: -4px;
    opacity: 0.8;
  }
`;

const Image = styled.img`
  width: 240px;
  height: 240px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: ${typography.lg}px;
  text-transform: capitalize;
  text-align: center;
`;

type Props = {
  pokemon?: {
    id: number;
    name: string;
    image: string;
  };
  isLoading: boolean;
};

const PokeCard: React.FC<Props> = ({ pokemon, isLoading }) => {
  return (
    <Card>
      {!isLoading ? (
        <Image src={pokemon?.image} alt={pokemon?.name} />
      ) : (
        <Skeleton style={{ width: 240, height: 240 }} />
      )}
      <Spacer size={0.5} />
      <Name>{!isLoading ? pokemon?.name : <Skeleton />}</Name>
    </Card>
  );
};

export { PokeCard };
