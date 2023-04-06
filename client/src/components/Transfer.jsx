import { useState, useEffect } from "react";
import server from "../server";

function Transfer({ address, setBalance, addresses }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [destOptions, setDestOptions] = useState([]);

  useEffect(() => {
    const removeOrigin = () => {
      return addresses.filter(add => add !== address);
    }
    setDestOptions(removeOrigin());
    setRecipient("");
  },
    [address]);
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
  evt.preventDefault();
  try {
    const {
      data: { balance },
    } = await server.post(`send`, {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    });
    setBalance(balance);
  } catch (ex) {
    alert(ex.response.data.message);
  }
}

return (
  <form className="container transfer" onSubmit={transfer}>
    <h1>Send Transaction</h1>

    <label>
      Send Amount
      <input
        placeholder="1, 2, 3..."
        value={sendAmount}
        onChange={setValue(setSendAmount)}
      ></input>
    </label>

    <div>
      Recipient
      <div className="select-dropdown">
        <select id="" onChange={e => setRecipient(e.target.value)} value={recipient}>
          <option key="0" value=""> -- Select a destination address address -- </option>
            {
              destOptions.map((val)=> <option key={val} value={val}>{val}</option>

              )
            }
        </select>
      </div>
    </div>

    <input type="submit" className="button" value="Transfer" />
  </form>
  );
}

export default Transfer;
