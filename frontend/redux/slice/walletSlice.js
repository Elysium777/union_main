import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "wallet",

  initialState: {
    walletAddress: "0xD203EC25bD177bd90d0E8E29acd74B4A2c840Aa9",
  },

  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },

    clearWalletAddress: (state) => {
      state.walletAddress = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
