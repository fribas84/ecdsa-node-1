const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

for (let i = 0; i < 4; i++) {
    console.log("Account: " + i);
    const privateKey = secp.utils.randomPrivateKey();
    console.log('Private Key: 0x' + toHex(privateKey));
    const publicKey = secp.getPublicKey(privateKey);
    console.log('Public Key: 0x' + toHex(keccak256(publicKey.slice(1)).slice(-20)));
}


