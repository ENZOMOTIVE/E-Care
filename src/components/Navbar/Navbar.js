import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
//import healthReport from "../../assets/health-report.png";
import { loadAccount } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";


const Navbar = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
 

  const connectHandler = async (e) => {
    await loadAccount(provider, dispatch);
  };


  return (
    <div className="Navbar">

      <div className="nav__name">
        
        <h2>MediCare- 2.O</h2>
      </div>

      {/* Option Links as Buttons */}
      <div className="Option">
        <Link to="/" className="opt__button">
          Form
        </Link>
        <Link to="/data" className="opt__button">
          Data
        </Link>
      </div>

   
      <div className="nav__balance">
        {balance ? (
          <div className="nav__myBalance-container">
            <p>
              <small>Balance: </small>
              {Number(balance).toFixed(4)}
            </p>
          </div>
        ) : (
          <div className="nav__myBalance-container">
            <p>
              <small> Balance: 0ETH </small>
             
            </p>
          </div>
        )}
        {account ? (
          <div className="nav__myAccount-container">
            <button className="nav__myAccount" onClick={() => {}}>
              {account.slice(0, 5) + "...." + account.slice(38, 42)}
              <Blockies
                seed={account}
                size={10}
                scale={3}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="identicon"
              />
            </button>
          </div>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
