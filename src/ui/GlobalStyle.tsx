import { css, Global } from "@emotion/react";
import { color, typography } from "./constant";

const globalStyle = css`
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    background: ${color.backgroundSecondary};

    color: ${color.foreground};
    font-size: ${typography.md};
    line-height: 1.5;
  }
`;

const GlobalStyle: React.FC<{}> = () => {
  return <Global styles={globalStyle} />;
};

export { GlobalStyle };
