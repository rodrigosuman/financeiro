import { fork } from 'redux-saga/effects';
import dashboardSagas from './dashboard';
import statementsSagas from './statements';

function* sagas() {
  yield fork(dashboardSagas);
  yield fork(statementsSagas);
}

export default sagas;
