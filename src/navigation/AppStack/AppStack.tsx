import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'styled-components';
import FontName from '../../constants/fontNames';
import Routes from '../../constants/routesPath';
import MounthlyStatements from '../../screens/MounthlyStatements/MounthlyStatements';
import StatementCreateEditForm from '../../screens/StatmentCreateEditForm/StatementCreateEditForm';

export type RootStackParamList = {
  [Routes.DASHBOARD]: undefined;
  [Routes.STATEMENTS]: undefined;
  [Routes.CREATE_EDIT_STATEMENTS]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// import { Container } from './styles';

const AppStack: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator initialRouteName={Routes.STATEMENTS}>
      <Stack.Screen
        options={{
          title: 'Lançamentos',
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
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTintColor: theme.colors.white,
          animation: 'fade_from_bottom',
        }}
        name={Routes.STATEMENTS}
        component={MounthlyStatements}
      />

      <Stack.Screen
        options={{
          title: '',
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
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTintColor: theme.colors.white,
          animation: 'fade_from_bottom',
        }}
        name={Routes.CREATE_EDIT_STATEMENTS}
        component={StatementCreateEditForm}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
