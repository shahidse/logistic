import { UserApiService } from "@/services/UserApiService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./usersSlice";

export const getSecretToken = createAsyncThunk(
  "user/secret",
  async (userData: { secret: string }, { rejectWithValue }) => {
    try {
      const response = await UserApiService.getInstance().getSecretToken(
        userData
      );
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async (userData: InitialState["signUpForm"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().signUp(userData, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const signin = createAsyncThunk(
  "user/signin",
  async (userData: InitialState["signInForm"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().logIn(userData, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const createClient = createAsyncThunk(
  "clients/create",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().createClient(
        userData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateClient = createAsyncThunk(
  "clients/update",
  async (userData: InitialState["form"], { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().updateClient(
        userData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getClient = createAsyncThunk(
  "clients/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getClients({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getClientById = createAsyncThunk(
  "clients/get/id",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getClientById(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().deleteClient(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getRoles = createAsyncThunk(
  "users/roles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getRoles({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCustomers = createAsyncThunk(
  "customers/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getCustomers({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCustomersById = createAsyncThunk(
  "customers/get/id",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getCustoemrById(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTransporters = createAsyncThunk(
  "transporters/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getTransporters({
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getTransportersById = createAsyncThunk(
  "transporters/get/id",
  async (id: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserApiService.getInstance().getTransportersById(id, {
        headers: { authorization: `Bearer ${token}` },
      });
      return await response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
