import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./productsSlice";
import { ProductsApiService } from "@/services/ProductsApiService";

export const addProducts = createAsyncThunk(
  "products/add",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ProductsApiService.getInstance().createProducts(
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
export const getProducts = createAsyncThunk(
  "products/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ProductsApiService.getInstance().getCompanies({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsById = createAsyncThunk(
  "products/get/id",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ProductsApiService.getInstance().getProductsById(
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
export const updateProducts = createAsyncThunk(
  "products/update",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ProductsApiService.getInstance().updateProducts(
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
export const deleteProducts = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await ProductsApiService.getInstance().deleteProducts(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
