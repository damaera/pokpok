import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
import { baseSize, color, typography } from "../constant";

type Props = {
  stats: {
    name: string;
    value: number;
  }[];
  isLoading: boolean;
};

const Table = styled.table`
  width: 100%;
  max-width: 700px;
  padding: ${baseSize}px;
  border-radius: ${baseSize / 2}px;
  background-color: ${color.background};
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
`;

const PokeBaseStats: React.FC<Props> = (props) => {
  const totalStats = props.stats
    ?.map((s) => s.value || 0)
    .reduce((l, r) => l + r, 0);

  if (props.isLoading) {
    return (
      <Table>
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
      </Table>
    );
  }

  return (
    <Table>
      {props.stats.map(({ name, value }) => {
        return (
          <tr key={name}>
            <NameTd>{name.replace("-", " ")}</NameTd>
            <ValueTd>{value}</ValueTd>
            <BarWrapperTd>
              <BarBg>
                <Bar value={value} />
              </BarBg>
            </BarWrapperTd>
          </tr>
        );
      })}
      <tr>
        <NameTd>total</NameTd>
        <ValueTd>{totalStats}</ValueTd>
      </tr>
    </Table>
  );
};

export { PokeBaseStats };
