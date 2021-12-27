import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Button from '../../components/atoms/Button';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import StatementsList from '../../components/molecules/StatementsList';
import Routes from '../../constants/routesPath';
import useCurrencyFormater from '../../hooks/useCurrencyFormater';
import useNavigation from '../../hooks/useNavigation';
import * as S from './styles';

const data = [
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

  const balance = currencyFormater.format(18693.45);
  const balanceFlutuation = 29;
  const debts = currencyFormater.format(5863.41);
  const debtsPercent = (5863.41 / 18693.45) * 100;

  return (
    <React.Fragment>
      <S.Container>
        <S.DashboardSection>
          <Card
            headerProps={{
              title: 'Saldo',
              right: () => <Flutuation flutuation={balanceFlutuation} />,
            }}>
            <S.CardText>{balance}</S.CardText>
          </Card>
        </S.DashboardSection>

        <S.DashboardSection>
          <Card
            variant="danger"
            headerProps={{
              title: 'A pagar',
              right: () => (
                <Flutuation flutuation={debtsPercent} showIcon={false} />
              ),
            }}>
            <S.CardText>{debts}</S.CardText>
          </Card>
        </S.DashboardSection>

        <S.DashboardSection>
          <Card
            headerProps={{
              title: 'Despesas do mês',
            }}>
            <PieChart
              data={data}
              accessor="population"
              height={250}
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
            statements={[
              {
                statamenteDate: new Date(),
                status: 'NOT_PAID',
                title: 'Teste',
                type: 'CREDIT',
                value: 999,
              },
              {
                statamenteDate: new Date(),
                status: 'NOT_PAID',
                title: 'Teste',
                type: 'CREDIT',
                value: 999,
              },
              {
                statamenteDate: new Date(),
                status: 'PAID',
                title: 'Teste',
                type: 'CREDIT',
                value: 999,
              },
              {
                statamenteDate: new Date(),
                status: 'PAID',
                title: 'Teste',
                type: 'DEBIT',
                value: 999,
              },
              {
                statamenteDate: new Date(),
                status: 'PAID',
                title: 'Teste',
                type: 'CREDIT',
                value: 999,
              },
            ]}
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
