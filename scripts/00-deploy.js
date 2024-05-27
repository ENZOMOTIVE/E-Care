const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying smart contract...");

  // Get the contract factory
  const Medical = await ethers.getContractFactory("MedicalRecords");

  // Get the list of signers
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const medical = await Medical.deploy();

  // Wait for the deployment to be mined
  await medical.deployed();

  console.log(`Medical is deployed at address: ${medical.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
