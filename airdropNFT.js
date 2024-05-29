import { Wallet, TokenSendRequest } from "mainnet-js";
import 'dotenv/config';
import recipientsNft from "./recipientsNFT.json" assert {type: "json"};

const seedphase = process.env.SEEDPHRASE;
const derivationPathAddress = process.env.DERIVATIONPATH;
const tokenIdFungible = process.env.TOKENID_FUNGIBLE;
const airdropAmountNft = process.env.AIRDOP_AMOUNT_TO_NFT;

// Initialize wallet & check balance
const wallet = await Wallet.fromSeed(seedphase, derivationPathAddress);
const walletAddress = wallet.getDepositAddress();
const balance = await wallet.getBalance();
const tokenBalance = await wallet.getTokenBalance(tokenIdFungible);
console.log(`wallet address: ${walletAddress}`);
console.log(`Bch amount in walletAddress is ${balance.bch}bch or ${balance.sat}sats`);
if(balance.sat < 10_000) throw new Error("Wallet does not have enough BCH to start the airdrop!");
if(tokenBalance < totalAirdrop) throw new Error("Wallet does not have enough tokens to execute the airdrop!");

// Start airdrop
await airdropTokens(recipientsNft);

async function airdropTokens(listRecipients){
  for(let i = 0; i<listRecipients.length; i++){
    console.log(`payout ${i+1} of the ${listRecipients.length}`);
    const element = listRecipients[i];
    const destinationAddress = element[0];
    const airdropAmountAddress = element[1] * airdropAmountNft;
  
    const airdropOutput = new TokenSendRequest({
      cashaddr: destinationAddress,
      value: 800,
      tokenId: tokenIdFungible,
      amount: airdropAmountAddress
    });
    const { txId } = await wallet.send([airdropOutput]);
    console.log(txId);
  }
}