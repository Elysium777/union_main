import React from "react";
import { Bell, LogOut, Plus } from "lucide-react";

import SidebarList from "./SidebarList";
import SidebarItems from "./SidebarItems";

import Logo from "@/components/ui/Logo";
import Tooltip from "@/components/ui/Tooltip";
import LogoutButton from "@/components/ui/LogoutButton";
import CreateUnionButton from "@/components/ui/CreateUnionButton";

const Sidebar = () => {
  return (
    <nav className="border-r border-gray-700 h-screen flex flex-col justify-between">
      <div>
        <Logo />

        <SidebarList />

        <div className="my-6 border-b border-gray-700 pb-6">
          <Tooltip content="Notifications">
            <SidebarItems
              href="/notifications"
              icon={<Bell strokeWidth={1.5} />}
            />
          </Tooltip>
        </div>

        <CreateUnionButton />
      </div>

      <LogoutButton />
    </nav>
  );
};

export default Sidebar;
