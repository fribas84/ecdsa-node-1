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
  const [walletError,setWalletError]=useState(false);
  const [recipientError,setRecipientError]=useState(false);
  const [amountError,setAmountError] = useState(false);
  const [txCounter,setTxCounter]=useState(0);


  
  useEffect( () => { 
    const getData = async ()=>{
      const {
        data: {balances},
      } = await server.get(`balances`);
      setBalances(balances);
    }
    getData()
  },[])
  useEffect(() => {
    const getData = async ()=>{
    const {
      data: {balances},
    } = await server.get(`balances`);
    setBalances(balances);
  }
 getData()},[txCounter])
  
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
    <>
    <h1 className="heading">Wallet - Sign transactions</h1>
    <div className="app">
      
      
     
      <Wallet
        address={address}
        setAddress={setAddress}
        balances={balances}
        walletError = {walletError}
        setWalletError = {setWalletError}

      />
      <Transfer
        setBalance={setBalance}
        address={address}
        addresses={addresses}
        setWalletError={setWalletError}
        recipientError={recipientError}
        setRecipientError={setRecipientError}
        amountError={amountError}
        setAmountError={setAmountError}
        txCounter={txCounter}
        setTxCounter={setTxCounter}
      />
      <Balances balances={balances} />

    </div>
    </>
  );
}

export default App;
