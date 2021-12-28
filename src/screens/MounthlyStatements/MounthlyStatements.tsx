import { lastDayOfMonth } from 'date-fns';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import { ModalRefProps } from '../../components/molecules/Modal/types';
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
  setMounthStatementsIsLoadingAction
} from '../../redux-store/redux-actions/statements';
import { getAsyncStatementTypesAction } from '../../redux-store/redux-actions/statementTypes';
import { StatementCreateEditFormRef } from '../StatmentCreateEditForm/types';
import * as S from './styles';

const MounthlyStatements: React.FC = () => {
  const navigation = useNavigation();
  const currencyFormater = useCurrencyFormater('BRL');
  const dispatch = useDispatch();

  const modalRef = React.useRef<ModalRefProps>({ toggleVisible: () => {} });
  const statementFormRef = React.useRef<StatementCreateEditFormRef>({
    setInitialData: () => {},
  });

  const { balance, data, isLoading } = useSelector(state => state.statements);

  const BALANCE = balance?.total || 0;
  const FLUTUATION = balance?.flutuation || 0;
  const STATEMENTS = data || [];

  const _balance = currencyFormater.format(BALANCE);
  const balanceFlutuation = FLUTUATION;

  const statements: StatementItem[] = STATEMENTS.map(statement => ({
    statamenteDate: new Date(statement.statementDate),
    status: statement.status,
    title: statement.statementType?.description,
    type: statement.statementType?.type,
    value: statement.value,
    id: statement.id,
  }));

  const getStatements = React.useCallback(
    (year: number, mounth: number) => {
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

  const statementDate = data?.[0]?.statementDate
    ? new Date(data?.[0]?.statementDate)
    : new Date();

  const maximumDate = lastDayOfMonth(statementDate);
  const MOUNTH = maximumDate.getMonth() + 1;
  const minimumDate = new Date(
    `${maximumDate.getFullYear()}-${MOUNTH > 9 ? MOUNTH : `0${MOUNTH}`}-01`,
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
              right: () => (
                <Flutuation
                  isLoading={isLoading}
                  flutuation={balanceFlutuation}
                />
              ),
            }}>
            <S.CardText>{_balance}</S.CardText>
          </Card>
        </S.ContainerSection>

        <S.ContainerSection>
          <StatementsList
            isLoading={isLoading}
            statements={statements}
            onItemPress={statement => {
              try {
                const _statement = data?.find(item => item.id === statement.id);
                // @ts-ignore
                navigation.navigate(Routes.CREATE_EDIT_STATEMENTS, {
                  maximumDate,
                  minimumDate,
                  statement: _statement,
                });
              } catch (error) {}
            }}
          />
        </S.ContainerSection>
      </S.Container>

      <Button
        title="Adicionar"
        variant="primary"
        onPress={() => {
          // @ts-ignore
          navigation.navigate(Routes.CREATE_EDIT_STATEMENTS, {
            maximumDate,
            minimumDate,
          });
        }}
      />
    </React.Fragment>
  );
};

export default MounthlyStatements;
