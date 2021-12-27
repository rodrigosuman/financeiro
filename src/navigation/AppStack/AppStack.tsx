import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import FontName from '../../constants/fontNames';
import Routes from '../../constants/routesPath';
import { theme } from '../../providers/ThemeProvider/ThemeProvider';

const Stack = createNativeStackNavigator();

// import { Container } from './styles';

const AppStack: React.FC = () => {
  const Component = () => <View />;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.bgDark,
          },
        }}
        name={Routes.DASHBOARD}
        component={Component}
      />
      <Stack.Screen
        options={{
          contentStyle: {
            backgroundColor: theme.colors.bgDark,
          },
          headerTitleStyle: {
            fontFamily: FontName.REGULAR,
            color: theme.colors.white,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: theme.colors.bgDark,
          },
          headerShadowVisible: false,
        }}
        name={Routes.STATEMENTS}
        component={Component}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
