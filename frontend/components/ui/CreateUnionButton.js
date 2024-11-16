"use client";

import { Plus } from "lucide-react";

import React from "react";

import Tooltip from "./Tooltip";
import SidebarItems from "../layout/sidebar/SidebarItems";
import { useSelector } from "react-redux";

const CreateUnionButton = () => {
  const isConnected = useSelector((state) => state.capsule.isLoggedIn);

  const disableLogout = !isConnected;

  if (disableLogout) {
    return null;
  }

  return (
    <Tooltip content="Create Union">
      <SidebarItems href="/create" icon={<Plus />} />
    </Tooltip>
  );
};

export default CreateUnionButton;
