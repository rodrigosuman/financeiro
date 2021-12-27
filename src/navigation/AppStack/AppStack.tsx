import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, View } from 'react-native';
import { useTheme } from 'styled-components';
import Button from '../../components/atoms/Button/Button';
import { Text } from '../../components/atoms/StrongText/styles';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import StatementItem from '../../components/molecules/StatementItem';
import FontName from '../../constants/fontNames';
import Routes from '../../constants/routesPath';
import Dashboard from '../../screens/Dashboard/Dashboard';

export type RootStackParamList = {
  [Routes.DASHBOARD]: undefined;
  [Routes.STATEMENTS]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// import { Container } from './styles';

const AppStack: React.FC = () => {
  const theme = useTheme();

  const Component = () => (
    <View>
      <Button
        onPress={() => Alert.alert('Pressed')}
        title="Adicionar"
        variant="primary"
      />
      <Button
        onPress={() => Alert.alert('Pressed')}
        title="Lançamentos"
        variant="success"
      />

      <View style={{ padding: 10, paddingBottom: 0 }}>
        <StatementItem
          itemProps={{
            statamenteDate: new Date(),
            status: 'NOT_PAID',
            title: 'Salário',
            value: 6900.35,
            type: 'CREDIT',
          }}
        />
      </View>

      <View style={{ padding: 10, paddingTop: 0 }}>
        <StatementItem
          itemProps={{
            statamenteDate: new Date(),
            status: 'PAID',
            title: 'Aluguel',
            value: 1240.45,
            type: 'DEBT',
          }}
        />
      </View>
      <View style={{ paddingTop: 40 }}>
        <Card
          headerProps={{
            title: 'Saldo',
            right: () => <Flutuation flutuation={-20} />,
          }}
          variant="success">
          <View>
            <Text>children</Text>
          </View>
        </Card>
      </View>

      <View style={{ paddingTop: 40 }}>
        <Card
          headerProps={{
            title: 'Saldo',
            right: () => <Flutuation flutuation={15} />,
          }}>
          <View>
            <Text>children</Text>
          </View>
        </Card>
      </View>
    </View>
  );
  return (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.bgDark,
          },
        }}
        name={Routes.DASHBOARD}
        component={Dashboard}
      />
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
          headerShadowVisible: false,
          headerTintColor: theme.colors.white,
          animation: 'fade_from_bottom',
        }}
        name={Routes.STATEMENTS}
        component={Component}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
