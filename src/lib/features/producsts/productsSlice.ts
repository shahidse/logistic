import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProducts,
  deleteProducts,
  getProducts,
  getProductsById,
} from "./productsThunk";
export interface InitialState {
  loading: boolean;
  error: string;
  id: string;
  form: {
    name: string;
    companyId: string;
    pros: string;
    cons: string;
    usage: string;
    description: string;
  };
  data: Array<any>;
}
const initialState: InitialState = {
  loading: false,
  error: "",
  id: "",
  form: {
    name: "",
    companyId: "",
    pros: "",
    cons: "",
    usage: "",
    description: "",
  },
  data: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setState: (
      state: InitialState,
      action: PayloadAction<{
        key: keyof InitialState;
        value: string | boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFormState: (
      state: InitialState,
      action: PayloadAction<{
        key: keyof InitialState["form"];
        value: any;
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },

    resetState: () => {
      return { ...initialState }; // Spread the initialState to reset all fields
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProducts.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.id = actions.payload.id;
      })
      .addCase(addProducts.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getProducts.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsById.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.form = actions.payload;
        state.form.companyId = actions.payload.company?.id || '0';
      })
      .addCase(getProductsById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(deleteProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProducts.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteProducts.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
  },
});

export const { setState, setFormState, resetState } = productsSlice.actions;

export default productsSlice.reducer;
