import { createSlice } from "@reduxjs/toolkit";
import { CapsuleModal } from "@usecapsule/react-sdk";

const testSlice = createSlice({
  name: "modal",

  initialState: {
    testModal: false,
    contractsModal: false,
    CapsuleModal: false,
    isLoading: false,
  },

  reducers: {
    toggleTestModal: (state) => {
      state.testModal = !state.testModal;
    },

    toggleContractsModal: (state) => {
      state.contractsModal = !state.contractsModal;
    },

    toggleCapsuleModal: (state, action) => {
      state.CapsuleModal = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  toggleTestModal,
  toggleContractsModal,
  toggleCapsuleModal,
  setLoading,
} = testSlice.actions;

export default testSlice.reducer;
