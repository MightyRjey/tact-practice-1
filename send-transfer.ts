import { mnemonicToWalletKey } from "@ton/crypto";
import { fromNano, internal, TonClient, WalletContractV3R2 } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const mnemonic = "spare bone agent monkey parrot more possible glad sand young rally congress hundred wing blur valve dilemma slide join jungle chimney lazy solve pencil";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV3R2.create({ publicKey: key.publicKey, workchain: 0 });

    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("Wallet is not deployed");
    }

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            internal({
                to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
                value: "0.05",
                body: "Hello",
                bounce: false
            })
        ]
    });

    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log("Waiting for transfer to confirm ...");
        sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }

    console.log("Transaction confirmed!");

}

main();


