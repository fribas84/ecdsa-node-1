const secp = require("ethereum-cryptography/secp256k1");
const { toHex,utf8ToBytes,hexToBytes } = require("ethereum-cryptography/utils"); 
const { keccak256 } = require("ethereum-cryptography/keccak");


const keys = []

for (let i = 0; i < 4; i++) {
    console.log("Account: " + i);
    const privateKey = secp.utils.randomPrivateKey();
    console.log('Private Key: 0x' + toHex(privateKey));
    const v = secp.getPublicKey(privateKey);
    console.log('Public Key: 0x' + toHex(keccak256(v.slice(1)).slice(-20)));
    keys.push({
        privateKey: toHex(privateKey),
        publicKey: toHex(v)
    })
}

console.log(keys);

const message = 'This is a signed message'

const txtDataHex = toHex(utf8ToBytes(message));


const sign = async () =>{
    
    const hashedMSG = keccak256(utf8ToBytes(message));
    
    const [singedMessage,recoverBit] = await secp.sign(hashedMSG,keys[0].privateKey, {recovered: true})
    console.log("signed " + singedMessage);
    console.log("recoverBit "+ recoverBit);
    const fullSig = new Uint8Array([recoverBit, ...singedMessage]);
    console.log("FullSig " + fullSig);
    const hexSigned = toHex(singedMessage);
    console.log("signed to hex: " + hexSigned );
    const fullSignatureBytes = hexToBytes(hexSigned);
    const recoverBit2 = fullSignatureBytes[0]
    console.log("recover2 " + recoverBit2);
    console.log("recoverBit "+ recoverBit);

    const signatureBytes2 = fullSignatureBytes.slice(1);

    const publicKey2 = secp.recoverPublicKey(hashedMSG, singedMessage,recoverBit);
    console.log("public recovered " + toHex(publicKey2)); 
    console.log("public Original " +  keys[0].publicKey);

}


sign();


