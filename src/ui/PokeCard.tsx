import styled from "@emotion/styled";
import { baseSize, color, typography } from "./constant";

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
  id: number;
  name: string;
  image: string;
};

const PokeCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <Image src={props.image} alt={props.name} />
      <Name>{props.name}</Name>
    </Card>
  );
};

export { PokeCard };
