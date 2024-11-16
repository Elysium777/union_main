import React from "react";
import Link from "next/link";

import convertToTitleCase from "@/utils/convertToTitleCase";

const ProposalBreadcrumps = ({ links }) => {
  return (
    <div className="flex space-x-2">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <Link
            href={link.url}
            className={`${
              index === links.length - 1 ? "text-white" : "text-gray-400"
            } hover:underline`}
          >
            {convertToTitleCase(link.name)}
          </Link>
          {index < links.length - 1 && <span className="text-gray-400">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProposalBreadcrumps;
