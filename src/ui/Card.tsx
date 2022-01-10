import styled from "@emotion/styled";
import { baseSize, color } from "./constant";

const Card = styled.div<{ isHoverable?: boolean }>`
  height: 330px;
  margin: ${baseSize / 4}px;
  padding: ${baseSize}px;

  background: ${color.background};
  border-radius: ${baseSize / 2}px;
  border: solid 2px ${color.backgroundSecondary};
  opacity: 1;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: ${(props) => (props.isHoverable ? 0.8 : 1)};
  }
`;

export { Card };
