import { combineReducers } from 'redux';
import dashboard from './dashboard';
import statements from './statements';

const reducers = combineReducers({
  dashboard,
  statements,
});

export default reducers;
