import 'styled-components';

export interface ThemeColor {
  bgDark: string;
  bgLight: string;
  primary: string;
  secondary: string;
  white: string;
  danger: string;
  error: string;
  success: string;
}

export type KeyOfThemeColor = keyof ThemeColor;

export interface IThemeProvider {
  colors: ThemeColor;
}

declare module 'styled-components' {
  export interface DefaultTheme extends IThemeProvider {}
}
