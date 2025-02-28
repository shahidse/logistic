import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/users/usersSlice";
import companySlice from "./features/company/comapanySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: userSlice,
      company: companySlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore all form-related actions where a File might be passed
          ignoredActions: ["company/setFormState"],

          // Ignore paths that may contain non-serializable values
          ignoredActionPaths: ["payload.value"], // Ignore payload values (which may contain Files)

          // Ignore paths in the state where non-serializable data is stored
          ignoredPaths: ["company.form.logo"], // Ignore the logo field in the form object
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
