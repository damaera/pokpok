import styled from "@emotion/styled";
import { baseSize, color, typography } from "./constant";

const Button = styled.button`
  padding: ${baseSize / 1.5}px ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  border: none;
  outline: none;
  //
  background-color: ${color.foreground};
  opacity: 1;
  //
  font-size: ${typography.md}px;
  font-weight: bold;
  color: ${color.background};
  //
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export { Button };
