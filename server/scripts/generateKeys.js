const secp = require("ethereum-cryptography/secp256k1");
const { toHex,utf8ToBytes,hexToBytes } = require("ethereum-cryptography/utils"); 
const { keccak256 } = require("ethereum-cryptography/keccak");

const keys = [];


for (let i = 0; i < 4; i++) {
    console.log("Account: " + i);
    const privateKey = secp.utils.randomPrivateKey();
    const v = secp.getPublicKey(privateKey);
    const address = toHex(keccak256(v).slice(-20));
    keys.push({
        privateKey: toHex(privateKey),
        publicKey: toHex(v),
        address: address
    })
}

console.log(keys);
