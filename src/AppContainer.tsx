import React from 'react';
import { View } from 'react-native';
import ThemeProvider from './providers/ThemeProvider';

// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <ThemeProvider>
      <View />
    </ThemeProvider>
  );
};

export default src;
