import { lastDayOfMonth } from 'date-fns';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import MounthPagination from '../../components/molecules/MounthPagination/MounthPagination';
import MounthResume from '../../components/molecules/MounthResume';
import { MounthResumeProps } from '../../components/molecules/MounthResume/types';
import { StatementItem } from '../../components/molecules/StatementItem/types';
import StatementsList from '../../components/molecules/StatementsList';
import Routes from '../../constants/routesPath';
import useCurrencyFormater from '../../hooks/useCurrencyFormater';
import useNavigation from '../../hooks/useNavigation';
import useSelector from '../../hooks/useSelector';
import icons from '../../icons';
import {
  getAsyncMounthStatementsAction,
  setMounthStatementsIsLoadingAction,
  setStatementsIsSendingAction
} from '../../redux-store/redux-actions/statements';
import { getAsyncStatementTypesAction } from '../../redux-store/redux-actions/statementTypes';
import { APIStatementType } from '../../types';
import * as S from './styles';

const MounthlyStatements: React.FC = () => {
  const navigation = useNavigation();
  const currencyFormater = useCurrencyFormater('BRL');
  const dispatch = useDispatch();

  const { balance, data, isLoading } = useSelector(state => state.statements);

  const BALANCE = balance?.total || 0;
  const ESTIMATE = balance?.estimate || 0;
  const FLUTUATION = balance?.flutuation || 0;
  const STATEMENTS = data || [];
  const CURRENT_DATE = new Date();

  const _balance = currencyFormater.format(BALANCE);
  const _estimate = currencyFormater.format(ESTIMATE);
  const balanceFlutuation = FLUTUATION;
  const _year = React.useRef<number>(CURRENT_DATE.getFullYear());
  const _mounth = React.useRef<number>(CURRENT_DATE.getMonth() + 1);

  const statements: StatementItem[] = STATEMENTS.map(statement => ({
    statamenteDate: new Date(statement.statementDate + 'T23:59'),
    status: statement.status,
    title: statement.statementType?.description,
    type: statement.statementType?.type,
    value: statement.value,
    id: statement.id,
  }));

  const getStatements = React.useCallback(
    (year: number, mounth: number) => {
      _year.current = year;
      _mounth.current = mounth;
      dispatch(setMounthStatementsIsLoadingAction(true));
      dispatch(getAsyncMounthStatementsAction(year, mounth));
    },
    [dispatch],
  );

  const resume = React.useMemo<MounthResumeProps>(() => {
    let credits = 0;
    let fixedDebts = 0;
    let variablesDebts = 0;

    data?.forEach(statement => {
      const VALUE = statement.value;
      if (statement.statementType?.type === 'CREDIT') {
        credits += VALUE;
      } else {
        if (statement.statementType?.frequency === 'FIXED') {
          fixedDebts += VALUE;
        } else {
          variablesDebts += VALUE;
        }
      }
    });

    return {
      credits,
      fixedDebts,
      variablesDebts,
    };
  }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>{icons.FILTER({ size: 24 })}</TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    const CURRENT_DATE = new Date();
    getStatements(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() + 1);
    dispatch(getAsyncStatementTypesAction());
  }, [dispatch, getStatements]);

  const mountMounth = (mount: number) => {
    return mount > 9 ? mount : `0${mount}`;
  };

  const statementDate = data?.[0]?.statementDate
    ? new Date(data?.[0]?.statementDate + 'T23:59')
    : new Date(`${_year.current}-${mountMounth(_mounth.current)}-10T23:59`);

  const maximumDate = lastDayOfMonth(statementDate);
  const MOUNTH = maximumDate.getMonth() + 1;

  const minimumDate = React.useMemo(() => {
    return new Date(
      `${maximumDate.getFullYear()}-${mountMounth(MOUNTH)}-01T00:00`,
    );
  }, [MOUNTH, maximumDate]);

  const navigateToCreateEditForm = React.useCallback(
    (statement?: APIStatementType) => {
      dispatch(setStatementsIsSendingAction(undefined));
      // @ts-ignore
      navigation.navigate(Routes.CREATE_EDIT_STATEMENTS, {
        maximumDate,
        minimumDate,
        statement,
      });
    },
    [dispatch, maximumDate, minimumDate, navigation],
  );

  return (
    <React.Fragment>
      <MounthPagination
        onPaginate={pagination => {
          getStatements(pagination.year, pagination.mounth);
        }}
      />

      <S.Container>
        <S.ContainerSection>
          <Card
            headerProps={{
              title: 'Resumo mensal',
            }}>
            <MounthResume isLoading={isLoading} {...resume} />
          </Card>
        </S.ContainerSection>
        <S.ContainerSection>
          <Card
            isLoading={isLoading}
            headerProps={{
              title: 'Saldo em conta',
            }}>
            <S.CardText>{_balance}</S.CardText>
          </Card>
        </S.ContainerSection>

        <S.ContainerSection>
          <Card
            isLoading={isLoading}
            headerProps={{
              title: 'Saldo estimado',
              right: () => (
                <Flutuation
                  isLoading={isLoading}
                  flutuation={balanceFlutuation}
                />
              ),
            }}>
            <S.CardText>{_estimate}</S.CardText>
          </Card>
        </S.ContainerSection>

        <S.ContainerSection>
          <StatementsList
            isLoading={isLoading}
            statements={statements}
            onItemPress={statement => {
              try {
                const _statement = data?.find(item => item.id === statement.id);
                navigateToCreateEditForm(_statement);
              } catch (error) {}
            }}
          />
        </S.ContainerSection>
      </S.Container>

      <Button
        title="Adicionar"
        variant="primary"
        onPress={() => {
          navigateToCreateEditForm();
        }}
      />
    </React.Fragment>
  );
};

export default MounthlyStatements;
