import { useState, useEffect } from "react";
import server from "../server";
import ModalSign from "./ModalSign";
import ErrorHandler from "./ErrorHandler";

function Transfer({
  address,
  addresses,
  setWalletError,
  recipientError,
  setRecipientError,
  amountError,
  setAmountError,
  txCounter,
  setTxCounter,
}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [destOptions, setDestOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [signature, setSignature] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorText,setErrorText] = useState("");

  useEffect(() => {
    const removeOrigin = () => {
      return addresses.filter((add) => add !== address);
    };
    setDestOptions(removeOrigin());
    setRecipient("");
  }, [address]);

  useEffect(() => {
    if (sendAmount > 0) {
      setAmountError(false);
    }
    if (!isNaN(sendAmount)) {
      setAmountError(false);
    }
  }, [sendAmount]);

  useEffect(() => {
    if (recipient) {
      setRecipientError(false);
    }
  }, [recipient]);
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (address === "") {
      setWalletError(true);
    } else if (recipient === "") {
      setRecipientError(true);
    } else if (sendAmount <= 0) {
      setAmountError(true);
    } else if (isNaN(sendAmount)) {
      setAmountError(true);
    } else {
      setWalletError(false);
      setRecipientError(false);
      setAmountError(false);
      setShowModal(true);
    }
  }

  return (
    <>
      <form className="container transfer" onSubmit={transfer}>
        {amountError && <ErrorHandler errorText="Invalid amount to transfer" />}
        {recipientError && (
          <ErrorHandler errorText="A valid recipient is requiered" />
        )}
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <select
            id=""
            onChange={(e) => setRecipient(e.target.value)}
            value={recipient}
            className="select-dropdown"
          >
            <option key="0" value="">
              {" "}
              -- Select a destination address address --{" "}
            </option>
            {destOptions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </label>

        <input type="submit" className="button" value="Transfer" />
      </form>
      <ModalSign
        showModal={showModal}
        setShowModal={setShowModal}
        address={address}
        recipient={recipient}
        signature={signature}
        setSignature={setSignature}
        sendAmount={sendAmount}
        txCounter={txCounter}
        setTxCounter={setTxCounter}
        errorModal = {errorModal}
        setErrorModal = {setErrorModal}
        errorText = {errorText}
        setErrorText = {setErrorText}
      />
    </>
  );
}

export default Transfer;
