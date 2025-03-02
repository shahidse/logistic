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
export const getCompanyById = createAsyncThunk(
  "company/get/id",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await CompanyApiService.getInstance().getCompanyById(
        id,
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
export const updateCompany = createAsyncThunk(
  "company/update",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await CompanyApiService.getInstance().updateCompany(
        userData.id,
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
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await CompanyApiService.getInstance().deleteCompany(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
