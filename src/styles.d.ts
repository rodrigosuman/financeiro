import 'styled-components';

export interface ThemeColor {
  bgDark: string;
  bgLight: string;
  primary: string;
  secondary: string;
  white: string;
  danger: string;
  success: string;
}

export interface IThemeProvider {
  colors: ThemeColor;
}

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeProvider {}
}
