"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const LoadingModal = () => {
  const isModalOpen = useSelector((state) => state.modal.isLoading);

  return (
    isModalOpen && (
      <div className="fixed bg-black z-50 top-0 left-0 w-screen h-screen flex items-center justify-center">
        <Image
          src="/UnionLogo.svg"
          alt="loading"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
    )
  );
};

export default LoadingModal;
