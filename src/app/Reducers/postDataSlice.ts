import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./FetchClient";
import { log } from "console";

interface CreateUserState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const initialState : CreateUserState = {
    status: 'idle',
    error: null,
};
const LoggedInUserId = localStorage.getItem("UserId");
console.log(LoggedInUserId,"user id");
export const createUser = createAsyncThunk(
    "profile/createUser",  
    async (body: any, thunkAPI) => {  
        console.log(body,"body")
        try {
            const userDetails = {
                ...body,
                CreatedBy : LoggedInUserId,
                ModifiedBy: LoggedInUserId,
                MobileNo: 1234567890
            }
            console.log(userDetails,"user details");
            const response = await apiClient.post(
                `${process.env.REACT_APP_BASE_URL}/api/myprofile/employeeuser/`,
                userDetails  
            );
           
            console.log(response,"response");
            if (response.data.Status) {
                return response;  
            } else {
                return thunkAPI.rejectWithValue(response.data);  
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ success: false, error: error.message });  
        }
    }
);
const createUserSlice = createSlice({
    name: "createUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? "Unknown error";
            }); 
        }
    });
                      
export default createUserSlice.reducer;