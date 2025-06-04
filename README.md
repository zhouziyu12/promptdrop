💡 PromptDrop

A Web3 platform combining AI prompt storage, NFT minting, VRF randomness, DeFi incentives, and DAO governance.






📌 Project Overview

PromptDrop is a decentralized platform designed to reward AI prompt creators.Users can upload high-quality prompts stored as NFTs. Each day, a prompt is randomly selected using Chainlink VRF and rewarded. The platform features DeFi token incentives and DAO-based governance.

✨ Features

Module

Description

🕓 Prompt Storage

Store AI prompts on-chain or via IPFS with full attribution

🎲 VRF Lottery

Chainlink VRF selects daily winner from minted prompts

🖼️ Prompt NFTs

Users mint prompts as ERC721 NFTs

💰 DeFi Rewards

ERC20 tokens rewarded to featured prompt creators

🗳️ DAO Governance

NFT holders vote on future feature proposals

🧱 Tech Stack

Smart Contracts: Solidity 0.8.20 + Hardhat + OpenZeppelin

Frontend: Next.js 14 + Tailwind CSS + App Router

Wallet: wagmi v1 + ethers.js 6.8+

Chain Services: Chainlink VRF v2, ERC721, ERC20, Governor

Testnet: Sepolia (Alchemy RPC)

Tooling: hardhat-deploy, TypeChain

📆 Dev Timeline

Day

Task Description

Status

✅ Day 1

Scaffold-Alchemy setup, connect wallet, Git init

Done

✅ Day 2

Write & deploy PromptNFT.sol + Mint button UI

Done

🔄 Day 3

Add PromptVRF.sol + Chainlink VRF integration

Next

⏳ Day 4

Reward ERC20 logic + DAO governance base

Soon

🚀 Quick Start

✅ Install dependencies

yarn install

🛠️ Deploy to Sepolia

cd packages/hardhat
yarn deploy

Contracts Deployed:

PromptStorage

PromptNFT

PromptVRF

PromptToken

PromptGovernor

💻 Start frontend

cd packages/nextjs
yarn dev

Then open:  http://localhost:56900Log in with Google → create AA Wallet → upload prompts.

📁 Directory Structure

packages/
├── hardhat/       # Smart contracts & deployment scripts
├── nextjs/        # Frontend (Next.js + wagmi + Tailwind)
├── shared/        # Shared config (network, constants)

🌍 Deployed Contracts (Sepolia)

Contract

Address

PromptNFT

0xd1a31a1312cd0ac7d5d2d2017810c4c48ecb8764 (example)

PromptVRF

pending

Governor

pending

ERC20 Token

pending

🛡️ Security Notes

✅ Tested with Hardhat + chai + ethers

⚠️ Solidity ^0.8.20 avoids integer overflow

⚠️ Chainlink VRF v2 with secure subscription

⚠️ DAO proposals protected with TimeLockController

💡 Future Plans

Prompt NFT marketplace integration

VRF reward weighting based on user engagement

Snapshot-based off-chain DAO voting

L2 support (e.g., Base, Arbitrum)

🤝 Contributors

Created by @zhouziyu12 & teammateBuilt for Chainlink Hackathon 2025

📄 License

MIT License © 2025 PromptDrop Team

