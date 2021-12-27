import { fork } from 'redux-saga/effects';
import dashboardSagas from './dashboard';

function* sagas() {
  yield fork(dashboardSagas);
}

export default sagas;
