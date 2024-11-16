import { Bell, MoveUpRight } from "lucide-react";

import React from "react";
import Link from "next/link";

const NotificationsButton = ({ union }) => {
  return (
    <div className="border border-gray-700 rounded-2xl overflow-hidden p-4">
      <Link href={`/notifications?union=${union}`}>
        <div className="text-base flex justify-between items-center">
          <div className="flex-center gap-1.5">
            <Bell size={20} />
            <h3>Notifications</h3>
          </div>

          <MoveUpRight size={20} />
        </div>
      </Link>
    </div>
  );
};

export default NotificationsButton;
