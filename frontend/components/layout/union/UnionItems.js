"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";

const UnionItems = ({ unionAddress }) => {
  const [unionMetadata, setUnionMetadata] = React.useState(null);
  const chainId = useSelector((state) => state.chain.chainId);

  const loadUnion = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/union/metadata/" +
          chainId +
          "/" +
          unionAddress
      );

      if (response.data.success) {
        setUnionMetadata(response.data.metadata);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function detectImageType(base64url) {
    // Decode the base64URL string to Uint8Array
    const binaryData = Uint8Array.from(atob(base64url), (c) => c.charCodeAt(0));

    // Check the first few bytes to determine the image type
    const header = (binaryData[0] << 8) | binaryData[1];
    switch (header) {
      case 0x8950: // PNG ('‰P')
        return "png";
      case 0xffd8: // JPEG (0xFFD8)
        return "jpeg";
      case 0x3c3a: // SVG ('<?')
        return "svg+xml";
      default:
        return "svg+xml";
    }
  }

  React.useEffect(() => {
    if (unionAddress && chainId) {
      loadUnion();
    }
  }, [chainId]);

  return (
    <li className="border border-gray-600 p-4 rounded-lg shadow-md hover:border-white hover:shadow hover:shadow-white/30 transition-all">
      <Link href="/union/[id]" as={`/union/${unionMetadata?.proxyAddress}`}>
        {unionMetadata?.image ? (
          <Image
            src={`data:image/${detectImageType(unionMetadata.image)};base64,${
              unionMetadata.image
            }`}
            alt={`${unionAddress} logo`}
            width={128}
            height={128}
            className="object-cover w-32 h-32 mb-4 rounded-full mx-auto"
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt={`${unionAddress} logo`}
            width={128}
            height={128}
            className="object-cover w-32 h-32 mb-4 rounded-full mx-auto"
          />
        )}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{unionMetadata?.title}</h2>
          <p className="text-gray-300 mb-2 text-pretty line-clamp-2">
            {unionMetadata?.description}
          </p>
        </div>
        <p className="text-gray-400 mb-2">
          Type:
          <span className="border p-1 rounded-md bg-white text-black ml-1.5">
            {unionMetadata?.type}
          </span>
        </p>
      </Link>
    </li>
  );
};

export default UnionItems;
