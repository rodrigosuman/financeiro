import { TypedUseSelectorHook, useSelector as reduxUseSelector } from 'react-redux';
import store from '../redux-store';

export type RootState = ReturnType<typeof store.getState>;

const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default useSelector;
