//import "../App.scss"; 

function Wallet({ address, setAddress, balances }) {
  // async function onChange(evt) {
  //   const address = evt.target.value;
  //   setAddress(address);
  //   if (address) {
  //     const {
  //       data: { balance },
  //     } = await server.get(`balance/${address}`);
  //     setBalance(balance);
  //   } else {
  //     setBalance(0);
  //   }
  // }

  console.log("address : " + address);

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
