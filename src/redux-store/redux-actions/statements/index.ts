import { action } from 'typesafe-actions';
import ReduxActions from '../../../constants/reduxActions';
import { APIBalance, APIFindByMounthResponse } from '../../../types';

export const getAsyncMounthStatementsAction = (
  year: number,
  mounth: number,
) => {
  return action(ReduxActions.ASYNC_GET_MOUNTH_STATEMENTS, { year, mounth });
};

export const setMounthStatementsAction = ({
  balance,
  results,
}: APIFindByMounthResponse) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS, { balance, data: results });
};

export const setMounthStatementsBalanceAction = (balance: APIBalance) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS_BALANCE, { balance });
};

export const setMounthStatementsIsLoadingAction = (isLoading: boolean) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS_IS_LOADING, { isLoading });
};
