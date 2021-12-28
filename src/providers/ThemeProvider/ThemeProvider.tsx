import React from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import { IThemeProvider } from '../../styles';

export const theme: IThemeProvider = {
  colors: {
    bgDark: '#2A1C52',
    bgLight: '#3E2E6B',
    primary: '#461A7E',
    secondary: '#DAD4FC',
    white: '#FFFFFF',
    danger: '#BB4771',
    success: '#2EBD67',
    error: '#F44968',
  },
};

const ThemeProvider: React.FC = props => {
  return (
    <StyledComponentThemeProvider theme={theme}>
      {props.children}
    </StyledComponentThemeProvider>
  );
};

export default ThemeProvider;
