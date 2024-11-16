const { ethers } = require("ethers");
const { solidityPack, keccak256 } = require("ethers/lib/utils");

const predictProxyAddress = async (
  currentChain,
  singleton,
  initializer,
  saltNonce
) => {
  const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);

  const factoryContract = new ethers.Contract(
    currentChain.deployments.UnionProxyFactory.address,
    currentChain.deployments.UnionProxyFactory.abi,
    provider
  );

  const salt = ethers.utils.keccak256(
    solidityPack(["bytes32", "uint256"], [keccak256(initializer), saltNonce])
  );

  const proxyCreationCode = await factoryContract.proxyCreationCode();

  const paddedAddress = ethers.utils.hexZeroPad(singleton, 32);

  // Concatenate the proxy bytecode with the padded singleton address
  const deploymentData = ethers.utils.hexConcat([
    proxyCreationCode,
    paddedAddress,
  ]);

  // Get the bytecode hash
  const bytecodeHash = ethers.utils.keccak256(
    ethers.utils.hexConcat([
      // First byte is 0xff
      "0xff",
      // Then the deployer address
      factoryContract.address,
      // Then the salt
      salt,
      // Then the bytecode hash
      ethers.utils.keccak256(deploymentData),
    ])
  );

  // Take last 20 bytes to get the address
  return ethers.utils.getAddress("0x" + bytecodeHash.slice(26));
};

module.exports = { predictProxyAddress };
