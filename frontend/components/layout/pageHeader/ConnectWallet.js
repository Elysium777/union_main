"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCapsuleModal } from "@/redux/slice/modalSlice";

const ConnectWallet = ({ width }) => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);

  return (
    !isConnected && (
      <button
        style={{
          width: width,
        }}
        onClick={() => {
          dispatch(toggleCapsuleModal(true));
        }}
        className="border border-gray-700 rounded-full font-medium px-4 py-2"
      >
        Connect Wallet
      </button>
    )
  );
};

export default ConnectWallet;
