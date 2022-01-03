import { Reducer } from 'redux';
import ReduxActions from '../../../constants/reduxActions';
import { APIStatementType } from '../../../types';
import { StatementsState } from './types';

const INITIAL_STATE: StatementsState = {
  data: [],
  balance: {
    flutuation: 0,
    total: 0,
    estimate: 0,
  },
  isLoading: false,
  isSending: undefined,
};

export const sumDebts = (data?: APIStatementType[]) => {
  let debts = 0;

  data?.forEach(statement => {
    if (
      statement.statementType.type === 'DEBT' &&
      statement.status === 'NOT_PAID'
    ) {
      debts += statement.value;
    }
  });

  return debts;
};

const reducer: Reducer<StatementsState, any> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ReduxActions.SET_MOUNTH_STATEMENTS:
      return {
        data: action.payload.data,
        isLoading: false,
        isSending: false,
        balance: action.payload.balance,
      };

    case ReduxActions.SET_MOUNTH_STATEMENTS_IS_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    case ReduxActions.SET_STATEMENTS_IS_SENDING:
      return { ...state, isSending: action.payload.isSending };

    case ReduxActions.SET_MOUNTH_STATEMENTS_BALANCE:
      return { ...state, balance: action.payload.balance };

    default:
      return state;
  }
};

export default reducer;
