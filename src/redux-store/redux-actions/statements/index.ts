import { action } from 'typesafe-actions';
import ReduxActions from '../../../constants/reduxActions';
import {
  APIBalance,
  APICreateStatementRequest,
  APIFindByMounthResponse,
  APIPatchStatementRequest
} from '../../../types';

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

export const asyncPostStatementAction = (
  statement: APICreateStatementRequest,
) => {
  return action(ReduxActions.ASYNC_CREATE_STATEMENTS, { statement });
};

export const asyncPatchStatementAction = (
  statement: Partial<APIPatchStatementRequest>,
) => {
  return action(ReduxActions.ASYNC_UPDATE_STATEMENTS, { statement });
};

export const asyncDeleteStatementAction = (
  statementId: string,
  statementDate: Date,
) => {
  return action(ReduxActions.ASYNC_DELETE_STATEMENTS, {
    statementId,
    statementDate,
  });
};

export const setStatementsIsSendingAction = (isSending?: boolean) => {
  return action(ReduxActions.SET_STATEMENTS_IS_SENDING, { isSending });
};
