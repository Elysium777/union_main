"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setIsMounted(false), 300);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[999] grid place-items-center bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative m-4 px-6 pb-6 pt-4 w-full max-w-md bg-black border border-gray-600 rounded-lg shadow shadow-white/30 transform transition-transform duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none hover:bg-white/10 rounded-full p-2 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
