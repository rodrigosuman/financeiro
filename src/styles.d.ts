import 'styled-components';

export interface IThemeProvider {
  colors: {
    bgDark: string;
    bgLight: string;
    primary: string;
    secondary: string;
    white: string;
    danger: string;
    success: string;
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeProvider {}
}
