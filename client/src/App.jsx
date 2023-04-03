import Wallet from "./components/Wallet";
import Transfer from "./components/Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";
import Balances from "./components/Balances";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [balances, setBalances] = useState({});

  useEffect( () => {
    const getData = async ()=>{
      const {
        data: {balances},
      } = await server.get(`balances`);
      setBalances(balances);
    }
    getData();  
  }, [])
  

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <Balances balances={balances} />

    </div>
  );
}

export default App;
