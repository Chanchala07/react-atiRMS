import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "./FetchClient";

interface EmployeeListState {
    status: 'idle' | 'loading' | 'error';
    error: string;
    employeeListData: any[];
    profileListData: any[];
    archiveEmployeeListData: any[];
    employeeId: number | null;
    projectId: number | null;
    employeeCount: number | null;
    archivedCount: number | null;
    employeeData:any[];
}

const initialState: EmployeeListState = {
    status: "idle",
    error: "",
    employeeListData: [],
    profileListData: [],
    archiveEmployeeListData: [],
    employeeId: null,
    projectId: null,
    employeeCount: null,
    archivedCount: null,
    employeeData: []
};

export const employeeListData1 = createAsyncThunk(
    'employee/employeeList',
    async () => {
        try {
            const response = await apiClient.get(
                `${process.env.REACT_APP_BASE_URL}/api/employee`,
            );
            if (response.data) {
                const employeeData = response.data.Response || [];
                return {
                    employeeList: employeeData,
                    employeeCount: employeeData.length
                }
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
);
export const archivedListData = createAsyncThunk(
    'employee/archiveList',
    async () => {
        try {
            const response = await apiClient.get(
                `${process.env.REACT_APP_BASE_URL}/api/myprofile/archivedemployee/`,
            );
            if (response.data) {
                const archivedData = response.data.Response || [];
                return {
                    employeeList: archivedData,
                    archivedCount: archivedData.length
                }
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
);
export const employeeDataById = createAsyncThunk(
    'employee/employeeById',
    async (employeeId: number) => {
        try {
            const response = await apiClient.get(
                `${process.env.REACT_APP_BASE_URL}/api/employee/${employeeId}`,
            );
            if (response.data) {
                return response.data.Response || [];             
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
);
export const projectDataById = createAsyncThunk(
    'employee/projectById',
    async (projectId: number) => {
        try {
            const response = await apiClient.get(
                `${process.env.REACT_APP_BASE_URL}/api/employeeproject/${projectId}`,
            );
            if (response.data) {
                return response.data.Response || [];
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
);
export const profileListData1 = createAsyncThunk(
    'profile/profileList',
    async () => {
        try {
            const response = await apiClient.get(
                `${process.env.REACT_APP_BASE_URL}/api/myprofile/1/1`,
            );
            if (response.data) {
                const objUserList = response.data.Response?.objUsersList || [];
                return objUserList;
            }
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
);
const employeeListSlice = createSlice({
    name: "employeeList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employeeListData1.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(employeeListData1.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
                state.employeeListData = action.payload?.employeeList;
                state.employeeCount = action.payload?.employeeCount;
            })
            .addCase(employeeListData1.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? "Unknown error";
            });
        builder
            .addCase(archivedListData.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(archivedListData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
                state.archiveEmployeeListData = action.payload?.employeeList;
                state.archivedCount = action.payload?.archivedCount;
            })
            .addCase(archivedListData.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? "Unknown error";
            });
        builder
            .addCase(employeeDataById.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(employeeDataById.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
                state.employeeData =  action.payload;
            })
            .addCase(employeeDataById.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? "Unknown error";
            });

        builder
            .addCase(profileListData1.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(profileListData1.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
                state.profileListData = action.payload;
            })
            .addCase(profileListData1.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? "Unknown error";
            });
        builder
            .addCase(projectDataById.pending, (state) => {
                state.status = 'loading';
                state.error = "";
            })
            .addCase(projectDataById.fulfilled, (state, action) => {
                state.status = 'idle';
                state.error = "";
            })
            .addCase(projectDataById.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? "Unknown error";
            });
    },
});
export default employeeListSlice.reducer;