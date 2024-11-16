"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import config from "@/lib/config";
import axios from "axios";

const DaoItems = ({ name, address }) => {
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);
  const [daoMetadata, setDaoMetadata] = React.useState(null);

  const loadDaoMetadata = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/dao/metadata/" +
          chainId +
          "/" +
          address
      );

      if (response.data.success) {
        setDaoMetadata(response.data.metadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (address) loadDaoMetadata();
  }, []);

  return (
    <li className="border border-gray-600 p-4 rounded-lg shadow-md hover:border-white hover:shadow hover:shadow-white/30 transition-all">
      <Link href="/dao/[id]" as={`/dao/${address}`}>
        {daoMetadata?.image ? (
          <Image
            src={`data:image/jpeg;base64,${daoMetadata.image}`}
            alt={`${name} logo`}
            width={128}
            height={128}
            className="object-cover w-32 h-32 mb-4 rounded-full mx-auto"
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt={`${name} logo`}
            width={128}
            height={128}
            className="object-cover w-32 h-32 mb-4 rounded-full mx-auto"
          />
        )}

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>

          <p className="text-gray-300 mb-2 text-pretty line-clamp-2">
            {daoMetadata?.description}
          </p>
        </div>

        <p className="text-gray-400 mb-2">
          <span className="border p-1 rounded-md bg-white text-black ml-1.5">
            {currentChain?.name}
          </span>
        </p>
      </Link>
    </li>
  );
};

export default DaoItems;
