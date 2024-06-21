import { Wallet, SendRequest, OpReturnData } from "mainnet-js";
import 'dotenv/config';
import recipientsNft from "./recipientsNFT.json" assert {type: "json"};

const seedphase = process.env.SEEDPHRASE;
const derivationPathAddress = process.env.DERIVATIONPATH;
const satsAirdropAmount = process.env.SATS_AMOUNT;
const opReturn = process.env.OP_RETURN;

// Initialize wallet & check balance
const wallet = await Wallet.fromSeed(seedphase, derivationPathAddress);
const walletAddress = wallet.getDepositAddress();
const balance = await wallet.getBalance();
console.log(`wallet address: ${walletAddress}`);
console.log(`Bch amount in walletAddress is ${balance.bch}bch or ${balance.sat}sats`);
//if(balance.sat < 10_000) throw new Error("Wallet does not have enough BCH to start the airdrop!");
//if(tokenBalance < totalAirdrop) throw new Error("Wallet does not have enough tokens to execute the airdrop!");

// Start airdrop
await airdropTokens(recipientsNft);

async function airdropTokens(listRecipients){
  for(let i = 0; i<listRecipients.length; i++){
    console.log(`payout ${i+1} of the ${listRecipients.length}`);
    const element = listRecipients[i];
    const destinationAddress = element[0];
    const airdropAmountAddress = element[1] * satsAirdropAmount;
  
    let opreturnData = OpReturnData.from(opReturn);
    const airdropOutput = new SendRequest(
        {
            cashaddr: destinationAddress,
            value: airdropAmountAddress,
            unit: "sats"
        }
    );
    const { txId } = await wallet.send([airdropOutput, opreturnData]);
    console.log(txId);
  }
}