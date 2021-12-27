import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStack from './navigation/AppStack';
import ThemeProvider from './providers/ThemeProvider';
import { theme } from './providers/ThemeProvider/ThemeProvider';

// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.bgDark}
      />
      <ThemeProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default src;
