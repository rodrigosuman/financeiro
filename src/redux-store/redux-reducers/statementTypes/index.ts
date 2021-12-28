import { Reducer } from 'redux';
import ReduxActions from '../../../constants/reduxActions';
import { StatementTypesState } from './types';

const INITIAL_STATE: StatementTypesState = {
  data: [],
  isLoading: false,
};

const reducer: Reducer<StatementTypesState, any> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ReduxActions.SET_STATEMENT_TYPES:
      return {
        data: action.payload.data,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
