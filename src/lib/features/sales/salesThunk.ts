import { createAsyncThunk } from "@reduxjs/toolkit";
import { SalesApiService } from "@/services/SalesApiService";
import { InitialState } from "./saleSlice";
import { li } from "framer-motion/client";

export const addSale = createAsyncThunk(
  "sales/add",
  async (saleData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await SalesApiService.getInstance().createSales(
        saleData,
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

export const getSales = createAsyncThunk(
  "sales/get",
  async (arg: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await SalesApiService.getInstance().getSales(arg, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSaleById = createAsyncThunk(
  "sales/get/id",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await SalesApiService.getInstance().getSalesById(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSale = createAsyncThunk(
  "sales/update",
  async (
    saleData: { id: string, data: InitialState["form"] },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await SalesApiService.getInstance().updateSales(
        saleData.id,
        saleData.data,
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

export const deleteSale = createAsyncThunk(
  "sales/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await SalesApiService.getInstance().deleteSales(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
