import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { Card } from "../Card";
import { baseSize, color, typography } from "../constant";
import { Spacer } from "../Spacer";

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
    <Card isHoverable={isHoverable || false}>
      {!isLoading ? (
        <Image src={pokemon?.image} alt={pokemon?.name} />
      ) : (
        <Skeleton style={{ width: 240, height: 240 }} />
      )}
      <Spacer size={0.5} />
      <Name>{!isLoading ? pokemon?.name : <Skeleton />}</Name>
      {!!totalOwned ? (
        <Link to={routes.myPokemons + `#${pokemon?.id}`}>
          <TotalOwned>own {totalOwned}</TotalOwned>
        </Link>
      ) : null}
    </Card>
  );
};

export { PokeCard };
