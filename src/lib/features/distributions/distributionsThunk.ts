import { createAsyncThunk } from "@reduxjs/toolkit";
import { DistributionsApiService } from "@/services/DistributionsApiService";
import { DistributionState } from "./distributionSlice";

// Add Distribution
export const addDistribution = createAsyncThunk(
    "distributions/add",
    async (distributionData: DistributionState["form"], { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await DistributionsApiService.getInstance().createDistribution(
                distributionData,
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

// Get Distributions
export const getDistributions = createAsyncThunk(
    "distributions/get",
    async (arg: any, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await DistributionsApiService.getInstance().getDistributions(arg, {
                headers: { authorization: `Bearer ${token}` },
            });
            return await response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Get Distribution By Id
export const getDistributionById = createAsyncThunk(
    "distributions/get/id",
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await DistributionsApiService.getInstance().getDistributionById(id, {
                headers: { authorization: `Bearer ${token}` },
            });
            return await response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Update Distribution
export const updateDistribution = createAsyncThunk(
    "distributions/update",
    async (
        distributionData: { id: string, data: DistributionState["form"] },
        { rejectWithValue }
    ) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await DistributionsApiService.getInstance().updateDistribution(
                distributionData.id,
                distributionData.data,
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

// Delete Distribution
export const deleteDistribution = createAsyncThunk(
    "distributions/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await DistributionsApiService.getInstance().deleteDistribution(id, {
                headers: { authorization: `Bearer ${token}` },
            });
            return await response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);