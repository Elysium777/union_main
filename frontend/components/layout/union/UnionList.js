"use client";

import React from "react";

import UnionItems from "./UnionItems";

import { useSelector } from "react-redux";

const UnionList = () => {
  const unions = useSelector((state) => state.chain.unions);
  return (
    <ul className="grid grid-cols-4 gap-6">
      {unions &&
        unions.map((union, index) => {
          return <UnionItems key={index} unionAddress={union} />;
        })}
    </ul>
  );
};

export default UnionList;
