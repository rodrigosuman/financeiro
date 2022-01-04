import { format } from 'date-fns';
import { call, put, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import {
  deleteStatements,
  getStatementsByMounth,
  patchStatements,
  postStatements
} from '../../../services/api/actions';
import { APICreateStatementRequest, APIPatchStatementRequest } from '../../../types';
import { getAsyncDashboardAction } from '../../redux-actions/dashboard';
import {
  getAsyncMounthStatementsAction,
  setMounthStatementsAction,
  setStatementsIsSendingAction
} from '../../redux-actions/statements';

export function* asyncGetStatementsByMounth(args: any): Generator<any, any, any> {
  try {
    const { year, mounth } = args.payload;

    const response = yield call(() => getStatementsByMounth(year, mounth));

    yield put(setMounthStatementsAction(response.data));
  } catch (error) {}
}

export function* asyncCreateStatements(args: {
  payload: { statement: APICreateStatementRequest };
}): Generator<any, any, any> {
  try {
    const { statement } = args.payload;

    const MOUNTH = statement.statementDate.getMonth() + 1;
    const YEAR = statement.statementDate.getFullYear();

    yield call(() =>
      postStatements({
        statement: {
          ...statement,
          statementDate: format(statement.statementDate, 'yyyy/MM/dd'),
          frequency: undefined,
          customValues: undefined,
        },
        frequency: statement.frequency,
        customValues: statement.customValues,
      }),
    );

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(getAsyncDashboardAction());
  } catch (error) {
    console.error(error);
  }
}

export function* asyncPatchStatements(args: {
  payload: { statement: APIPatchStatementRequest };
}): Generator<any, any, any> {
  try {
    const { statement } = args.payload;

    const MOUNTH = statement.statementDate.getMonth() + 1;
    const YEAR = statement.statementDate.getFullYear();

    yield call(() =>
      patchStatements(statement.id, {
        ...statement,
        statementDate: format(statement.statementDate, 'yyyy/MM/dd'),
        id: undefined,
      }),
    );

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(getAsyncDashboardAction());
  } catch (error) {
    console.error(error);
  }
}

export function* asyncDeleteStatements(args: any): Generator<any, any, any> {
  try {
    const { statementId, statementDate } = args.payload;

    const MOUNTH = statementDate.getMonth() + 1;
    const YEAR = statementDate.getFullYear();

    yield call(() => deleteStatements(statementId));

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(getAsyncDashboardAction());
  } catch (error) {
    console.error(error);
  }
}

function* sagas() {
  yield takeLatest(ReduxActions.ASYNC_GET_MOUNTH_STATEMENTS, asyncGetStatementsByMounth);
  yield takeLatest(ReduxActions.ASYNC_CREATE_STATEMENTS, (data: any) => asyncCreateStatements(data));

  yield takeLatest(ReduxActions.ASYNC_UPDATE_STATEMENTS, (data: any) => asyncPatchStatements(data));

  yield takeLatest(ReduxActions.ASYNC_DELETE_STATEMENTS, (data: any) => asyncDeleteStatements(data));
}

export default sagas;
