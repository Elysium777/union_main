"use client";

import React, { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
      </div>

      <div
        className={`absolute left-full translate-x-2 top-1/2 transform -translate-y-1/2 px-2 py-1.5 bg-black text-white rounded shadow-lg border-gray-600 border transition-all duration-300 ease-out origin-left z-50 
          ${
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50 pointer-events-none"
          }
        `}
      >
        <div className="relative">
          <div className="absolute -left-5 top-1/2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-600"></div>
          </div>

          <div className="text-sm text-nowrap whitespace-nowrap">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
