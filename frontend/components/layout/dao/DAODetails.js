import React from "react";

const DAODetails = ({ proposalLength }) => {
  return (
    <div className="flex gap-4">
      {/* <div className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative">
        <h2 className="text-gray-200 text-base">Delegates:</h2>
        <p className="text-3xl font-bold">345.42K</p>
        <p className="text-gray-400 text-sm">57.9K token holders</p>
      </div> */}

      <div className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative">
        <h2 className="text-gray-200 text-base">Proposals</h2>
        <p className="text-3xl font-bold">{proposalLength}</p>
        <p className="text-gray-400 text-sm">There are active proposals.</p>
      </div>

      {/* <div className="border border-gray-700 rounded-2xl overflow-hidden p-4 space-y-1 flex-1 relative">
        <h2 className="text-gray-200 text-base">Treasury</h2>
        <p className="text-3xl font-bold">
          $ <span>2.84B</span>
        </p>
        <p className="text-gray-400 text-sm">1 treasury source</p>
      </div> */}
    </div>
  );
};

export default DAODetails;
