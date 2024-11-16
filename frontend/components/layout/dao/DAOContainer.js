import React from "react";
import Image from "next/image";

import DAOList from "./DAOList";

const DAOContainer = () => {
  return (
    <section>
      <div className="h-40 bg-white/10 px-16 py-8 relative m-4 rounded-2xl">
        <h1 className="font-bold text-3xl">Explore verified DAO</h1>

        <Image
          src="/dao-banner.png"
          fill
          className="object-contain object-right-top opacity-50"
        />
      </div>

      <div className="max-w-5xl mx-auto overflow-hidden my-8">
        <DAOList />
      </div>
    </section>
  );
};

export default DAOContainer;
