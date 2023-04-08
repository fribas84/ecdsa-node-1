import { useState } from "react";
import ReactModal from "react-modal";

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

  const sing = () =>{

    const txtData = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient: recipient
    }

    
      // try {
      //   const {
      //     data: { balance },
      //   } = await server.post(`send`, {
      //     sender: address,
      //     amount: parseInt(sendAmount),
      //     recipient,
      //   });
      //   setBalance(balance);
      // } catch (ex) {
      //   alert(ex.response.data.message);
      // }


  }
  const setValue = (setter) => (evt) => setter(evt.target.value);
  return (
    <ReactModal
        className ="modal"
        isOpen={showModal}
        contentLabel="Sing Transfer"
        appElement={document.getElementById('root')}>
      <form className="transfer" onSubmit={sing}>
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
