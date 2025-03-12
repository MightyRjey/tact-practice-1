import { mnemonicToWalletKey } from "@ton/crypto";
import { fromNano, TonClient, WalletContractV3R2 } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

async function main() {
    const mnemonic = "spare bone agent monkey parrot more possible glad sand young rally congress hundred wing blur valve dilemma slide join jungle chimney lazy solve pencil";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const balance = await client.getBalance(wallet.address);
    console.log("balance: ", fromNano(balance));

    const WalletContract = client.open(wallet);
    const seqno = await WalletContract.getSeqno();
    console.log("seqno: ", seqno);
}

main();