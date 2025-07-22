import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportsApiService } from '../../../services/ReportsApiService';

export const getReports = createAsyncThunk(
  "sales/get",
  async (arg: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ReportsApiService.getInstance().getReport(arg, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);






