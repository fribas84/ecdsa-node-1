

function Wallet({ address, setAddress, balances }) {


  const options = Object.entries(balances).map(([address, balance]) => (
    <option key={address} value={address} className="select-option">
      {address}
    </option>
  ));

  return (
    <div className="container">
      <h1>Select Wallet</h1>
      <div className="select-dropdown">
        <select id="" onChange={e=>setAddress(e.target.value)} value={address}>
          <option value=""> -- Select an address -- </option>
          {options}
        </select>
      </div>
    </div>
  );
}

export default Wallet;
