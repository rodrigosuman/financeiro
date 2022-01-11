import { lastDayOfMonth } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/atoms/Button';
import Card from '../../components/molecules/Card';
import Flutuation from '../../components/molecules/Flutuation';
import MounthPagination from '../../components/molecules/MounthPagination/MounthPagination';
import MounthResume from '../../components/molecules/MounthResume';
import { MounthResumeProps } from '../../components/molecules/MounthResume/types';
import ShareIcon from '../../components/molecules/ShareIcon';
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
  setPagination,
  setStatementsIsMultSelectAction,
  setStatementsIsSendingAction,
  setStatementsMultSelectedItemAction
} from '../../redux-store/redux-actions/statements';
import { getAsyncStatementTypesAction } from '../../redux-store/redux-actions/statementTypes';
import { sumDebts, sumSelectedItems } from '../../redux-store/redux-reducers/statements';
import { APIStatementType } from '../../types';
import * as S from './styles';

const MounthlyStatements: React.FC = () => {
  const navigation = useNavigation();
  const currencyFormater = useCurrencyFormater('BRL');
  const dispatch = useDispatch();

  const { balance, data, isLoading, isMultSelect, multSelectedStatements } = useSelector(state => state.statements);

  const BALANCE = balance?.total || 0;
  const ESTIMATE = balance?.estimate || 0;
  const FLUTUATION = balance?.flutuation || 0;
  const STATEMENTS = data || [];
  const CURRENT_DATE = new Date();
  const DEBTS = sumDebts(data);
  const SELECTED_ITEMS_SUM = sumSelectedItems(multSelectedStatements);

  const _debts = currencyFormater.format(DEBTS);
  const _balance = currencyFormater.format(BALANCE);
  const _estimate = currencyFormater.format(ESTIMATE);
  const _selectedItemsSum = currencyFormater.format(SELECTED_ITEMS_SUM);
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
      dispatch(setPagination({ mounth, year }));
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

  const navigateToUpdateCards = React.useCallback(
    (statement?: APIStatementType) => {
      dispatch(setStatementsIsSendingAction(undefined));
      // @ts-ignore
      navigation.navigate(Routes.UPDATE_CARDS, {
        statement,
      });
    },
    [dispatch, navigation],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isMultSelect ? (SELECTED_ITEMS_SUM ? _selectedItemsSum : '') : 'Lançamentos',
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: -12,
          }}>
          {isMultSelect ? (
            <ShareIcon />
          ) : !isLoading ? (
            <S.UpdateCreditCardButton onPress={() => navigateToUpdateCards()}>
              {icons.CREDIT_CARD({ size: 18 })}
              <S.UpdateCardButtonText>Atualizar cartões</S.UpdateCardButtonText>
            </S.UpdateCreditCardButton>
          ) : (
            <></>
          )}
        </View>
      ),
    });
  }, [
    navigation,
    isMultSelect,
    dispatch,
    multSelectedStatements,
    SELECTED_ITEMS_SUM,
    _selectedItemsSum,
    navigateToUpdateCards,
    isLoading,
  ]);

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
    return new Date(`${maximumDate.getFullYear()}-${mountMounth(MOUNTH)}-01T00:00`);
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
            variant="danger"
            light
            headerProps={{
              title: 'Total a pagar',
              right: () => <Flutuation isLoading={isLoading} flutuation={(DEBTS / BALANCE) * 100} showIcon={false} />,
            }}>
            <S.CardText>{_debts}</S.CardText>
          </Card>
        </S.ContainerSection>

        <S.ContainerSection>
          <Card
            isLoading={isLoading}
            light
            headerProps={{
              title: 'Saldo estimado',
              right: () => <Flutuation isLoading={isLoading} flutuation={balanceFlutuation} />,
            }}>
            <S.CardText>{_estimate}</S.CardText>
          </Card>
        </S.ContainerSection>

        <S.ContainerSection>
          <StatementsList
            multSelect={isMultSelect}
            isLoading={isLoading}
            statements={statements}
            onToggleMultSelect={() => dispatch(setStatementsIsMultSelectAction(true))}
            onItemPress={statement => {
              try {
                const _statement = data?.find(item => item.id === statement.id);
                navigateToCreateEditForm(_statement);
              } catch (error) {}
            }}
            onCheckPress={(value, item) => {
              const statementItem = data?.find?.(statement => statement.id === item?.id);

              statementItem && dispatch(setStatementsMultSelectedItemAction(statementItem));
            }}
          />
        </S.ContainerSection>
      </S.Container>

      <Button
        title="Adicionar"
        variant="primary"
        isSending={isLoading}
        onPress={() => {
          navigateToCreateEditForm();
        }}
      />
    </React.Fragment>
  );
};

export default MounthlyStatements;
