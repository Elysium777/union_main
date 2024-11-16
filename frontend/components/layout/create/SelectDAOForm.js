import config from "@/lib/config";
import React from "react";
import { useSelector } from "react-redux";

const SelectDAOForm = ({
  selectedDAO,
  setSelectedDAO,
  type,
  setType,
  multiplierPeriod,
  setMultiplierPeriod,
  nftAddress,
  setNftAddress,
}) => {
  const daos = useSelector((state) => state.chain.daos);
  const chainId = useSelector((state) => state.chain.chainId);
  const currentChain = config.chains.find((chain) => chain.chainId === chainId);

  return (
    <>
      <div className="space-y-1">
        <h2 className="text-3xl">Set Properties</h2>
        <p className="text-sm text-gray-400">
          Set the properties of the union you want to create. This includes the
          DAO and the type of union and additional properties based on the
          selected type.
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Select DAO
        </label>
        <input
          list="daos"
          value={selectedDAO}
          onChange={(e) => setSelectedDAO(e.target.value)}
          className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 text-gray-200 placeholder-gray-500"
        />
        <datalist id="daos">
          {daos &&
            daos.map((dao) => (
              <option
                key={dao.address}
                value={dao.address}
                style={{ color: "#e2e8f0" }}
              />
            ))}
        </datalist>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Select Union Type
        </label>
        <input
          list="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 text-gray-200 placeholder-gray-500"
        />
        <datalist id="type">
          <option value="Traditional" style={{ color: "#e2e8f0" }} />
          <option value="Equal" style={{ color: "#e2e8f0" }} />
          <option value="Conviction" style={{ color: "#e2e8f0" }} />
          <option value="NFT" style={{ color: "#e2e8f0" }} />
          <option value="Quadratic" style={{ color: "#e2e8f0" }} />
        </datalist>
      </div>
      {type === "Conviction" && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Select Multiplier Period
          </label>
          <input
            list="multiplier"
            value={multiplierPeriod}
            onChange={(e) => setMultiplierPeriod(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 text-gray-200 placeholder-gray-500"
          />
          <datalist id="multiplier">
            <option value="1 Day" style={{ color: "#e2e8f0" }} />
            <option value="1 Week" style={{ color: "#e2e8f0" }} />
            <option value="1 Month" style={{ color: "#e2e8f0" }} />
            <option value="1 Year" style={{ color: "#e2e8f0" }} />
          </datalist>
        </div>
      )}
      {type === "NFT" && (
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            NFT Address
          </label>
          <input
            list="nfts"
            value={nftAddress}
            onChange={(e) => setNftAddress(e.target.value)}
            className="w-full px-3 py-2 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gray-400 text-gray-200 placeholder-gray-500"
          />
          <datalist id="nfts">
            {currentChain.NFT.map((nft) => (
              <option
                key={nft.name}
                label={nft.name}
                value={nft.address}
                style={{ color: "#e2e8f0" }}
              />
            ))}
          </datalist>
        </div>
      )}
    </>
  );
};

export default SelectDAOForm;
