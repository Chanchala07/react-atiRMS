import { configureStore } from '@reduxjs/toolkit';
import employeeListSlice  from './app/Reducers/getDataListSlice'; 

export const store = configureStore({
    reducer: {
          employeeList: employeeListSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;