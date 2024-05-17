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
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    const medical_config = config[chainId].medical;

    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    const medical = loadMedical(provider, medical_config.address, dispatch);
    loadAllData(provider, medical, dispatch);
    subscribeToEvents(medical, dispatch);
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