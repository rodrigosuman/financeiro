import { Reducer } from 'redux';
import ReduxActions from '../../../constants/reduxActions';
import { DashboardState } from './type';

const INITIAL_STATE: DashboardState = {
  data: undefined,
  isLoading: false,
};

const reducer: Reducer<DashboardState, any> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ReduxActions.SET_DASHBOARD:
      return { data: action.payload.data, isLoading: false };

    case ReduxActions.SET_DASHBOARD_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    default:
      return state;
  }
};

export default reducer;
