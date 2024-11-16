"use client";

import Link from "next/link";
import { useCallback } from "react";

export default function Navbar() {
  const scrollToSection = useCallback(() => {
    const section = document.getElementById("voting-section");
    section?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="w-full flex items-center justify-center z-10 bg-yellow-50 fixed">
      <div className="flex flex-col items-center max-w-[900px] mt-5 gap-5 w-full">
        <div className="flex justify-between items-center w-full ">
          <div
            className="font-yatraone text-4xl text-black italic hover:cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            union
          </div>

          <div className="flex items-center space-x-10 text-black">
            <div className="hover:cursor-pointer" onClick={scrollToSection}>
              Voting Types
            </div>
            <Link href="/dao">Launch</Link>
          </div>
        </div>

        <div className="w-full border border-black"></div>
      </div>
    </div>
  );
}
