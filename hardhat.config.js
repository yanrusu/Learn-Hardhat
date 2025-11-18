/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const ARBITRUM_SEPOLIA_PRIVATE_KEY = vars.get("ARBITRUM_SEPOLIA_PRIVATE_KEY");

module.exports = {
  solidity: "0.8.20",
  networks: {
    arbitrumSepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [ARBITRUM_SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: vars.get("ETHERSCAN"),
  },
};

