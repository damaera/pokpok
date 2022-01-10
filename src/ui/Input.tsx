import styled from "@emotion/styled";
import { baseSize, color, typography } from "./constant";

const Input = styled.input`
  padding: ${baseSize / 1.5}px ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  border: solid 2px ${color.backgroundTertiary};
  outline: none;
  //
  background-color: ${color.background};
  opacity: 1;
  //
  font-size: ${typography.md}px;
  font-weight: bold;
  color: ${color.foreground};
  //
`;

export { Input };
