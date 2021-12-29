import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import Button from '../../components/atoms/Button';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import { StatementItem } from '../../components/molecules/StatementItem/types';
import StatementsList from '../../components/molecules/StatementsList';
import Routes from '../../constants/routesPath';
import useCurrencyFormater from '../../hooks/useCurrencyFormater';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import {
  getAsyncDashboardAction,
  setDashboardIsLoadingAction
} from '../../redux-store/redux-actions/dashboard';
import randomColor from '../../utils/randomColor';
import * as S from './styles';

const ChartData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const Dashboard: React.FC = () => {
  const currencyFormater = useCurrencyFormater('BRL');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { isLoading, data } = useSelector(state => state.dashboard);

  const BALANCE = data?.balance?.total || 0;
  const FLUTUATION = data?.balance?.flutuation || 0;
  const DEBTS = data?.debts || 0;
  const CHART = data?.chart || [];
  const STATEMENTS = data?.statements || [];

  const balance = currencyFormater.format(BALANCE);
  const balanceFlutuation = FLUTUATION;
  const debts = currencyFormater.format(DEBTS);
  const debtsPercent = (DEBTS / BALANCE) * 100;
  const statements: StatementItem[] = STATEMENTS.map(statement => ({
    statamenteDate: new Date(statement.statementDate + 'T23:59'),
    status: statement.status,
    title: statement.statementType?.description,
    type: statement.statementType?.type,
    value: statement.value,
    id: statement.id,
  }));

  const chartData = CHART.map(chartItem => ({
    name: chartItem.title,
    total: chartItem.total,
    color: randomColor(),
    legendFontColor: theme.colors.white,
    legendFontSize: 11,
  }));

  React.useEffect(() => {
    dispatch(setDashboardIsLoadingAction(true));
    dispatch(getAsyncDashboardAction());
  }, [dispatch]);

  return (
    <React.Fragment>
      <S.Container>
        <S.DashboardSection>
          <Card
            isLoading={isLoading}
            headerProps={{
              title: 'Saldo',
              right: () => (
                <Flutuation
                  isLoading={isLoading}
                  flutuation={balanceFlutuation}
                />
              ),
            }}>
            <S.CardText>{balance}</S.CardText>
          </Card>
        </S.DashboardSection>

        <S.DashboardSection>
          <Card
            isLoading={isLoading}
            variant="danger"
            headerProps={{
              title: 'A pagar',
              right: () => (
                <Flutuation
                  flutuation={debtsPercent}
                  isLoading={isLoading}
                  showIcon={false}
                />
              ),
            }}>
            <S.CardText>{debts}</S.CardText>
          </Card>
        </S.DashboardSection>

        <S.DashboardSection>
          <Card
            isLoading={isLoading}
            headerProps={{
              title: 'Despesas do mês',
            }}>
            <PieChart
              data={chartData}
              accessor="total"
              height={270}
              width={Dimensions.get('screen').width}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              chartConfig={{
                backgroundColor: '#ff3e03',
                backgroundGradientFrom: '#ff3e03',
                backgroundGradientTo: '#ff3e03',
                color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
              }}
            />
          </Card>
        </S.DashboardSection>

        <S.DashboardSection>
          <StatementsList
            statements={statements}
            isLoading={isLoading}
            title="Últimos lançamentos"
          />
        </S.DashboardSection>
      </S.Container>

      <Button
        title="Lançamentos"
        variant="success"
        onPress={() => navigation.navigate(Routes.STATEMENTS)}
      />
    </React.Fragment>
  );
};

export default Dashboard;
