import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/users/usersSlice";
import companySlice from "./features/company/comapanySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userSlice,
      company: companySlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
