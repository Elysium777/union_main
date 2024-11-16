import React from "react";

const ProposalStatus = ({ status }) => {
  let bgColor;

  switch (status) {
    case "active":
      bgColor = "bg-green-500/50";
      break;
    case "inactive":
      bgColor = "bg-red-500/50";
      break;
    case "executed":
      bgColor = "bg-yellow-500/50";
      break;
    default:
      bgColor = "bg-gray-500/50";
  }

  return (
    <p
      className={
        "text-white px-1.5 rounded-full capitalize min-w-20 text-center w-fit " +
        bgColor
      }
    >
      {status}
    </p>
  );
};

export default ProposalStatus;
