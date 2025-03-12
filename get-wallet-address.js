import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV3R2 } from "@ton/ton";

async function main() {
    const mnemonic = "spare bone agent monkey parrot more possible glad sand young rally congress hundred wing blur valve dilemma slide join jungle chimney lazy solve pencil";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });

    console.log(wallet.address.toString({ testOnly: true }));

    console.log("workchain:", wallet.address.workChain);

    // kQBFaV5BeMv8Lcw-b95C5MZXICSvHMq9j5XjDEjNzPySV3iR
    // 
}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});