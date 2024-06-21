import {lockingBytecodeToCashAddress, hexToBin} from "@bitauth/libauth"
import { queryFtAddresses, getTapSwapOrigin } from "./queryChainGraphFT.js"
import 'dotenv/config';

const basePath = process.cwd();
import fs from "fs";

const tokenIdFt = process.env.TOKENID_FT;
const airdropAmountFt = process.env.AIRDROP_AMOUNT_TO_FT;
const satsAirdropAmount = process.env.SATS_AMOUNT_TO_FT;

const airdropToTapswap = false; // do not change

// Get airdrop list
const finalList = await getListRecipients();

// Get airdrop stats
const totalFts = finalList.reduce((accumulator, currentValue) => accumulator + currentValue[1],0,);
const totalAirdrop = totalFts * airdropAmountFt;
const totalSatsAirdrop = totalFts * satsAirdropAmount;
console.log("totalAddresses ", totalFts);
console.log("totalAirdrop ", totalAirdrop);
console.log("totalSatsAirdrop ", totalSatsAirdrop);

async function getListRecipients() {
    // note: chaingraph only returns first 5000 results
    const resultFtAddresses = await queryFtAddresses(tokenIdFt,0);
    const ftAddresses = resultFtAddresses.data.output;

    const ftsPerAddress = {};
    for(const element of ftAddresses) {
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
        ftsPerAddress[address] = 1;
    };
    let sortable = [];
    for (const address in ftsPerAddress) {
        sortable.push([address, ftsPerAddress[address]]);
    }
    // sort list recipient
    sortable.sort((a, b) =>  b[1] - a[1]);
    console.log(sortable);
    
    fs.writeFileSync(
      `${basePath}/recipientsFT.json`,
      JSON.stringify(sortable, null, 2)
    );

    return sortable
}