import { action } from 'typesafe-actions';
import ReduxActions from '../../../constants/reduxActions';
import { APIStatementTypes } from '../../../types';

export const getAsyncStatementTypesAction = () => {
  return action(ReduxActions.ASYNC_GET_STATEMENT_TYPES);
};

export const setStatementTypesAction = (data: APIStatementTypes[]) => {
  return action(ReduxActions.SET_STATEMENT_TYPES, { data });
};
