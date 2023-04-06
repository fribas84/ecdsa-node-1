import Wallet from "./components/Wallet";
import Transfer from "./components/Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";
import Balances from "./components/Balances";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [balances, setBalances] = useState({});
  const [wallet,setWallet] = useState("");

  useEffect( () => {
    const getData = async ()=>{
      const {
        data: {balances},
      } = await server.get(`balances`);
      setBalances(balances);
    }
    getData();  

  },[])
  
  useEffect(()=>{
    const fillAddresses = () =>{
      const addss=[];
      Object.entries(balances).map(([address, balance]) => {
        addss.push(address);
      })
      setAddresses(addss);
    }
    fillAddresses();
    }
        ,[balances])

  return (
    <div className="app">
      <Wallet
        address={address}
        setAddress={setAddress}
        balances={balances}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        addresses={addresses}
      />
      <Balances balances={balances} />

    </div>
  );
}

export default App;
