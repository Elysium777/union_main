"use client";

import React from "react";
import { useSelector } from "react-redux";

import PushButton from "./PushButton";
import PushNotifications from "./PushNotifications";

const PushNotifContainer = () => {
  const isConnected = useSelector((state) => state.push.isConnected);

  return (
    <div className="flex-1 flex-center max-w-6xl w-full mx-auto">
      {isConnected ? <PushNotifications /> : <PushButton />}
    </div>
  );
};

export default PushNotifContainer;
