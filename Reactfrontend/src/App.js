import abi from "./contracts/Dapp.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4d9e2da94c61e2bca05db883d833deb2105fd500";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please Install MetaMask!");
        }
      } catch (error) {
        console.log("catch error->>>>>", error);
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="App">
      <Buy state={state}> </Buy>

      <p> Contract in Goerli Network </p>
      <p>Connected Account: {account} </p>

      <Memos state={state}> </Memos>
    </div>
  );
}

export default App;
