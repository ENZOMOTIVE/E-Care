import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../App.css";
import Data from "./Data/Data";
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Alert from "./Alert/Alert";
import {
  loadAccount,
  loadAllData,
  loadMedical,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "../store/interactions";
import config from "../config.json";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    try {
      const provider = loadProvider(dispatch);
      const chainId = await loadNetwork(provider, dispatch);
      const medical_config = config[chainId]?.medical; // Using optional chaining
      
      if (!medical_config || !medical_config.address) {
        throw new Error("Medical contract address is not found in the configuration");
      }
  
      window.ethereum.on("accountsChanged", () => {
        loadAccount(provider, dispatch);
      });
  
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
  
      const medical = await loadMedical(provider, medical_config.address, dispatch); // Assuming loadMedical is async
      if (!medical) {
        throw new Error("Medical contract is undefined");
      }
  
      loadAllData(provider, medical, dispatch);
      subscribeToEvents(medical, dispatch);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      // Handle error (e.g., display error message to the user)
    }
  };
  
  

  useEffect(() => {
    loadBlockchainData();
  }, []); // Added an empty dependency array to avoid repeated calls

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" exact element={<Form />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      <Alert />
    </div>
  );
}

export default App;