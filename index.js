// import libraries
require("monero-javascript");

// hello world
function hello(){
    console.log("Hello World!");
}
hello();

main();
async function main() {
    // create a client connected to monero-wallet-rpc
    let walletRpc = monerojs.connectToWalletRpc("http://localhost:38081", "superuser", "abctesting123");

    // create a wallet on monero-wallet-rpc
    await walletRpc.createWallet({
    path: "rpc_wallet",
    password: "supersecretpassword",
    mnemonic: "coexist igloo pamphlet lagoon...",
    restoreHeight: 1543218
    }); 

    // create wallet using WebAssembly
    let wallet = await monerojs.createWalletFull({
        path: "webassembly_wallet", // leave blank for in-memory wallet
        password: "supersecretpassword",
        networkType: "stagenet",
        mnemonic: "coexist igloo pamphlet lagoon...",
        restoreHeight: 1543218,
        serverUri: "http://localhost:38081",
        serverUsername: "daemon_user",
        serverPassword: "daemon_password_123"
    });

    let tx1 = await walletRpc.getTx();
    let tx2 = await wallet.getTx();

    console.log("RPC wallet transactions: " + tx1);
    console.log("WebAssembly wallet transactions: " + tx2);
}

