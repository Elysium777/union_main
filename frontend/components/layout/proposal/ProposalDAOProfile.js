import React from "react";
import Image from "next/image";

const ProposalDAOProfile = ({ daoName, image, chainName, description }) => {
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
  return (
    <div className="border border-gray-700 rounded-2xl overflow-hidden">
      <div className="relative w-full h-16 bg-gray-700"></div>

      <div className="px-4">
        <div className="-translate-y-7 space-y-1">
          {image ? (
            <Image
              src={`data:image/${detectImageType(image)};base64,${image}`}
              alt="DAO Logo"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full border border-white shadow shadow-white/30"
            />
          ) : (
            <Image
              src="/placeholder.png"
              alt="DAO Logo"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full border border-white shadow shadow-white/30"
            />
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{daoName || "abc"}</h2>
            <p className="text-xs px-2 py-0.5 w-fit rounded-full bg-gray-100 text-gray-900 font-bold">
              {chainName || "Ethereum"}
            </p>
          </div>
        </div>

        <p className="text-gray-300 text-sm -translate-y-3">
          {description || "Okay"}
        </p>
      </div>
    </div>
  );
};

export default ProposalDAOProfile;
