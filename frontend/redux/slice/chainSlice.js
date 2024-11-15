import config from "@/lib/config";
import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",

  initialState: {
    chainId: config.chains[0].chainId,
    daos: [],
    unions: [],
  },

  reducers: {
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },

    setDaos: (state, action) => {
      state.daos = action.payload;
    },

    setUnions: (state, action) => {
      state.unions = action.payload;
    },
  },
});

export const { setChainId, setDaos, setUnions } = chainSlice.actions;

export default chainSlice.reducer;
