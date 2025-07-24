import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getReports } from './reportsThunk';


interface ReportState {
    reports: any;
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    reports: {},
    loading: false,
    error: null,
};

const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        fetchReportsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchReportsSuccess(state, action: PayloadAction<any[]>) {
            state.loading = false;
            state.reports = action.payload;
        },
        fetchReportsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearReports(state) {
            state.reports = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReports.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    fetchReportsStart,
    fetchReportsSuccess,
    fetchReportsFailure,
    clearReports,
} = reportSlice.actions;

export default reportSlice.reducer;