import { Reducer } from 'redux';
import ReduxActions from '../../../constants/reduxActions';
import { StatementsState } from './types';

const INITIAL_STATE: StatementsState = {
  data: [],
  balance: {
    flutuation: 0,
    total: 0,
  },
  isLoading: false,
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
        balance: action.payload.balance,
      };

    case ReduxActions.SET_MOUNTH_STATEMENTS_IS_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    case ReduxActions.SET_MOUNTH_STATEMENTS_BALANCE:
      return { ...state, balance: action.payload.balance };

    default:
      return state;
  }
};

export default reducer;
