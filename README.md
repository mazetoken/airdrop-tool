# CashTokens Airdrop Tool

a fork of [Airdrop-Tool](https://github.com/mr-zwets/airdrop-tool)

modified to exclude addresses from an airdrop

run

`npm i`

fill in the variables in the example_env.txt, rename the file to.env and run

`node recipient.js`

open recipient.json, remove wallet addresses from the list and run

`node airdrop.js`

---

**A handy Javascript program to airdrop fungible tokens to NFT holders!**

## What it is

A program to import a single-address wallet to airdrop fungible tokens to NFT holders.
The tool uses mainnet-js and chaingraph to do the airdrop.

## Disclaimer

Be careful with any program asking you to fill in your seedphrase!
Verify the source of the program and that is doing what it claims to be doing!

## Installation

```
git clone git@github.com:mr-zwets/airdrop-tool.git
npm install
```

## How to use it

Configure the wallet holding the tokens and the airdrop parameters in a `.env` file in the following way:

```bash
SEEDPHRASE = ""
DERIVATIONPATH = "m/44'/145'/0'/0/0"
TOKENID_FUNGIBLE = ""
TOKENID_NFTS = ""
AIRDOP_AMOUNT_NFT = ""
```

There is a boolean in the `airdrop.js` program to enable/disable airdrop to Tapswap addresses.

Finally, run the airdrop tool with

```
node airdrop.js
```