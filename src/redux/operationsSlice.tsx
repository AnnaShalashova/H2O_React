import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OperationType } from '../share/utils';

export const getOperations = createAsyncThunk<OperationsResponse>(
  'operations/fetchOperations',
  async () => {
    const operations = await fetch('https://localhost:5173/operations');
    const parsed = await operations.json();
    return parsed;
  }
);

export enum DivisionType {
  B2B = 'B2B',
  B2C = 'B2C',
  TOTAL = 'total'
}

type OperationsResponse = {
  data: Operation[];
}

export type Operation = {
  division: DivisionType;
  date: string;
  amount: number;
  type: OperationType;
};

type OperationsState = {
  operations: Operation[];
  loading: boolean;
  error: string | null;
};

const initialState: OperationsState = {
  operations: [],
  loading: false,
  error: null,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOperations.fulfilled, (state, action: PayloadAction<OperationsResponse>) => {
        state.operations = action.payload.data;
        state.loading = false;
      })
      .addCase(getOperations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOperations.rejected, (state) => {
        state.error = 'Something went wrong. Try again.';
        state.loading = false;
      });
  },
});

export default operationsSlice;
