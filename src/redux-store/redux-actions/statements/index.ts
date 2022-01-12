import { action } from 'typesafe-actions';
import ReduxActions from '../../../constants/reduxActions';
import {
  APIBalance,
  APICopyStatements,
  APICreateStatementRequest,
  APIFindByMounthResponse,
  APIPatchStatementsBody,
  APIStatementType,
  APIUpdateCreditCards
} from '../../../types';

export const getAsyncMounthStatementsAction = (year: number, mounth: number) => {
  return action(ReduxActions.ASYNC_GET_MOUNTH_STATEMENTS, { year, mounth });
};

export const setMounthStatementsAction = ({ balance, results }: APIFindByMounthResponse) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS, { balance, data: results });
};

export const setMounthStatementsBalanceAction = (balance: APIBalance) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS_BALANCE, { balance });
};

export const setMounthStatementsIsLoadingAction = (isLoading: boolean) => {
  return action(ReduxActions.SET_MOUNTH_STATEMENTS_IS_LOADING, { isLoading });
};

export const asyncPostStatementAction = (statement: APICreateStatementRequest) => {
  return action(ReduxActions.ASYNC_CREATE_STATEMENTS, { statement });
};

export const asyncPatchStatementAction = (statements: APIPatchStatementsBody) => {
  return action(ReduxActions.ASYNC_UPDATE_STATEMENTS, statements);
};

export const asyncDeleteStatementAction = (ids: string[]) => {
  return action(ReduxActions.ASYNC_DELETE_STATEMENTS, {
    ids,
  });
};

export const setStatementsIsSendingAction = (isSending?: boolean) => {
  return action(ReduxActions.SET_STATEMENTS_IS_SENDING, { isSending });
};

export const setStatementsIsMultSelectAction = (isMultSelect?: boolean) => {
  return action(ReduxActions.SET_STATEMENT_IS_MULT_SELECT, { isMultSelect });
};

export const setStatementsMultSelectedItemAction = (multSelectedStatementItem?: APIStatementType) => {
  return action(ReduxActions.SET_STATEMENT_MULT_SELECTE_ITEM, { multSelectedStatementItem });
};

export const clearStatementsMultSelectedItemAction = () => {
  return action(ReduxActions.CLEAR_STATEMENT_MULT_SELECTE_ITEM);
};

export const asyncCopyStatementsAction = (data: APICopyStatements) => {
  return action(ReduxActions.ASYNC_COPY_STATEMENTS, data);
};

export const setCopyStatementsIsSendingAction = (isSendingMultSelect?: boolean) => {
  return action(ReduxActions.SET_COPY_STATEMENTS_IS_SENDING, { isSendingMultSelect });
};

export const asyncUpdateCreditCardsAction = (data: APIUpdateCreditCards) => {
  return action(ReduxActions.ASYNC_UPDATE_CREDIT_CARDS, data);
};

export const setPagination = (pagination: { year: number; mounth: number }) => {
  return action(ReduxActions.SET_PAGINATION_ARGS, { pagination });
};
