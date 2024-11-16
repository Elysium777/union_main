# Delegator's _Union_

Unite with other delegators to maximize your voting impact and influence decisions.

![Made-With-React](https://img.shields.io/badge/MADE%20WITH-NEXT-000000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=nextdotjs)
![Made-With-Tailwind](https://img.shields.io/badge/MADE%20WITH-TAILWIND-06B6D4.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=tailwindcss)
![Made-With-Javascript](https://img.shields.io/badge/MADE%20WITH-Javascript-ffd000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=javascript)
![Made-With-Base](https://img.shields.io/badge/Deployed%20on-Base-0000ff.svg?colorA=222222&style=for-the-badge&logoWidth=14)

> **Union** is a platform that allows delegators to unite and maximize their voting impact. Delegators delegate their voting power to a union. This union then votes on behalf of the delegators, based on the majority vote of the delegators.

## Types of Unions

> 1.  **Traditional Union**: Classic one-token-one-vote system with straightforward majority rules.
> 2.  **Equal Union**: Democratic one-person-one-vote system regardless of token holdings.
> 3.  **Conviction Union**: Time-weighted voting system that rewards long-term commitment.
> 4.  **NFT Union**: Unique voting power based on NFT holdings and attributes.

This is the Repo for _[getUnion.xyz](https://getUnion.xyz/)_ which is built during the _[ETH Bangkok 2024](https://ethglobal.com/events/bangkok)_.

## Deployments

- **Base Sepolia**

  - Union Proxy Factory - [0x3705505C5690a836b33736CD13568Ee8700D35c4](https://https://sepolia.basescan.org/address/0x3705505C5690a836b33736CD13568Ee8700D35c4)
  - Conviction Union - [0x40c47752fcB1CA46D1b6Db5d715f5028f2a0Cb64](https://https://sepolia.basescan.org/address/0x40c47752fcB1CA46D1b6Db5d715f5028f2a0Cb64)
  - Equal Union - [0x979602c7512024c01c14D42Bd27865886Ff38Dca](https://https://sepolia.basescan.org/address/0x979602c7512024c01c14D42Bd27865886Ff38Dca)
  - NFT Union - [0x3C7A418F01aA794C004cc6ba1Ad22a7eEA8BE232](https://https://sepolia.basescan.org/address/0x3C7A418F01aA794C004cc6ba1Ad22a7eEA8BE232)
  - Traditional Union - [0x969ef16DbFb73c5eB2191CBF3632779C741750eE](https://https://sepolia.basescan.org/address/0x969ef16DbFb73c5eB2191CBF3632779C741750eE)

#

> **Pre-requisites:**
>
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
> - Clone this repository

```bash
# Install dependencies
npm install

# fill environments
cp .env.local.example .env.local
```

## Development

```bash
# Start development server
npm run dev

# Build production frontend & start server
npm run build
npm run start
```
