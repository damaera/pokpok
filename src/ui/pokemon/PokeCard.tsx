import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { Card } from "../Card";
import { baseSize, color, typography } from "../constant";
import { Spacer } from "../Spacer";

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: ${typography.lg}px;
  text-transform: capitalize;
  text-align: center;
`;
const TotalOwned = styled.div`
  position: absolute;
  top: ${baseSize}px;
  right: ${baseSize}px;
  padding: ${baseSize / 4}px ${baseSize / 2}px;
  border-radius: ${baseSize}px;

  font-weight: bold;
  font-size: ${typography.xs}px;
  text-transform: uppercase;
  text-align: center;

  background-color: ${color.foregroundSecondary};
  color: ${color.backgroundSecondary};
`;

type Props = {
  pokemon?: {
    id: number;
    name: string;
    image: string;
  };
  isLoading: boolean;
  isHoverable?: boolean;
  totalOwned?: number;
};

const PokeCard: React.FC<Props> = ({
  pokemon,
  isLoading,
  totalOwned,
  isHoverable,
}) => {
  return (
    <Card isHoverable={isHoverable || false} style={{ width: 300 }}>
      {!isLoading ? (
        <Image src={pokemon?.image} alt={pokemon?.name} />
      ) : (
        <Skeleton style={{ height: 240 }} />
      )}
      <Spacer size={0.5} />
      <Name>{!isLoading ? pokemon?.name : <Skeleton />}</Name>
      {!!totalOwned ? <TotalOwned>own {totalOwned}</TotalOwned> : null}
    </Card>
  );
};

export { PokeCard };
