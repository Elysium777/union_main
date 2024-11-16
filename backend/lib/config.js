const DAOabi = require("./contracts/DAO.json");
const UnionProxyFactoryabi = require("./contracts/UnionProxyFactory.json");
const ConvictionUnionabi = require("./contracts/ConvictionUnion.json");
const EqualUnionabi = require("./contracts/EqualUnion.json");
const NFTUnionabi = require("./contracts/NFTUnion.json");
const TraditionalUnionabi = require("./contracts/TraditionalUnion.json");
const QuadraticUnionabi = require("./contracts/QuadraticUnion.json");
const FlareUnionabi = require("./contracts/FlareUnion.json");

const config = {
  chains: [
    {
      name: "Flare Testnet",
      chainId: 114,
      rpcUrl: "https://coston2-api.flare.network/ext/C/rpc",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x62CB235Cf18Af7b62B918d93DA89212bc89daFdc",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x17DDF0820846565B5CF237E80Ad3D5A2bE3CCe3D",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x0bB84e676150E4721c9Eb21E6863fBD40A8898E3",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0xFA2d0B8DE8c95c49615eAd2CAb22D26CB9998445",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x51f33358d4f735541068df71ff73Ad5dBEd67ad6",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xDe45479eB204834f3Db76161bB8DE48a5A3B3D32",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "FlareDAO",
        },
      ],
      NFT: [
        {
          address: "0x614ae60954f0AEdd172141A9C52052a8B422DEfd",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Rome Testnet",
      chainId: 200002,
      rpcUrl: "https://rome.testnet.romeprotocol.xyz",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "RomeDAO",
        },
      ],
      NFT: [
        {
          address: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Flow Testnet",
      chainId: 545,
      rpcUrl: "https://testnet.evm.nodes.onflow.org",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "FlowDAO",
        },
      ],
      NFT: [
        {
          address: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Neon Devnet",
      chainId: 245022926,
      rpcUrl: "https://devnet.neonevm.org",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "FlowDAO",
        },
      ],
      NFT: [
        {
          address: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Scroll Sepolia",
      chainId: 534351,
      rpcUrl: "https://sepolia-rpc.scroll.io",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "ScrollDAO",
        },
      ],
      NFT: [
        {
          address: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Base Sepolia",
      chainId: 84532,
      rpcUrl: "https://sepolia.base.org",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0xEd62799ccA691d2649A5b58C6E6a673C6FC44940",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0xf68F46DFaE9D70a44356373193b197A254Bf3554",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x13Ff9340b7E9eF209dFB933DF2c0Fa1B945875bb",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0xEBc8555D87cA0Be23A6467a1D7364744c0087924",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0xE3282860ab8CB9E657a5A9e8E03951F8552f9E1a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xaA3cF300140dafb6d9bed165aF9D13921B349Aa4",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0x2B623bb254E8e1B157AB201e559cA920b4a5D5db",
          name: "BaseDAO",
        },
      ],
      NFT: [
        {
          address: "0xb9bfC893ef66582C362B1b1E8c69559E1B05844E",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Rsk Testnet",
      chainId: 31,
      rpcUrl: "https://public-node.testnet.rsk.co",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x2fAF5856C60C14730fd7594684C2C7d52097f440",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x50F1bbb486D62921eD9cE411c6b85Ec0B73D9130",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xb52c96C52F83F0741b1EEb1Cb6c1b73C57bDEb7B",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          name: "RskDAO",
        },
      ],
      NFT: [
        {
          address: "0xd0958A708F6347bb07B877a75Ff7E402116Ce089",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Rsk Testnet",
      chainId: 31,
      rpcUrl: "https://public-node.testnet.rsk.co",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x2fAF5856C60C14730fd7594684C2C7d52097f440",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x50F1bbb486D62921eD9cE411c6b85Ec0B73D9130",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xb52c96C52F83F0741b1EEb1Cb6c1b73C57bDEb7B",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          name: "RskDAO",
        },
      ],
      NFT: [
        {
          address: "0xd0958A708F6347bb07B877a75Ff7E402116Ce089",
          name: "NounsDAO",
        },
      ],
    },
    {
      name: "Zircuit Testnet",
      chainId: 48899,
      rpcUrl: "https://zircuit1-testnet.p2pify.com",
      deployments: {
        DAO: {
          address: "",
          abi: DAOabi,
        },
        UnionProxyFactory: {
          address: "0x0B62BDA8EcE17AFfa7adAe16bBaBBC8584A30016",
          abi: UnionProxyFactoryabi,
        },
        ConvictionUnion: {
          address: "0x40C92d2E370b3d3944fDd90c922a407F02D286d1",
          abi: ConvictionUnionabi,
        },
        EqualUnion: {
          address: "0x44950f083691828A07c17d2A927B435e8B272F6D",
          abi: EqualUnionabi,
        },
        NFTUnion: {
          address: "0x1275917daAE6389C61c7B1E8199724D0b46Ed10f",
          abi: NFTUnionabi,
        },
        TraditionalUnion: {
          address: "0x0c17B9e142a0DDb42f075b0E2f1988691ea1d75a",
          abi: TraditionalUnionabi,
        },
        QuadraticUnion: {
          address: "0xC4e20B3BD1922A02c6DAC500De5754E3CC4046BB",
          abi: QuadraticUnionabi,
        },
        FlareUnion: {
          address: "0xC1AEA53f0c1EF35219A90Bec9495D3561a4B5951",
          abi: FlareUnionabi,
        },
      },
      DAOs: [
        {
          address: "0xd17Dd62290EcdEa48e5029a4fBd519245C911c19",
          name: "ZircuitDAO",
        },
      ],
      NFT: [
        {
          address: "0xE34906Eda6Cf2cafFa1d567523C7954fDf9E80E0",
          name: "NounsDAO",
        },
      ],
    },
  ],
};

module.exports = config;
