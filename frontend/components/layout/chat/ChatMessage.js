import React from "react";

import { format } from "date-fns";
import { useSelector } from "react-redux";

const ChatMessage = () => {
  const messages = useSelector((state) => state.push.messages);
  const userAddress = useSelector((state) => state.push.pushSign);

  return messages.map((message, index) => {
    const isUserMessage = message.fromDID === userAddress.chainWiseAccount;
    const messageClass = isUserMessage
      ? "bg-white text-black self-end"
      : "bg-gray-700 text-white self-start";
    const alignmentClass = isUserMessage ? "justify-end" : "justify-start";

    return (
      <div key={index} className={`flex ${alignmentClass} w-full`}>
        <div className={`px-3 py-1.5 rounded-lg max-w-xs ${messageClass}`}>
          <p>{message.messageContent}</p>
          <p className="text-xs text-gray-400 mt-1">
            {format(new Date(message.timestamp), "hh:mm a")}
          </p>
        </div>
      </div>
    );
  });
};

export default ChatMessage;
