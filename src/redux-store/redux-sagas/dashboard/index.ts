import { call, put, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import { getDashboard } from '../../../services/api/actions';
import { setDashboardAction } from '../../redux-actions/dashboard';

export function* asyncGetDashboard(): Generator<any, any, any> {
  try {
    const response = yield call(getDashboard);

    yield put(setDashboardAction(response.data));
  } catch (error) {
    console.log({ error });
  }
}

function* sagas() {
  yield takeLatest(ReduxActions.ASYNC_GET_DASHBOARD, asyncGetDashboard);
}

export default sagas;
