const { ethers } = require("ethers");

const SECONDS_PER_DAY = 86400;
const BLOCKS_TO_SAMPLE = 5;

const calculateAverageBlockTime = async (
  currentChain,
  setAverageBlockTime,
  setCurrentBlock
) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);
    // Get current block
    const latestBlock = await provider.getBlock("latest");
    setCurrentBlock(latestBlock.number);

    // Get timestamps from multiple blocks to calculate average block time
    const blocks = await Promise.all(
      Array.from({ length: BLOCKS_TO_SAMPLE }, (_, i) =>
        provider.getBlock(latestBlock.number - i)
      )
    );

    // Calculate average time between blocks
    let totalTimeDiff = 0;
    let totalBlockDiff = 0;

    for (let i = 0; i < blocks.length - 1; i++) {
      totalTimeDiff += blocks[i].timestamp - blocks[i + 1].timestamp;
      totalBlockDiff += blocks[i].number - blocks[i + 1].number;
    }

    const avgBlockTime = totalTimeDiff / totalBlockDiff;
    setAverageBlockTime(avgBlockTime);
  } catch (err) {
    console.error(err);
  }
};

const calculateTimeDifference = (currentBlock, averageBlockTime, endBlock) => {
  if (!currentBlock || !averageBlockTime) return null;

  const blockDifference = endBlock - currentBlock;
  const secondsDifference = blockDifference * averageBlockTime;
  const daysDifference = secondsDifference / SECONDS_PER_DAY;

  // Return both days and total seconds for more precise formatting
  return {
    days: daysDifference,
    seconds: secondsDifference,
  };
};

const formatTimeDifference = (currentBlock, averageBlockTime, endBlock) => {
  const diff = calculateTimeDifference(
    currentBlock,
    averageBlockTime,
    endBlock
  );
  if (!diff) return "";

  const { days, seconds } = diff;
  const absoluteSeconds = Math.abs(seconds);
  const absoluteDays = Math.abs(days);

  // Future time
  if (seconds > 0) {
    if (absoluteSeconds < 3600) {
      // Less than 1 hour
      const minutes = Math.round(absoluteSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} later`;
    } else if (absoluteSeconds < SECONDS_PER_DAY) {
      // Less than 1 day
      const hours = Math.round(absoluteSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} later`;
    } else {
      const days = Math.round(absoluteDays);
      return `${days} day${days !== 1 ? "s" : ""} later`;
    }
  }
  // Past time
  else if (seconds < 0) {
    if (absoluteSeconds < 3600) {
      // Less than 1 hour
      const minutes = Math.round(absoluteSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (absoluteSeconds < SECONDS_PER_DAY) {
      // Less than 1 day
      const hours = Math.round(absoluteSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.round(absoluteDays);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  }
};

export { calculateAverageBlockTime, formatTimeDifference };
