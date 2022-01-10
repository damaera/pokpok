import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Card } from "../Card";
import { baseSize, color, typography } from "../constant";

type Props = {
  stats: {
    name: string;
    value: number;
  }[];
  isLoading: boolean;
};

const Wrapper = styled(Card)`
  flex: 1;
  width: 100%;
  max-width: 800px;
  min-width: 200px;

  @media (min-width: 400px) {
    min-width: 400px;
  }
`;

const Title = styled.h3`
  font-size: ${typography.lg};
  margin: 0;
  line-height: 1.5;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
`;

const Td = styled.td`
  padding: ${baseSize / 4}px;
`;

const NameTd = styled(Td)`
  width: 140px;
  font-size: ${typography.sm}px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: right;
`;

const ValueTd = styled(Td)`
  width: 50px;
  font-weight: bold;
  text-align: right;
`;

const BarWrapperTd = styled(Td)`
  width: auto;
`;
const BarBg = styled.div`
  position: relative;
  background: ${color.backgroundSecondary};
  height: ${baseSize / 1.5}px;
  border-radius: ${baseSize / 2}px;
`;
const Bar = styled.div<{ value: number }>`
  position: absolute;
  top: 0;
  z-index: 2;
  height: ${baseSize / 1.5}px;
  width: ${(props) => props.value / 2}%;
  background: hsla(${(props) => props.value}, 100%, 40%, 1);
  border-radius: ${baseSize / 2}px;

  transition: background 600ms, width 600ms;
`;

const AnimatedBar: React.FC<{ value: number }> = ({ value }) => {
  const [val, setNewVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNewVal(value);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  });
  return <Bar value={val} />;
};

const PokeBaseStats: React.FC<Props> = (props) => {
  const totalStats = props.stats
    ?.map((s) => s.value || 0)
    .reduce((l, r) => l + r, 0);

  if (props.isLoading) {
    return (
      <Wrapper>
        <Title>
          <Skeleton />
        </Title>
        <Table>
          <tbody>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <NameTd>
                  <Skeleton />
                </NameTd>
                <ValueTd>
                  <Skeleton />
                </ValueTd>
                <BarWrapperTd>
                  <BarBg>
                    <Skeleton />
                  </BarBg>
                </BarWrapperTd>
              </tr>
            ))}
            <tr>
              <NameTd>
                <Skeleton />
              </NameTd>
              <ValueTd>
                <Skeleton />
              </ValueTd>
            </tr>
          </tbody>
        </Table>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Base stats</Title>
      <Table>
        <tbody>
          {props.stats.map(({ name, value }) => {
            return (
              <tr key={name}>
                <NameTd>{name.replace("-", " ")}</NameTd>
                <ValueTd>{value}</ValueTd>
                <BarWrapperTd>
                  <BarBg>
                    <AnimatedBar value={value} />
                  </BarBg>
                </BarWrapperTd>
              </tr>
            );
          })}
          <tr>
            <NameTd>total</NameTd>
            <ValueTd>{totalStats}</ValueTd>
          </tr>
        </tbody>
      </Table>
    </Wrapper>
  );
};

export { PokeBaseStats };
