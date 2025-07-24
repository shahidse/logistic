import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addDistribution,
  deleteDistribution,
  getDistributionById,
  getDistributions,
  updateDistribution,
} from "./distributionsThunk";
export interface DistributionForm {
  name:string;
  productId: number;
  inventoryId: number;
  salePrice: number;
  saleCurrency: string;
  purchaseCurrency: string;
  unit: string;
  purchasePrice: number;
  quantities: number;
  netPurchasePrice: number;
  netSalePrice: number;
  expiry: string;
}
export interface DistributionState {
  loading: boolean;
  error: string;
  id: string;
  form: DistributionForm;
  data: unknown[];
}

const initialState: DistributionState = {
  loading: false,
  error: "",
  id: "",
  form: {
    name:'',
    productId: 0,
    inventoryId: 0,
    quantities: 0,
    salePrice: 0,
    saleCurrency: "",
    purchaseCurrency: "",
    unit: "",
    purchasePrice: 0,
    netPurchasePrice: 0,
    netSalePrice: 0,
    expiry: new Date().toISOString().split("T")[0],
  },
  data: [],
};

export const distributionSlice = createSlice({
  name: "distributions",
  initialState,
  reducers: {
    setDistributionState: (
      state,
      action: PayloadAction<{
        key: keyof DistributionState;
        value: DistributionState[keyof DistributionState];
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFormState: (
      state,
      action: PayloadAction<{
        key: keyof DistributionForm;
        value: DistributionForm[keyof DistributionForm];
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },
    resetDistributionProduct: (state) => {
      state.form = {
        name:'',
        productId: 0,
        inventoryId: 0,
        quantities: 0,
        salePrice: 0,
        saleCurrency: "",
        purchaseCurrency: "",
        unit: "",
        purchasePrice: 0,
        netPurchasePrice: 0,
        netSalePrice: 0,
        expiry: new Date().toISOString().split("T")[0],
      };
    },
    resetDistributionState: () => initialState,
  },
  // Add extraReducers if you have async thunks for distribution
  extraReducers: (builder) => {
    builder
      // Add Distribution
      .addCase(addDistribution.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.error = "";
      })
      .addCase(addDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Distributions
    builder
      .addCase(getDistributions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getDistributions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        // state.form.expiry = new Date(action?.payload?.expiry)
        //   .toISOString()
        //   .split("T")[0];
      })
      .addCase(getDistributions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch distributions";
      });

    // Update Distribution
    builder
      .addCase(updateDistribution.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((item: any) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.error = "";
      })
      .addCase(updateDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update distribution";
      });

    // Delete Distribution
    builder
      .addCase(deleteDistribution.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item: any) => item.id !== action.payload
        );
        state.error = "";
      })
      .addCase(deleteDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete distribution";
      });
    // Get Distribution by ID
    builder
      .addCase(getDistributionById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getDistributionById.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.form = {
          productId: action.payload.product.id,
          inventoryId: action.payload.inventory.id,
          ...action.payload,
        };
        state.error = "";
      })
      .addCase(getDistributionById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch distribution by id";
      });
  },
});

export const {
  setDistributionState,
  setFormState,
  resetDistributionProduct,
  resetDistributionState,
} = distributionSlice.actions;
