import { combineReducers, configureStore } from '@reduxjs/toolkit';
import operationsSlice from './operationsSlice';

export const store = configureStore({
  reducer: combineReducers({
    [operationsSlice.name]: operationsSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
