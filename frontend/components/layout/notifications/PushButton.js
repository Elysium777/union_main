"use client";

import React from "react";
import Image from "next/image";

import usePush from "@/hooks/usePush";

const PushButton = () => {
  const { initPushStream } = usePush();

  return (
    <button
      onClick={initPushStream}
      className="flex gap-3 items-center border border-white rounded-lg px-3 py-2 mx-auto"
    >
      <Image src="/push.svg" width={36} height={36} alt="Push Logo" />

      <p className="font-medium text-lg">Connect with Push</p>
    </button>
  );
};

export default PushButton;
