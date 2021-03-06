import { format } from 'date-fns';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import { RootState } from '../../../hooks/useSelector';
import {
  deleteStatements,
  getStatementsByMounth,
  patchStatements,
  postCopyStatements,
  postStatements,
  postUpdateCreditCards
} from '../../../services/api/actions';
import {
  APICopyStatements,
  APICreateStatementRequest,
  APIPatchStatementsBody,
  APIUpdateCreditCards
} from '../../../types';
import {
  clearStatementsMultSelectedItemAction,
  getAsyncMounthStatementsAction,
  setCopyStatementsIsSendingAction,
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

    const { pagination }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = pagination.mounth;
    const YEAR = pagination.year;

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

export function* asyncPatchStatements(args: { payload: APIPatchStatementsBody }): Generator<any, any, any> {
  try {
    const { statements } = args.payload;

    const { pagination }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = pagination.mounth;
    const YEAR = pagination.year;

    yield call(() => {
      return patchStatements({
        statements: statements.map(statement => {
          return {
            ...statement,
            statementDate: statement.statementDate
              ? format(new Date(statement.statementDate), 'yyyy/MM/dd')
              : undefined,
            id: statement.id,
          };
        }),
      });
    });

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(setCopyStatementsIsSendingAction(false));
    yield put(clearStatementsMultSelectedItemAction());
  } catch (error) {
    console.error(error);
  }
}

export function* asyncDeleteStatements(args: any): Generator<any, any, any> {
  try {
    const { ids } = args.payload;

    const { pagination }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = pagination.mounth;
    const YEAR = pagination.year;

    yield call(() => deleteStatements(ids));

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(setCopyStatementsIsSendingAction(false));
    yield put(clearStatementsMultSelectedItemAction());
  } catch (error) {
    console.error(error);
  }
}

export function* asyncCopyStatements(args: { payload: APICopyStatements }): Generator<any, any, any> {
  try {
    const { statements, year } = args.payload;

    const { pagination }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = pagination.mounth;
    const YEAR = pagination.year;

    yield call(() =>
      postCopyStatements({
        statements,
        year,
      }),
    );

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(setCopyStatementsIsSendingAction(false));
    yield put(clearStatementsMultSelectedItemAction());
  } catch (error) {
    console.log({ error });
  }
}

export function* asyncUpdateCreditCards(args: { payload: APIUpdateCreditCards }): Generator<any, any, any> {
  try {
    const { pagination }: StatementsState = yield select((state: RootState) => state?.statements);

    const MOUNTH = pagination.mounth;
    const YEAR = pagination.year;

    yield call(() => postUpdateCreditCards(args.payload));

    yield put(getAsyncMounthStatementsAction(YEAR, MOUNTH));
    yield put(setStatementsIsSendingAction(false));
    yield put(setCopyStatementsIsSendingAction(false));
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
  yield takeLatest(ReduxActions.ASYNC_UPDATE_CREDIT_CARDS, (data: any) => asyncUpdateCreditCards(data));
}

export default sagas;
