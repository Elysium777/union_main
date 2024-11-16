"use client";

import React from "react";

import DaoItems from "./DAOItems";

import { useSelector } from "react-redux";

const DAOList = () => {
  const daos = useSelector((state) => state.chain.daos);
  return (
    <ul className="grid grid-cols-4 gap-6">
      {daos.map((dao) => {
        return (
          <DaoItems key={dao.address} name={dao.name} address={dao.address} />
        );
      })}
    </ul>
  );
};

export default DAOList;
