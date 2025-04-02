import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./FetchClient";

interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const initialState : AuthState = {
    status: 'idle',
    error: null,
};

export const userLogin = createAsyncThunk(
    'user/userlogin',
    async (body: any, thunkAPI) => {
        try {
            const response = await apiClient.post(
                `${process.env.REACT_APP_BASE_URL}/api/account`,
                body
            );
            console.log(response,"response");
            if (response.data.Status) {        
                return response.data.Response;
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ success: false, error: error.message });
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout : () => {
            localStorage.removeItem("Id");
            localStorage.removeItem("UserRoleId");
            localStorage.removeItem("UserId");
            localStorage.removeItem("FirstName");
            localStorage.removeItem("UserRoleName");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = "";

            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? "Unknown error";
            });

    },
});
export const {logout} = authSlice.actions;
export default authSlice.reducer;