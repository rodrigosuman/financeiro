import React from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';
import { IThemeProvider } from '../../styles';

// import { Container } from './styles';

const ThemeProvider: React.FC = props => {
  const theme: IThemeProvider = {
    colors: {
      bgDark: '#2A1C52',
      bgLight: '#3E2E6B',
      primary: '#461A7E',
      secondary: '#9A91CE',
      white: '#FFFFFF',
      danger: '#BB4771',
      success: '#2EBD67',
    },
  };

  return (
    <StyledComponentThemeProvider theme={theme}>
      {props.children}
    </StyledComponentThemeProvider>
  );
};

export default ThemeProvider;
