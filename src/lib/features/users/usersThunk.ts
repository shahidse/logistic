import { UserApiService } from "@/services/UserApiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSecretToken = createAsyncThunk(
  "user/secret",
  async (userData: { secret: string }, { rejectWithValue }) => {
    try {
      const response = await UserApiService.getInstance().getSecretToken(userData);
console.log('jdklast',response)
      return await response; // Successful response
    } catch (error: any) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);
