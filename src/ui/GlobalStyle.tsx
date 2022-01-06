import { css, Global } from "@emotion/react";
import { color, typography } from "./constant";

const globalStyle = css`
  a {
    text-decoration: none;
    color: inherit;
  }
  .App {
    font-size: ${typography.md};
    line-height: 1.5;
    background-color: ${color.background};
    color: ${color.foreground};
  }
`;

const GlobalStyle: React.FC<{}> = () => {
  return <Global styles={globalStyle} />;
};

export { GlobalStyle };
