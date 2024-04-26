// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import formReducer from '../features/formSlice';

export const store = configureStore({
<<<<<<< HEAD
  reducer: {
    user: userReducer,
    form: formReducer,
  },
=======
    reducer: {
        user: userReducer,
    },
>>>>>>> main
});
