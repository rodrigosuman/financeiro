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
  isSendingMultSelect: undefined,
  multSelectedStatements: [],
  isMultSelect: false,
};

export const sumDebts = (data?: APIStatementType[]) => {
  let debts = 0;

  data?.forEach(statement => {
    if (statement.statementType.type === 'DEBT' && statement.status === 'NOT_PAID') {
      debts += statement.value;
    }
  });

  return debts;
};

export const sumSelectedItems = (data?: APIStatementType[]) => {
  let debts = 0;

  data?.forEach(statement => {
    debts += statement.value * (statement.statementType.type === 'DEBT' ? -1 : 1);
  });

  return debts;
};

const reducer: Reducer<StatementsState, any> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReduxActions.SET_MOUNTH_STATEMENTS:
      return {
        ...state,
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

    case ReduxActions.SET_STATEMENT_IS_MULT_SELECT:
      return {
        ...state,
        isMultSelect: action.payload.isMultSelect,
        multSelectedStatements: !action.payload.isMultSelect ? [] : state.multSelectedStatements,
      };

    case ReduxActions.SET_STATEMENT_MULT_SELECTE_ITEM: {
      const payloadItem = action.payload.multSelectedStatementItem;
      const item = state?.multSelectedStatements?.find(item => item.id === payloadItem?.id);

      let _multSelectedStatements = [...state?.multSelectedStatements];

      if (item?.id) {
        _multSelectedStatements = _multSelectedStatements.filter(item => item.id !== payloadItem?.id);
      } else {
        _multSelectedStatements.push(payloadItem);
      }

      return { ...state, multSelectedStatements: _multSelectedStatements };
    }

    case ReduxActions.CLEAR_STATEMENT_MULT_SELECTE_ITEM: {
      return { ...state, multSelectedStatements: [], isMultSelect: false, isSendingMultSelect: undefined };
    }

    case ReduxActions.SET_COPY_STATEMENTS_IS_SENDING: {
      return { ...state, isSendingMultSelect: action.payload.isSendingMultSelect };
    }

    default:
      return state;
  }
};

export default reducer;
