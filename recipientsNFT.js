import {lockingBytecodeToCashAddress, hexToBin} from "@bitauth/libauth"
import { queryNftAddresses, getTapSwapOrigin } from "./queryChainGraphNFT.js"
import 'dotenv/config';

const basePath = process.cwd();
import fs from "fs";

const tokenIdNfts = process.env.TOKENID_NFTS;
const airdropAmountNft = process.env.AIRDROP_AMOUNT_TO_NFT;
const satsAirdropAmount = process.env.SATS_AMOUNT_TO_FT;

const airdropToTapswap = true; // change to false if you want to exclude TapSwap addresses

// Get airdrop list
const finalList = await getListRecipients();

// Get airdrop stats
const totalNfts = finalList.reduce((accumulator, currentValue) => accumulator + currentValue[1],0,);
const totalAirdrop = totalNfts * airdropAmountNft;
const totalSatsAirdrop = totalNfts * satsAirdropAmount;
console.log("totalNfts ", totalNfts);
console.log("totalAirdrop ", totalAirdrop);
console.log("totalSatsAirdrop ", totalSatsAirdrop);

async function getListRecipients() {
    // note: chaingraph only returns first 5000 results
    const resultNftAddresses = await queryNftAddresses(tokenIdNfts,0);
    const nftAddresses = resultNftAddresses.data.output;

    const nftsPerAddress = {};
    for(const element of nftAddresses) {
      const lockingBytecode = element.locking_bytecode;
        let address = lockingBytecodeToCashAddress(hexToBin(lockingBytecode.slice(2)), "bitcoincash");
        // Logic for P2SH addresses (Tapswap contracts)
        if(address.startsWith("bitcoincash:p")){
          if(!airdropToTapswap) continue;
          console.log("\n"+address);
          console.log(element.transaction_hash);
          const lockingBytecode2 = await getTapSwapOrigin(element.transaction_hash.slice(2));
          address = lockingBytecodeToCashAddress(hexToBin(lockingBytecode2.slice(2)), "bitcoincash");
          console.log(address)
        }
        nftsPerAddress[address] = (nftsPerAddress[address] || 0) + 1;
    };
    let sortable = [];
    for (const address in nftsPerAddress) {
        sortable.push([address, nftsPerAddress[address]]);
    }
    // sort list recipient
    sortable.sort((a, b) =>  b[1] - a[1]);
    console.log(sortable);
    
    fs.writeFileSync(
      `${basePath}/recipientsNFT.json`,
      JSON.stringify(sortable, null, 2)
    );

    return sortable
}