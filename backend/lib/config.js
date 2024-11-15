const DAOabi = require("./contracts/DAO.json");
const UnionProxyFactoryabi = require("./contracts/UnionProxyFactory.json");
const ConvictionUnionabi = require("./contracts/ConvictionUnion.json");
const EqualUnionabi = require("./contracts/EqualUnion.json");
const NFTUnionabi = require("./contracts/NFTUnion.json");
const TraditionalUnionabi = require("./contracts/TraditionalUnion.json");
const QuadraticUnionabi = require("./contracts/QuadraticUnion.json");

const config = {
  chains: [
    {
      name: "Base Sepolia",
      chainId: 1,
      rpcUrl: "https://base-sepolia.gateway.tenderly.co/1LSwOzY43Ez2ZYqBL6U0xZ",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x3705505C5690a836b33736CD13568Ee8700D35c4",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40c47752fcB1CA46D1b6Db5d715f5028f2a0Cb64",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x979602c7512024c01c14D42Bd27865886Ff38Dca",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x3C7A418F01aA794C004cc6ba1Ad22a7eEA8BE232",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x969ef16DbFb73c5eB2191CBF3632779C741750eE",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0x4bB1161032dd6400767535e3f9A5dd36d52bd58b",
          abi: QuadraticUnionabi,
        },
      },
      DAOs: [
        {
          address: "0x63949B7b906417c555136028391699E2B5adb381",
          name: "FlareDAO",
        },
      ],
      NFT: [
        {
          address: "0x4b0b59344B8Aca93771a1de418981fA80A356B92",
          name: "NounsDAO",
        },
      ],
    },
  ],
};

module.exports = config;
