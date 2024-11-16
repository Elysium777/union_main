import { Globe } from "lucide-react";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProposalSocial = () => {
  return (
    <ul className="border border-gray-700 rounded-2xl overflow-hidden py-4 flex-center gap-4">
      <li className="p-1.5 hover:bg-white/20 rounded-full">
        <Link href="#">
          <Globe size={24} />
        </Link>
      </li>

      <li className="p-1.5 hover:bg-white/20 rounded-full">
        <Link href="#">
          <Image
            src="/social/twitter.svg"
            alt="Twiiter Logo"
            width={24}
            height={24}
          />
        </Link>
      </li>

      <li className="p-1.5 hover:bg-white/20 rounded-full">
        <Link href="#">
          <Image
            src="/social/discord.svg"
            alt="Discord Logo"
            width={24}
            height={24}
          />
        </Link>
      </li>
    </ul>
  );
};

export default ProposalSocial;
