import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startHour: 0,
  startMinute: 0,
  startSecond: 0,
  endHour: 0,
  endMinute: 0,
  endSecond: 0,
  url: "",
  customize: 0,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateStartHour: (state, action) => {
      state.startHour = action.payload;
    },
    updateStartMinute: (state, action) => {
      state.startMinute = action.payload;
    },
    updateStartSecond: (state, action) => {
      state.startSecond = action.payload;
    },
    updateEndHour: (state, action) => {
      state.endHour = action.payload;
    },
    updateEndMinute: (state, action) => {
      state.endMinute = action.payload;
    },
    updateEndSecond: (state, action) => {
      state.endSecond = action.payload;
    },
    updateUrl: (state, action) => {
      state.url = action.payload;
    },
    updateCustomize: (state, action) => {
      state.customize = action.payload;
    },
  },
});

export const {
  updateStartHour,
  updateStartMinute,
  updateStartSecond,
  updateEndHour,
  updateEndMinute,
  updateEndSecond,
  updateUrl,
  updateCustomize,
} = formSlice.actions;

export default formSlice.reducer;
