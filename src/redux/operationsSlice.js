import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getOperations = createAsyncThunk('operations/fetchOperations', async () => {
    const operations = await fetch('https://localhost:5173/operations');
    const parsed = await operations.json();
    return parsed;
});

const initialState = {
    operations: [],
    loading: false,
    errors: null,
};

const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getOperations.fulfilled, (state, { payload }) => {
                state.operations = payload.data;
                state.loading = false;
            })
            .addCase(getOperations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOperations.rejected, (state, { error }) => {
                state.error = error;
                state.loading = false;
            });
    },
});

export const selectOperations = (state) => state.operations;
export default operationsSlice;
