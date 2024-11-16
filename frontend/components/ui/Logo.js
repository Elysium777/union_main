import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="h-16 border-b border-gray-700 px-2 py-3 flex items-center justify-center">
      <Image
        src="/UnionLogo.svg"
        alt="loading"
        width={20}
        height={20}
        className=""
      />
    </div>
  );
};

export default Logo;
