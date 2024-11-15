import { createSlice } from "@reduxjs/toolkit";

const capsuleSlice = createSlice({
  name: "capsule",

  initialState: {
    isLoggedIn: false,
  },

  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = capsuleSlice.actions;

export default capsuleSlice.reducer;
