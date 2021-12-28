import { combineReducers } from 'redux';
import dashboard from './dashboard';
import statements from './statements';
import statementTypes from './statementTypes';

const reducers = combineReducers({
  dashboard,
  statements,
  statementTypes,
});

export default reducers;
