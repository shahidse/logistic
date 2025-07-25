import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createClient,
  deleteClient,
  getClient,
  getClientById,
  getCustomers,
  getCustomersById,
  getRoles,
  getSecretToken,
  getTransporters,
  getTransportersById,
  getUserInfo,
  signin,
  signup,
  updateClient,
} from "./usersThunk";
export interface InitialState {
  loading: boolean;
  secret: string;
  token: string;
  error: string;
  signUpForm: {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    userName: string;
  };
  signInForm: {
    email: string;
    password: string;
  };
  form: {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    userName: string;
    dob: string;
    address: string;
    city: string;
    country: string;
    rolesId: string;
    phone: number;
  };
  roles: any;
  data: any;
}
const initialState: InitialState = {
  loading: false,
  secret: "",
  token: "",
  error: "",
  signUpForm: {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    userName: "",
  },
  signInForm: {
    email: "",
    password: "",
  },
  form: {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    userName: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    rolesId: "",
    phone: 0,
  },
  roles: [],
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
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
    setSignUpFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["signUpForm"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.signUpForm[key] = value;
    },
    setSignInFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["signInForm"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.signInForm[key] = value;
    },
    setClientFormState: (
      state,
      action: PayloadAction<{
        key: keyof InitialState["form"];
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      state.form[key] = value;
    },
    resetState: (state) => {
      return { ...initialState }; // Spread the initialState to reset all fields
    },
    resetClientForm: (state) => {
      return { ...state, form: initialState.form };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSecretToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSecretToken.fulfilled, (state, actions) => {
        state.loading = false;
        state.token = actions.payload.token;
        state.error = "";
        localStorage.setItem("token", state.token);
      })
      .addCase(getSecretToken.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(signup.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        localStorage.setItem("accessToken", actions.payload.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(actions.payload.userData)
        );
      })
      .addCase(signin.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(createClient.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClient.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(updateClient.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClient.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getClient.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientById.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.form = actions.payload;
        state.form.rolesId = String(actions.payload?.roles?.id) || "";
      })
      .addCase(getClientById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClient.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(deleteClient.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.roles = actions.payload;
      })
      .addCase(getRoles.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomers.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getCustomers.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getCustomersById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomersById.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.form = actions.payload;
        state.form.rolesId = String(actions.payload?.roles?.id) || "";
      })
      .addCase(getCustomersById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getTransporters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransporters.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getTransporters.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getTransportersById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransportersById.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.form = actions.payload;
        state.form.rolesId = String(actions.payload?.roles?.id) || "";
      })
      .addCase(getTransportersById.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, actions) => {
        state.loading = false;
        state.error = "";
        state.data = actions.payload;
      })
      .addCase(getUserInfo.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.payload as string;
      });
  },
});

export const {
  setState,
  setSignUpFormState,
  setSignInFormState,
  resetClientForm,
  setClientFormState,
} = usersSlice.actions;

export default usersSlice.reducer;
