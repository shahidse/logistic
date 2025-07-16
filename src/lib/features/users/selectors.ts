import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectUsersByRole = (role: string) =>
  createSelector(
    (state: RootState) => state.users.data,
    (users) => users.filter((user: any) => user.roles.role === role)
  );
