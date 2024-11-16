import React from "react";

import PushNotifContainer from "@/components/layout/notifications/PushNotifContainer";

const NotificationsPage = () => {
  return (
    <div className="flex-center flex-1 flex-col w-full relative">
      <h2 className="w-full text-3xl font-bold border-b border-gray-700 px-5 py-3 sticky top-0">
        Your Notification
      </h2>

      <PushNotifContainer />
    </div>
  );
};

export default NotificationsPage;
