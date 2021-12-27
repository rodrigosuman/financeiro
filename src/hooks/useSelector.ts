import {
  TypedUseSelectorHook,
  useSelector as reduxUseSelector
} from 'react-redux';
import store from '../redux-store';

type RootState = ReturnType<typeof store.getState>;

const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default useSelector;
