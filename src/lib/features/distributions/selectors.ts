// lib/features/products/selectors.ts
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductsData = (state: RootState) => state.distributions.data;

export const selectDistributionsOptions = createSelector(
  [selectProductsData],
  (products) => {
    if (!products || !products.length) {
      return [{ value: 0, label: "No Distribution" }];
    }
    return products.map((product:any) => ({
      label: product.name,
      value: product.id,
    }));
  }
);
