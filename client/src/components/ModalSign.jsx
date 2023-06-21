import { useState } from "react";
import ReactModal from "react-modal";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import server from "../server";
import ErrorHandler from "./ErrorHandler";


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
  txCounter,
  setTxCounter,
  errorModal,
  setErrorModal,
  errorText,
  setErrorText
}) => {
  const [privateKey, setPrivateKey] = useState("");
 
  const sign = async (evt) => {
    setErrorModal(false);
    setErrorText("");
    evt.preventDefault();
    const txData = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient: recipient
    }
    let signedMessage;
    let recoverBit;
    const txDataHashed = toHex(keccak256(utf8ToBytes(JSON.stringify(txData))));
    try {
       [signedMessage, recoverBit] = await secp.sign(txDataHashed, privateKey, { recovered: true });

    } catch {
      setErrorModal(true);
      setErrorText("Error while signing message. Check Private Key.");
    }


    const transaction = {
      address: address,
      txData: txData,
      txDataHashed: txDataHashed,
      signature: toHex(signedMessage),
      recoverBit: recoverBit
    }


    try {
      const {
        data: { balance },
      } = await server.post(`transfer`, transaction);
      setTxCounter(txCounter + 1);
      setShowModal(false);
    } catch (ex) {
      setErrorModal(true);
      setErrorText(ex.response.data.message);
    }

  }

  const handleCancel = (evt)=>{
    evt.preventDefault();
    setErrorModal(false);
    setErrorText("");
    setShowModal(false);
  }

  const setValue = (setter) => (evt) => setter(evt.target.value);
  return (
    <ReactModal
      className="modal"
      isOpen={showModal}
      contentLabel="Sign Transfer"
      appElement={document.getElementById('root')}>
      {errorModal && (
        <ErrorHandler errorText={errorText} />
      )}

      <form className="transfer" onSubmit={sign}>
        <h1>Sign Transaction</h1>

        <label>
          Enter Private key
          <input
            placeholder="0123456789ABCDEF...."
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
        <button className="button cancel" onClick={handleCancel}>Cancel</button>
      </form>


    </ReactModal>
  );
};

export default ModalSign;
