"use client";

import Image from "next/image";
import { useState } from "react";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-1 px-6 space-x-3 items-center h-full">
      <label htmlFor="search">
        <Image
          src="/search.svg"
          width={28}
          height={28}
          alt="search"
          className={isFocused ? "opacity-100" : "opacity-70"}
        />
      </label>

      <input
        id="search"
        type="text"
        placeholder="Search..."
        className="h-full w-full bg-transparent outline-none focus:bg-transparent hover:bg-transparent"
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
