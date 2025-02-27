import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { signup } from "./comapanyThunk";
export interface InitialState {
  loading: boolean;
  error: string;
  id: string;
  form: {
    name: string;
    address: string;
    phone: string;
    foundingDate: string;
    country: string;
    city: string;
    logo: string;
    website: string;
  };
}
const initialState: InitialState = {
  loading: false,
  error: "",
  id: "",
  form: {
    name: "",
    address: "",
    phone: "",
    foundingDate: new Date().toLocaleDateString(),
    country: "",
    city: "",
    logo: "",
    website: "",
  },
};

export const comapnySline = createSlice({
  name: "company",
  initialState,
  reducers: {
    setState: (
      state: InitialState,
      action: PayloadAction<{
        key: keyof InitialState;
        value: string | boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["form"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },
    resetState: () => {
      return { ...initialState }; // Spread the initialState to reset all fields
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(signup.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(signup.fulfilled, (state, actions) => {
    //     state.loading = false;
    //     state.error = "";
    //   })
    //   .addCase(signup.rejected, (state, actions) => {
    //     state.loading = false;
    //     state.error = actions.payload as string;
    //   });
  },
});

export const { setState, setFormState, resetState } = comapnySline.actions;

export default comapnySline.reducer;
