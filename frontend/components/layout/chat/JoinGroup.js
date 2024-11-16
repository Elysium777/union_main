"use client";

import React from "react";
import { useSelector } from "react-redux";

const JoinGroup = ({ chatId, setPermission }) => {
  const user = useSelector((state) => state.push.pushSign);

  const handleJoinGroup = async () => {
    await user.chat.group.join(chatId);

    setPermission(true);
  };

  return (
    <button
      className="w-full bg-white text-black py-2"
      onClick={handleJoinGroup}
    >
      Join Group
    </button>
  );
};

export default JoinGroup;
