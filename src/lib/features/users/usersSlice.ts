import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSecretToken, signin, signup } from "./usersThunk";
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
};

export const usersSlice = createSlice({
  name: "counter",
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
    resetState: (state) => {
      return { ...initialState }; // Spread the initialState to reset all fields
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
  },
});

export const { setState, setSignUpFormState, setSignInFormState } =
  usersSlice.actions;

export default usersSlice.reducer;
