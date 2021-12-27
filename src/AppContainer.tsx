import ThemeProvider from 'providers/ThemeProvider';
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <ThemeProvider>
      <View />
    </ThemeProvider>
  );
};

export default src;
