# CashTokens Airdrop Tool

a fork of [Airdrop-Tool](https://github.com/mr-zwets/airdrop-tool)

modified to exclude addresses from an airdrop and added fungible cashtokens to fungible cashtokens holders/addresses airdrop script

you need to install [nodejs](https://nodejs.org) and use a command line (e.g. Visual Studio, PowerShell etc.)

open the main folder, open example_env.txt, fill in the variables, rename to .env

navigate to the main directory

run

`npm i`

### Airdrop fungible tokens to NFTs holders/addresses (including TapSwap addresses)

run

`node recipientsNFT.js`

open recipientsNFT.json, remove manually addresses from the list (if you want to)

run

`node airdropNFT.js`

### Airdrop fungible cashtokens to fungible cashtokens holders/addresses (excluding TapSwap addresses)

navigate to the main directory

run

`node recipientsFT.js`

open recipientsFT.json, remove manually addresses from the list (if you want to)

run

`node airdropFT.js`

it was tested with <100 addresses (not sure if it works with e.g. 1000 addresses)

### Airdrop to random addresses

modify `recipientsNFT.json` or `recipientsFT.json` for your needs, e.g. if you want to test it - airdrop to only yourself (one address on the list)

sample

`recipients_sample.json`


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