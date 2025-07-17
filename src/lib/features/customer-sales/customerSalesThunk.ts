import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerSalesApiService } from "../../../services/CustomerSalesApiService";

export const addCustomerSale = createAsyncThunk(
  "customerSales/addCustomerSale",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response =
        await CustomerSalesApiService.getInstance().createCustomerSales(
          payload
        );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message || "Failed to add sale");
    }
  }
);

export const getCustomerSales = createAsyncThunk(
  "customerSales/getCustomerSales",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await CustomerSalesApiService.getInstance().getCustomerSales();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Failed to fetch sales"
      );
    }
  }
);

export const getCustomerSaleById = createAsyncThunk(
  "customerSales/getCustomerSaleById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response =
        await CustomerSalesApiService.getInstance().getCustomerSalesId(id);
      return response.data;
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
      const response =
        await CustomerSalesApiService.getInstance().updateCustomerSales(
          id,
          data
        );
      return response.data;
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
      await CustomerSalesApiService.getInstance().deleteDCustomerSales(id);
      return id; // Return the ID of the deleted sale
    } catch (err: any) {
      return rejectWithValue(
        err.response.data.message || "Failed to delete sale"
      );
    }
  }
);
