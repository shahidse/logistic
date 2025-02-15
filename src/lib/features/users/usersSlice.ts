import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSecretToken } from "./usersThunk";
import { useSnackbar } from "@/components/common/SnakeBarProvider";
interface InitialState {
  loading: boolean;
  secret: string;
  token: string;
  error: string;
}
const initialState: InitialState = {
  loading: false,
  secret: "",
  token: "",
  error: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setState } = usersSlice.actions;

export default usersSlice.reducer;
