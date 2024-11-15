const proposals = [
  {
    id: 1,
    proposer: "0xA2d6267B5b167Ee27174BfDa808408F90391D949",
    endBlock: 17459490,
    address: "0x317EA248E82581b42cbec0969e21EB5cd66F0685",
    metadata: {
      id: "1038729d-a324-4233-a0c7-246de715cf96",
      title:
        "Implementation of Dynamic Staking Rewards with Cross-Chain Integration",
      description:
        "We propose implementing a comprehensive upgrade to our DAO's tokenomics and governance structure on Base testnet. The upgrade introduces dynamic staking rewards ranging from 8-15% APY, calculated through a combination of base rate (8%), TVL multiplier (0-4%), and governance participation bonus (0-3%). The minimum stake requirement will be set at 1000 tokens, with a maximum stake cap per wallet of 5% of the total supply. The governance mechanism will implement time-weighted voting power, where 1 token equals 1 base vote, multiplied by a staking duration factor (up to 2.5x for 12+ months commitment). A 14-day unbonding period will be enforced with no rewards during this timeframe. To ensure protocol security and sustainability, we'll implement multi-signature requirements for admin functions, emergency pause capabilities, and cross-chain treasury diversification. The implementation will be phased over 6 weeks, starting with testnet deployment and security audits, followed by interface testing and bug bounty program, and concluding with gradual migration of existing stakes. The proposal allocates 100,000 tokens for development, 50,000 for security audits, 250,000 for liquidity provision, and 500,000 for the initial rewards pool. Success metrics include a 25% increase in TVL, 40% increase in governance participation, and successful cross-chain operations with less than 1% failure rate. All smart contracts will be developed using Solidity ^0.8.19, with full upgradeability support and comprehensive security measures. This testnet implementation will serve as a crucial testing ground before mainnet deployment, with all parameters subject to adjustment based on performance and community feedback.",
    },
  },
];

export default proposals;
