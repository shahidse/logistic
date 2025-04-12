import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  productId: number;
  productQuantities: number;
  netPrice: number;
  netPriceCurrency: string;
  paidAmount: number;
  remainingAmount: number;
  descriptions: string;
  status: string;
  paymentMethod: string;
  paymentDate: string;
  shippingAddress: string;
  deliveryDate: string;
  shippingStatus: string;
  specialInstructions: string;
}

export interface InitialState {
  loading: boolean;
  error: string;
  id: string;
  form: {
    clientIds: number[];
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
    products: [{
        productId: 0,
        productQuantities: 0,
        netPrice: 0,
        netPriceCurrency: "",
        paidAmount: 0,
        remainingAmount: 0,
        descriptions: "",
        status: "",
        paymentMethod: "",
        paymentDate: "",
        shippingAddress: "",
        deliveryDate: "",
        shippingStatus: "",
        specialInstructions: ""
    }],
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
        productId: 0, 
        productQuantities: 0,
        netPrice: 0,
        netPriceCurrency: "",
        isPaid: false,
        paidAmount: 0,
        remainingAmount: 0,
        descriptions: "",
        status: "",
        paymentMethod: "",
        paymentDate: "",
        shippingAddress: "",
        deliveryDate: "",
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
    addClientId: (state, action: PayloadAction<string>) => {
      if (!state.form.clientIds.includes(action.payload)) {
        state.form.clientIds.push(action.payload);
      }
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
} = SalesSlice.actions;
export default SalesSlice.reducer;
