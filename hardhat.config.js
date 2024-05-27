require("@nomicfoundation/hardhat-toolbox");

const privateKeys = "c2796498187181a425ed0b2200f58ae7ad045accde7ef720044d18d11e1d0ffb";


module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    bnb: {
      url: 'https://rpc.ankr.com/bsc_testnet_chapel'  ,
      accounts: privateKeys.split(","),
    },
  },
};
