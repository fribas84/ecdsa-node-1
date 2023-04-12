import { useState } from "react";
import ReactModal from "react-modal";
import {toHex, utf8ToBytes} from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";

// SetShowModal={SetShowModal}
// address={address}
// recipient={recipient}
// signature = {signature}
// SetSignature = {SetSignature}
// sendAmount = {sendAmount}

const ModalSign = ({
  showModal,
  setShowModal,
  address,
  recipient,
  signature,
  setSignature,
  sendAmount,
}) => {
  const [privateKey, setPrivateKey] = useState("");
  console.log(privateKey);

  const sign = async (evt) =>{
    evt.preventDefault();
    const txtData = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient: recipient
    }
    const txtDataHex = toHex(keccak256(utf8ToBytes(JSON.stringify(txtData))));
    const [signedMessage,recoverBit] = await secp.sign(txtDataHex,privateKey,{recovered: true});

    const transaction= {
      address: address,
      txtData: txtData,
      signature: toHex(signedMessage),
      recoverBit: recoverBit
    }
    console.log("Tx: ",transaction);


  }


  const setValue = (setter) => (evt) => setter(evt.target.value);
  return (
    <ReactModal
        className ="modal"
        isOpen={showModal}
        contentLabel="Sign Transfer"
        appElement={document.getElementById('root')}>
      <form className="transfer" onSubmit={sign}>
        <h1>Sign Transaction</h1>

        <label>
          Enter Private key
          <input
            placeholder="0x12345678...."
            value={privateKey}
            onChange={setValue(setPrivateKey)}
          ></input>
        </label>

        <label>
          Origin Address:
          <input
            disabled={true}
            value={address}
          ></input>
        </label>
        <label>
          Destination Address:
          <input
            disabled={true}
            value={recipient}
          ></input>
        </label>

        <label>
          Amount:
          <input
            disabled={true}
            value={sendAmount}
          ></input>
        </label>



        <input type="submit" className="button" value="Sign and Send" />
        <button className="button cancel" onClick={() => setShowModal(false)}>Cancel</button>
      </form>
      
      
    </ReactModal>
  );
};

export default ModalSign;
