require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";
const BNB = process.env.BNB_RPC;

module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {},
    BNB: {
      url: BNB,
      accounts: privateKeys.split(","),
    },
  },
};
