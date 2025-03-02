import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCompany,
  deleteCompany,
  getCompany,
  getCompanyById,
} from "./comapanyThunk";
// import { addCompany } from "./comapanyThunk";
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
    logo: File | any;
    website: string;
  };
  data: Array<any>;
}
const initialState: InitialState = {
  loading: false,
  error: "",
  id: "",
  form: {
    name: "",
    address: "",
    phone: "",
    foundingDate: new Date().toISOString().split("T")[0],
    country: "",
    city: "",
    logo: "No File Chosen",
    website: "",
  },
  data: [],
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
      state: InitialState,
      action: PayloadAction<{
        key: keyof InitialState["form"];
        value: any;
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
    builder
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompany.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.id = actions.payload.id;
      })
      .addCase(addCompany.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompany.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getCompany.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.form = actions.payload;
        state.form.foundingDate = new Date(actions.payload.foundingDate)
          .toISOString()
          .split("T")[0];
      })
      .addCase(getCompanyById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteCompany.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
  },
});

export const { setState, setFormState, resetState } = comapnySline.actions;

export default comapnySline.reducer;
