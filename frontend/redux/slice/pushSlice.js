import { createSlice } from "@reduxjs/toolkit";
import { set } from "animejs";

const userSlice = createSlice({
  name: "push",

  initialState: {
    isConnected: null,
    messages: [],
    pushSign: null,
    currentGroup: null,
  },

  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },

    setPushSign: (state, action) => {
      const pushSign = action.payload;
      state.pushSign = pushSign;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },

    clearCurrentGroup: (state) => {
      state.currentGroup = null;
    },

    clearPush: (state) => {
      state.isConnected = null;
      state.messages = [];
      state.pushSign = null;
      state.currentGroup = null;
    },

    clearPushSign: (state) => {
      state.pushSign = null;
    },
  },
});

export const {
  setConnected,
  setPushSign,
  setMessages,
  addMessage,
  clearMessages,
  setCurrentGroup,
  clearCurrentGroup,
  clearPush,
  clearPushSign,
} = userSlice.actions;

export default userSlice.reducer;
