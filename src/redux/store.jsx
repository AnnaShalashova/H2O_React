import { combineReducers, configureStore } from '@reduxjs/toolkit';
import operationsSlice from './operationsSlice';


export const store = configureStore({
  reducer: combineReducers({
    [operationsSlice.name]: operationsSlice.reducer,

  }),
});
