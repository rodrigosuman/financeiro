import { format } from 'date-fns';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import { RootState } from '../../../hooks/useSelector';
import {
  deleteStatements,
  getStatementsByMounth,
  patchStatements,
  postCopyStatements,
  postStatements
} from '../../../services/api/actions';
import { APICopyStatements, APICreateStatementRequest, APIPatchStatementRequest } from '../../../types';
import {
  clearStatementsMultSelectedItemAction,
  getAsyncMounthStatementsAction,
  setMounthStatementsAction,
  setStatementsIsSendingAction
} from '../../redux-actions/statements';
import { StatementsState } from '../../redux-reducers/statements/types';

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
  } catch (error) {
    console.error(error);
  }
}

export function* asyncCopyStatements(args: { payload: APICopyStatements }): Generator<any, any, any> {
  try {
    const { statements, year } = args.payload;

    const { data }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = new Date(data?.[0]?.statementDate || new Date()).getMonth() + 1;
    const YEAR = new Date(data?.[0]?.statementDate || new Date()).getFullYear();

    yield call(() =>
      postCopyStatements({
        statements,
        year,
      }),
    );

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(clearStatementsMultSelectedItemAction());
  } catch (error) {
    console.log({ error });
  }
}

function* sagas() {
  yield takeLatest(ReduxActions.ASYNC_GET_MOUNTH_STATEMENTS, asyncGetStatementsByMounth);
  yield takeLatest(ReduxActions.ASYNC_CREATE_STATEMENTS, (data: any) => asyncCreateStatements(data));
  yield takeLatest(ReduxActions.ASYNC_UPDATE_STATEMENTS, (data: any) => asyncPatchStatements(data));
  yield takeLatest(ReduxActions.ASYNC_DELETE_STATEMENTS, (data: any) => asyncDeleteStatements(data));
  yield takeLatest(ReduxActions.ASYNC_COPY_STATEMENTS, (data: any) => asyncCopyStatements(data));
}

export default sagas;
