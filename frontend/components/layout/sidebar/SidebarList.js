import React from "react";
import { Bell, Handshake, Landmark } from "lucide-react";

import SidebarItems from "./SidebarItems";

import Tooltip from "@/components/ui/Tooltip";

const SidebarList = () => {
  return (
    <ul className="my-6 space-y-5 border-b border-gray-700 pb-6">
      <li>
        <Tooltip content="Explore DAOs">
          <SidebarItems href="/dao" icon={<Landmark strokeWidth={1.5} />} />
        </Tooltip>
      </li>

      <li>
        <Tooltip content="Explore Unions">
          <SidebarItems href="/union" icon={<Handshake strokeWidth={1.5} />} />
        </Tooltip>
      </li>
    </ul>
  );
};

export default SidebarList;
