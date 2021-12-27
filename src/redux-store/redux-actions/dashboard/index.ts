import { action } from 'typesafe-actions';
import ReduxActions from '../../../constants/reduxActions';
import { APIDashboardReponse } from '../../../types';

export const getAsyncDashboardAction = () => {
  return action(ReduxActions.ASYNC_GET_DASHBOARD);
};
export const setDashboardAction = (data: APIDashboardReponse) => {
  return action(ReduxActions.SET_DASHBOARD, { data });
};

export const setDashboardIsLoadingAction = (isLoading: boolean) => {
  return action(ReduxActions.SET_DASHBOARD_LOADING, { isLoading });
};
