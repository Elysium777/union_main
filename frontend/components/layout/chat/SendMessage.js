"use client";

import { addMessage } from "@/redux/slice/pushSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SendMessage = ({
  chatId = "ba0198f42165e5117ead89f74c66a716c121affd93cbf5e244dfed6030af7c37",
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.push.pushSign);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      dispatch(
        addMessage({
          fromDID: user.chainWiseAccount,
          messageContent: message,
          timestamp: Date.now(),
        })
      );

      user.chat.send(chatId, {
        type: "Text",
        content: message,
      });

      setMessage("");
    }
  };

  const handleSendClick = async () => {
    if (message.trim()) {
      dispatch(
        addMessage({
          fromDID: user.chainWiseAccount,
          messageContent: message,
          timestamp: Date.now(),
        })
      );

      user.chat.send(chatId, {
        type: "Text",
        content: message,
      });

      setMessage("");
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 px-2 text-black focus:outline-none"
      />

      <button
        onClick={handleSendClick}
        className="bg-black text-white p-2 border border-transparent hover:border-gray-500"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
