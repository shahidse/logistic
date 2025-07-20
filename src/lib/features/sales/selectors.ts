// lib/features/products/selectors.ts
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductsData = (state: RootState) => state.sales.data;

export const selectSalesOptions = createSelector(
  [selectProductsData],
  (products) => {
    if (!products || !products.length) {
      return [{ value: 0, label: "No Sales" }];
    }
    return products.map((product:any) => ({
      label: product.name||'no name',
      value: product.id,
    }));
  }
);
