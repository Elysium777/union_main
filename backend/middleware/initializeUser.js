const { ethers } = require("ethers");
const { PushAPI, CONSTANTS } = require("@pushprotocol/restapi");

const config = require("../lib/config");

let user;

const initializeUser = async () => {
  const chainId = 84532;

  const currentChain = config.chains.find(
    (chain) => chain.chainId === Number(chainId)
  );

  if (!currentChain) {
    throw new Error("Invalid chainId");
  }

  const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcUrl);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  if (!user) {
    user = await PushAPI.initialize(wallet, {
      env: CONSTANTS.ENV.STAGING,
    });
  }
};

const initializeUserMiddleware = async (req, res, next) => {
  try {
    await initializeUser(req.params.chainId);
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Initialization Error" });
  }
};

module.exports = initializeUserMiddleware;
