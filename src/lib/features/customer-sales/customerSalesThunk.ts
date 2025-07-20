import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerSalesApiService } from "../../../services/CustomerSalesApiService";

export const addCustomerSale = createAsyncThunk(
  "customerSales/addCustomerSale",
  async (payload: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response =
        await CustomerSalesApiService.getInstance().createCustomerSales(
          payload,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add sale");
    }
  }
);

export const getCustomerSales = createAsyncThunk(
  "customerSales/getCustomerSales",
  async (arg, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response =
        await CustomerSalesApiService.getInstance().getCustomerSales(arg, {
          headers: { authorization: `Bearer ${token}` },
        });
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.message || "Failed to fetch sales"
      );
    }
  }
);

export const getCustomerSaleById = createAsyncThunk(
  "customerSales/getCustomerSaleById",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response =
        await CustomerSalesApiService.getInstance().getCustomerSalesId(id, {
          headers: { authorization: `Bearer ${token}` },
        });
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Failed to fetch sale"
      );
    }
  }
);
export const updateCustomerSale = createAsyncThunk(
  "customerSales/updateCustomerSale",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response =
        await CustomerSalesApiService.getInstance().updateCustomerSales(
          id,
          data,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Failed to update sale"
      );
    }
  }
);
export const deleteCustomerSale = createAsyncThunk(
  "customerSales/deleteCustomerSale",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      await CustomerSalesApiService.getInstance().deleteDCustomerSales(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return id; // Return the ID of the deleted sale
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Failed to delete sale"
      );
    }
  }
);
