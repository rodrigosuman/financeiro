import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppStack from './navigation/AppStack';
import ThemeProvider from './providers/ThemeProvider';
import { theme } from './providers/ThemeProvider/ThemeProvider';
import store from './redux-store';

// import { Container } from './styles';

const AppContainer: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.bgDark}
      />
      <ThemeProvider>
        <Provider store={store}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default AppContainer;
