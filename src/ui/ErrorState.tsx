import styled from "@emotion/styled";
import React from "react";
import { baseSize } from "./constant";

const Wrapper = styled.div`
  width: 100%;

  padding: ${baseSize * 2}px;

  text-align: center;
`;

const ErrorState: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </Wrapper>
  );
};

export { ErrorState };
