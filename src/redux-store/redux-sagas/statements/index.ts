import { call, put, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import { getStatementsByMounth } from '../../../services/api/actions';
import { setMounthStatementsAction } from '../../redux-actions/statements';

export function* asyncGetDashboard(args: any): Generator<any, any, any> {
  try {
    console.log({ args });

    const { year, mounth } = args.payload;

    const response = yield call(() => getStatementsByMounth(year, mounth));

    yield put(setMounthStatementsAction(response.data));
  } catch (error) {}
}

function* sagas() {
  yield takeLatest(ReduxActions.ASYNC_GET_MOUNTH_STATEMENTS, asyncGetDashboard);
}

export default sagas;
