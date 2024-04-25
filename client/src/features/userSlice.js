import { createSlice } from '@reduxjs/toolkit';

// Attempt to retrieve the user from localStorage
const savedUser = localStorage.getItem('user');

// Parse the user JSON if it exists, otherwise default to null
const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload; // payload should be the user object
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
