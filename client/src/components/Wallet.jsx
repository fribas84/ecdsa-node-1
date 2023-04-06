

function Wallet({ address, setAddress, balances }) {


  const options = Object.entries(balances).map(([address, balance]) => (
    <option key={address} value={address} className="select-option">
      {address}
    </option>
  ));

  return (
    <div className="container">
      <h1>Select Wallet</h1>
      <label>
        Select Origin Wallet - Private Key will be need to sing the message
        <select id="" onChange={e=>setAddress(e.target.value)} value={address} className="select-dropdown">
          <option value=""> -- Select an address -- </option>
          {options}
        </select>
      </label>
    </div>
  );
}

export default Wallet;
