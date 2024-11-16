"use client";

import React from "react";
import UnionProfile from "./UnionProfile";
import ConnectWallet from "./ConnectWallet";
import { useSelector } from "react-redux";
import ChainSelector from "./ChainSelector";

const ProfileContainer = () => {
  const isLoggedIn = useSelector((state) => state.capsule.isLoggedIn);
  return (
    <div className="border-l border-gray-700 h-full px-3 flex-center space-x-4">
      <ChainSelector />
      {isLoggedIn ? <UnionProfile /> : <ConnectWallet />}
    </div>
  );
};

export default ProfileContainer;
