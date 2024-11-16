import { setNotification } from "@/redux/slice/pushSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PushNotifications = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.push.pushSign);
  const notifications = useSelector((state) => state.push.notification);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await user.channel.notifications(
        "0xA2d6267B5b167Ee27174BfDa808408F90391D949"
      );

      dispatch(setNotification(fetchedNotifications.notifications));
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (notifications.length === 0) {
    return <div className="text-center py-4">No notifications available.</div>;
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto space-y-4 py-6 w-full">
      {notifications.map((notification) => (
        <div
          key={notification.notifID}
          className="border border-gray-200 rounded-lg px-6 py-4 w-full max-w-3xl mx-auto shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xl text-white">
              {notification.message.notification.title}
            </h3>

            <span className="text-sm text-gray-300">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>

          <p className="text-gray-400 text-base mb-3">
            {notification.message.notification.body}
          </p>

          {notification.message.payload?.cta && (
            <a
              href={notification.message.payload.cta}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline text-sm font-medium"
            >
              View Details
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default PushNotifications;
