require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
        details: {
          yulDetails: {
            optimizerSteps: "u",
          },
        },
      },
      evmVersion: "paris",
      viaIR: true,
    },
  },
  networks: {
    opSepolia: {
      url: `https://sepolia.optimism.io/`,
      accounts: [PRIVATE_KEY],
    },
    baseSepolia: {
      url: `https://sepolia.base.org`,
      accounts: [PRIVATE_KEY],
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [PRIVATE_KEY],
    },
    flareTestnet: {
      url: "https://coston2-api.flare.network/ext/C/rpc",
      accounts: [PRIVATE_KEY],
    },
    romeTestnet: {
      url: "https://rome.testnet.romeprotocol.xyz",
      accounts: [PRIVATE_KEY],
    },
    flowTestnet: {
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: [PRIVATE_KEY],
    },
    neonDevnet: {
      url: "https://devnet.neonevm.org",
      accounts: [PRIVATE_KEY],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [PRIVATE_KEY],
    },
    chilizSpicy: {
      url: "https://spicy-rpc.chiliz.com",
      accounts: [PRIVATE_KEY],
    },
    rootstockTestnet: {
      url: "https://public-node.testnet.rsk.co",
      gasPrice: 60000000,
      accounts: [PRIVATE_KEY],
    },
    zircuitTestnet: {
      url: "https://zircuit1-testnet.p2pify.com",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      opSepolia: "89K6NC1QZIUZSA6A6S5SY1N3DVIBCJCD3A",
      baseSepolia: "BZP99H9U5SEDZTTP3BIBUYE5X2TMM9PX5Q",
      fuji: "your API key",
      flareTestnet: "your API key",
      romeTestnet: "your API key",
      flowTestnet: "your API key",
      neonDevnet: "your API key",
      scrollSepolia: "ITWAXZZT16CEJ4HE11K5N147TQJFFN81FR",
      chilizSpicy: "your API key",
      rootstockTestnet: "your API key",
      zircuitTestnet: "F8AD75692E6B1FBBCDA14725D7FA01E6C6",
    },
    customChains: [
      {
        network: "opSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
      {
        network: "fuji",
        chainId: 43113,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://c-chain.snowtrace.io",
        },
      },
      {
        network: "flareTestnet",
        chainId: 114,
        urls: {
          apiURL: "https://coston2-explorer.flare.network/api",
          browserURL: "https://coston2-explorer.flare.network/",
        },
      },
      {
        network: "romeTestnet",
        chainId: 200002,
        urls: {
          apiURL: "https://rome.testnet.romeprotocol.xyz:1000/api",
          browserURL: "https://rome.testnet.romeprotocol.xyz:1000/",
        },
      },
      {
        network: "flowTestnet",
        chainId: 545,
        urls: {
          apiURL: "https://evm-testnet.flowscan.io/api",
          browserURL: "https://evm-testnet.flowscan.io/",
        },
      },
      {
        network: "neonDevnet",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet.neonscan.org/api",
          browserURL: "https://devnet.neonscan.org/",
        },
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
      {
        network: "chilizSpicy",
        chainId: 88882,
        urls: {
          apiURL: "https://testnet.chiliscan.com/api",
          browserURL: "https://testnet.chiliscan.com",
        },
      },
      {
        network: "rootstockTestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api",
          browserURL: "https://rootstock-testnet.blockscout.com/",
        },
      },
      {
        network: "zircuitTestnet",
        chainId: 48899,
        urls: {
          apiURL:
            "https://explorer.testnet.zircuit.com/api/contractVerifyHardhat",
          browserURL: "https://explorer.testnet.zircuit.com",
        },
      },
    ],
  },
};
