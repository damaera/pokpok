import styled from "@emotion/styled";
import { baseSize } from "./constant";

const Spacer = styled.div<{ size?: number }>`
  width: ${(props) => (props.size || 1) * baseSize}px;
  height: ${(props) => (props.size || 1) * baseSize}px;
`;

export { Spacer };
