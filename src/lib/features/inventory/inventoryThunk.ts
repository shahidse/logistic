import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialInventoryState } from "./inventorySlice";
import { InventoryApiService } from "@/services/InventoryApiService";

export const addInventory = createAsyncThunk(
  "inventory/add",
  async (inventoryData: InitialInventoryState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await InventoryApiService.getInstance().createInventory(
        inventoryData,
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

export const getInventories = createAsyncThunk(
  "inventory/get",
  async (query: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await InventoryApiService.getInstance().getInventories(
        query,
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

export const getInventoryById = createAsyncThunk(
  "inventory/get/id",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await InventoryApiService.getInstance().getInventoryById(
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

export const updateInventory = createAsyncThunk(
  "inventory/update",
  async (
    inventoryData: { id: string; data: InitialInventoryState["form"] },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await InventoryApiService.getInstance().updateInventory(
        inventoryData.id,
        inventoryData.data,
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

export const deleteInventory = createAsyncThunk(
  "inventory/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await InventoryApiService.getInstance().deleteInventory(
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
