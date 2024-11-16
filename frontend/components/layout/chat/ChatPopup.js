"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/slice/pushSlice";
import PushButton from "../notifications/PushButton";
import SendMessage from "./SendMessage";
import JoinGroup from "./JoinGroup";

const ChatPopup = ({ title = "Loading...", chatId }) => {
  console.log("ChatPopup", chatId);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [permission, setPermission] = useState([]);

  const isConnected = useSelector((state) => state.push.isConnected);
  const user = useSelector((state) => state.push.pushSign);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const fetchChat = async () => {
    const chats = await user.chat.history(chatId);

    dispatch(setMessages(chats.reverse()));
  };

  useEffect(() => {
    if (isConnected) {
      fetchChat();
    }
  }, [isConnected]);

  const checkGroupPermission = async () => {
    const permission = await user.chat.group.participants.status(
      chatId,
      user.account
    );
    console.log("permission", permission);

    setPermission(permission.participant);
  };

  useEffect(() => {
    if (isConnected) {
      checkGroupPermission();
    }
  }, [isConnected]);

  return (
    <div className="fixed bottom-0 right-8 w-80 border border-gray-500 rounded-t-lg overflow-hidden">
      <div
        className={`bg-white shadow-lg ${
          isOpen ? "h-auto" : "h-10"
        } transition-all duration-300 overflow-hidden`}
      >
        <div
          className="bg-black/90 text-white p-2 cursor-pointer rounded-t-lg h-10 flex justify-between items-center"
          onClick={toggleChat}
        >
          <span>{isOpen ? `Chat with ${title}` : title}</span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>

        {isOpen && (
          <div className="">
            <div className="overflow-y-auto hide-scrollbar px-4 py-2 bg-black/70 h-80 space-y-1">
              {isConnected ? <ChatMessage /> : <PushButton />}
            </div>

            {permission ? (
              <SendMessage chatId={chatId} />
            ) : (
              <JoinGroup chatId={chatId} setPermission={setPermission} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;
