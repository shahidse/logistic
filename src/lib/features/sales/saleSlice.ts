import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSale, getSaleById, getSales } from "./salesThunk";
import { act } from "react";

export interface Product {
  id: number | string; // Assuming it can be a number or UUID string
  productQuantities: number;
  netPrice: string; // string if it includes decimal or currency formatting
  netPriceCurrency: string;
  paidAmount: number; // If you're using numbers in the frontend for math
  remainingAmount: number;
  descriptions?: string;
  status: string;
  paymentMethod: string;
  paymentDate?: string; // ISO date string (e.g. '2025-04-20T00:00:00.000Z')
  shippingAddress?: string;
  deliveryDate?: string; // Also ISO date format
  shippingStatus?: string;
  specialInstructions?: string;
}

export interface InitialState {
  loading: boolean;
  error: string;
  id: string;
  form: {
    clientIds: any[];
    products: Product[];
  };
  data: unknown[];
}

const initialState: InitialState = {
  loading: false,
  error: "",
  id: "",
  form: {
    clientIds: [],
    products: [
      {
        id: "",
        productQuantities: 0,
        netPrice: "0",
        netPriceCurrency: "PKR",
        paidAmount: 0,
        remainingAmount: 0,
        descriptions: "",
        status: "PENDING",
        paymentMethod: "CASH",
        paymentDate: new Date().toISOString().split("T")[0],
        shippingAddress: "",
        deliveryDate: new Date().toISOString().split("T")[0],
        shippingStatus: "",
        specialInstructions: "",
      },
    ],
  },
  data: [],
};

export const SalesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState;
        value: InitialState[keyof InitialState];
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setProductFormState: (
      state,
      action: PayloadAction<{
        index: number;
        key: keyof Product;
        value: Product[keyof Product];
      }>
    ) => {
      const { index, key, value } = action.payload;
      if (state.form.products[index]) {
        state.form.products[index][key] = value;
      }
    },
    addProduct: (state) => {
      state.form.products.push({
        id: "",
        productQuantities: 0,
        netPrice: "0",
        netPriceCurrency: "PKR",
        paidAmount: 0,
        remainingAmount: 0,
        descriptions: "",
        status: "PENDING",
        paymentMethod: "CASH",
        paymentDate: new Date().toISOString().split("T")[0],
        shippingAddress: "",
        deliveryDate: new Date().toISOString().split("T")[0],
        shippingStatus: "",
        specialInstructions: "",
      });
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.form.products.splice(action.payload, 1);
    },

    clearProducts: (state) => {
      state.form.products = [];
    },
    addClientId: (state, action: PayloadAction<Array<any>>) => {
      state.form.clientIds = [...action.payload];
    },
    removeClientId: (state, action: PayloadAction<string>) => {
      state.form.clientIds = state.form.clientIds.filter(
        (id) => id !== action.payload
      );
    },

    clearClientIds: (state) => {
      state.form.clientIds = [];
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSale.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addSale.fulfilled, (state, action: PayloadAction<unknown[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getSales.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getSaleById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSaleById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.form.clientIds = [action.payload.client.id];
        state.form.products = [
          {
            id: action.payload.product.id,
            productQuantities: action.payload.productQuantities,
            netPrice: action.payload.netPrice,
            netPriceCurrency: action.payload.netPriceCurrency,
            paidAmount: action.payload.paidAmount,
            remainingAmount: action.payload.remainingAmount,
            descriptions: action.payload.descriptions,
            status: action.payload.status,
            paymentMethod: action.payload.paymentMethod,
            paymentDate: new Date(action.payload.paymentDate)
              .toISOString()
              .split("T")[0],
            shippingAddress: action.payload.shippingAddress,
            deliveryDate: new Date(action.payload.deliveryDate)
              .toISOString()
              .split("T")[0],
            shippingStatus: action.payload.shippingStatus,
            specialInstructions: action.payload.specialInstructions,
          },
        ];
      })
      .addCase(getSaleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // builder
    //   .addCase("sales/updateSale/pending", (state) => {
    //     state.loading = true;
    //     state.error = "";
    //   })
    //   .addCase("sales/updateSale/fulfilled", (state, action: PayloadAction<unknown>) => {
    //     state.loading = false;
    //     state.data = state.data.map((sale) =>
    //       (sale as any).id === (action.payload as any).id ? action.payload : sale
    //     );
    //   })
    //   .addCase("sales/updateSale/rejected", (state, action: PayloadAction<string>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
    // builder
    //   .addCase("sales/deleteSale/pending", (state) => {
    //     state.loading = true;
    //     state.error = "";
    //   })
    //   .addCase("sales/deleteSale/fulfilled", (state, action: PayloadAction<string>) => {
    //     state.loading = false;
    //     state.data = state.data.filter((sale) => (sale as any).id !== action.payload);
    //   })
    //   .addCase("sales/deleteSale/rejected", (state, action: PayloadAction<string>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const {
  setState,
  setProductFormState,
  addClientId,
  removeClientId,
  clearClientIds,
  removeProduct,
  clearProducts,
  resetState,
  addProduct,
} = SalesSlice.actions;
export default SalesSlice.reducer;
