import { call, put, takeLatest } from 'redux-saga/effects';
import ReduxActions from '../../../constants/reduxActions';
import { getStatementTypes } from '../../../services/api/actions';
import { setStatementTypesAction } from '../../redux-actions/statementTypes';

export function* asyncGetStatementTypes(): Generator<any, any, any> {
  try {
    const response = yield call(() => getStatementTypes());

    yield put(setStatementTypesAction(response.data));
  } catch (error) {}
}

function* sagas() {
  yield takeLatest(
    ReduxActions.ASYNC_GET_STATEMENT_TYPES,
    asyncGetStatementTypes,
  );
}

export default sagas;
