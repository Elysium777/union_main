"use client";

import React from "react";

import { WalletAddressWithProfile } from "@/components/ui/WalletAddress";
import { useDispatch } from "react-redux";
import { toggleCapsuleModal } from "@/redux/slice/modalSlice";

const UnionProfile = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="border border-gray-700 h-fit p-1.5 rounded-full hover:border-gray-400"
      onClick={() => {
        dispatch(toggleCapsuleModal(true));
      }}
    >
      <WalletAddressWithProfile />
    </div>
  );
};

export default UnionProfile;
