import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./FetchClient";

export const userLogin = createAsyncThunk(
    'user/userlogin',
    async (body:any,thunkAPI) => {
        console.log(body,"boody")
        try {
            const response = await apiClient.post(
                `${process.env.REACT_APP_BASE_URL}/api/account`,
                body
            );
            if (response.data.success) {
                return response.data;
            } else{
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ success: false, error: error.message });
        }
    }
);