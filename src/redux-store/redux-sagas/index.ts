import { fork } from 'redux-saga/effects';
import dashboardSagas from './dashboard';
import statementsSagas from './statements';
import statementTypesSagas from './statementTypes';

function* sagas() {
  yield fork(dashboardSagas);
  yield fork(statementsSagas);
  yield fork(statementTypesSagas);
}

export default sagas;
