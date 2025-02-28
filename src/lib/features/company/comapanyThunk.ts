import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./comapanySlice";
import { CompanyApiService } from "@/services/CompanyApiService";

export const addCompany = createAsyncThunk(
  "company/add",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await CompanyApiService.getInstance().createCompany(
        userData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCompany = createAsyncThunk(
  "company/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await CompanyApiService.getInstance().getCompanies({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
