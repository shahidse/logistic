import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectInventoryData = (state: RootState) => state.inventory.data;

export const selectInventoryOptions = createSelector(
  [selectInventoryData],
  (inventory) => {
    if (!inventory || !inventory.length) {
      return [{ value: 0, label: "No Inventory" }];
    }
    return inventory.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  }
);
