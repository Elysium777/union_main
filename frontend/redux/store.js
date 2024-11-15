"use client";

import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slice/modalSlice";
import walletReducer from "./slice/walletSlice";
import chainReducer from "./slice/chainSlice";
import capsuleReducer from "./slice/capsuleSlice";
import pushReducer from "./slice/pushSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    wallet: walletReducer,
    chain: chainReducer,
    capsule: capsuleReducer,
    push: pushReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
