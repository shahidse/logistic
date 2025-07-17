import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCustomerSale,
  getCustomerSales,
  getCustomerSaleById,
  deleteCustomerSale,
} from "./customerSalesThunk";

export interface ProductDetail {
  product: any; // Replace with Product interface if available
  inventory: any; // Inventory reference
  productQuantities: number;
  netPriceCurrency: string;
  netPrice: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  paymentMethod: string;
  paymentDate?: string;
  deliveryDate?: string;
  shippingStatus?: string;
  shippingAddress?: string;
  descriptions?: string;
  specialInstructions?: string;
}

export interface CustomerSalesState {
  loading: boolean;
  error: string;
  data: any[]; // Array of sales
  form: {
    customers: any[]; // List of selected customers
    products: ProductDetail[];
  };
}

const initialState: CustomerSalesState = {
  loading: false,
  error: "",
  data: [],
  form: {
    customers: [],
    products: [
      {
        product: "",
        inventory: "",
        productQuantities: 0,
        netPriceCurrency: "PKR",
        netPrice: 0,
        paidAmount: 0,
        remainingAmount: 0,
        status: "PENDING",
        paymentMethod: "CASH",
        paymentDate: new Date().toISOString().split("T")[0],
        deliveryDate: new Date().toISOString().split("T")[0],
        shippingStatus: "",
        shippingAddress: "",
        descriptions: "",
        specialInstructions: "",
      },
    ],
  },
};

export const customerSalesSlice = createSlice({
  name: "customerSales",
  initialState,
  reducers: {
    setCustomerFormState: (
      state,
      action: PayloadAction<{
        key: keyof CustomerSalesState["form"];
        value: any;
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },

    setProductDetail: (
      state,
      action: PayloadAction<{
        index: number;
        key: keyof ProductDetail;
        value: any;
      }>
    ) => {
      const { index, key, value } = action.payload;
      if (state.form.products[index]) {
        state.form.products[index][key] = value;
      }
    },

    addProduct: (state) => {
      state.form.products.push({
        product: "",
        inventory: "",
        productQuantities: 0,
        netPriceCurrency: "PKR",
        netPrice: 0,
        paidAmount: 0,
        remainingAmount: 0,
        status: "PENDING",
        paymentMethod: "CASH",
        paymentDate: new Date().toISOString().split("T")[0],
        deliveryDate: new Date().toISOString().split("T")[0],
        shippingStatus: "",
        shippingAddress: "",
        descriptions: "",
        specialInstructions: "",
      });
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.form.products.splice(action.payload, 1);
    },

    setCustomers: (state, action: PayloadAction<any[]>) => {
      state.form.customers = [...action.payload];
    },

    resetCustomerSaleForm: (state) => {
      state.form = initialState.form;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCustomerSale.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        addCustomerSale.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(addCustomerSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getCustomerSales.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getCustomerSales.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getCustomerSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getCustomerSaleById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getCustomerSaleById.fulfilled,
        (state, action: PayloadAction<any>) => {
          const sale = action.payload;

          state.loading = false;
          state.form.customers = sale.customers;
          state.form.products = sale.products.map((p: any) => ({
            ...p,
            paymentDate: p.paymentDate?.split("T")[0],
            deliveryDate: p.deliveryDate?.split("T")[0],
          }));
        }
      )
      .addCase(getCustomerSaleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteCustomerSale.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        deleteCustomerSale.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.data = state.data.filter((sale) => sale.id !== action.payload);
        }
      )
      .addCase(deleteCustomerSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCustomerFormState,
  setProductDetail,
  addProduct,
  removeProduct,
  setCustomers,
  resetCustomerSaleForm,
} = customerSalesSlice.actions;

export default customerSalesSlice.reducer;
