const secp = require("ethereum-cryptography/secp256k1");
const { toHex,utf8ToBytes,hexToBytes } = require("ethereum-cryptography/utils"); 
const { keccak256 } = require("ethereum-cryptography/keccak");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "dc7be91c510c5145095342d3a8b700988baf8eed": 100,
  "2b3ba6bbd7ef60399ebbb74067499ba5ddf37cd1": 50,
  "fc699b0d0b160785b1c1d255b075c254a8934b97": 75,
  "4c1f52542535c85663b1d87188aa855c2c75e653": 25,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/balances", (req,res)=>{
  res.send({balances});

})

app.post("/transfer", (req, res) => {
  const { address, txData,txDataHashed, signature, recoverBit } = req.body;
  const amount = txData.amount;
  const pubKey = secp.recoverPublicKey(txDataHashed,signature,recoverBit);
  const hashKey = keccak256(pubKey);
  const hexAddr = toHex(hashKey.slice(-20));
 if(hexAddr===address){
    if(balances[address]>=amount){
      balances[address] = balances[address]- amount;
      balances[txData.recipient] += amount;
      res.status(200).send({balances});
    }
    else{
      res.status(400).send({ message: "Not enough funds!" });
    }
  }
  else{
    res.status(400).send({message:"Signature is invalid"});
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
