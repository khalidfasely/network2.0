import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        login: (state, action) => {
            return {...action.payload};
        },

        logout: () => {
            localStorage.removeItem('token');
            return {};
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;