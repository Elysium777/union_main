import React from "react";
import Link from "next/link";

const SidebarItems = ({ href, icon }) => {
  return (
    <Link
      href={href}
      className="h-fit w-fit block p-2.5 border rounded-full border-gray-700 hover:border-gray-500 hover:bg-gray-900 mx-2"
    >
      {icon}
    </Link>
  );
};

export default SidebarItems;
