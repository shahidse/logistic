import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addInventory,
  getInventoryById,
  getInventories,
} from "./inventoryThunk";

export type InventoryPriority =
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "EnRoute";

export interface InventoryForm {
  name: string;
  description: string;
  location: string;
  priority: InventoryPriority;
  isActive: boolean;
  brands: string; // assuming the brand is selected by ID
}

export interface InitialInventoryState {
  loading: boolean;
  error: string;
  id: string;
  form: InventoryForm;
  data: unknown[];
}

const initialState: InitialInventoryState = {
  loading: false,
  error: "",
  id: "",
  form: {
    name: "",
    description: "",
    location: "",
    priority: "Tertiary",
    isActive: true,
    brands: "", // will hold the brand ID
  },
  data: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{
        key: keyof InitialInventoryState;
        value: InitialInventoryState[keyof InitialInventoryState];
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFormField: (
      state,
      action: PayloadAction<{
        key: keyof InventoryForm;
        value: InventoryForm[keyof InventoryForm];
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInventory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        addInventory.fulfilled,
        (state, action: PayloadAction<unknown[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(addInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getInventories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getInventories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getInventories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getInventoryById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.form = {
          name: action.payload.name,
          description: action.payload.description,
          location: action.payload.location,
          priority: action.payload.priority,
          isActive: action.payload.isActive,
          brands: action.payload.brands?.id || "",
        };
      })
      .addCase(getInventoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setState, setFormField, resetForm, resetState } =
  inventorySlice.actions;

export default inventorySlice.reducer;
