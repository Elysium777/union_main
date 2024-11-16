import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import config from "@/lib/config";
import { useSelector } from "react-redux";

const ChainSelector = () => {
  const chainId = useSelector((state) => state.chain.chainId);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState(config.chains[0]);

  const handleChainSelect = (chain) => {
    localStorage.setItem("chainId", chain.chainId);

    setSelectedChain(chain);

    window.location = "/dao";
  };

  React.useEffect(() => {
    if (chainId) {
      const currentChain = config.chains.find(
        (chain) => chain.chainId === Number(chainId)
      );
      setSelectedChain(currentChain);
    }
  }, [chainId]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="mr-1">{selectedChain.icon}</span>
        <span className="text-sm font-medium text-gray-700">
          {selectedChain.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {config.chains.map((chain) => (
              <button
                key={chain.chainId}
                onClick={() => handleChainSelect(chain)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2
                  ${
                    selectedChain.chainId === chain.chainId
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
              >
                <span>{chain.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSelector;
