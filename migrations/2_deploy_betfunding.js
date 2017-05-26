var Betfunding = artifacts.require("Betfunding");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  deployer.deploy(Betfunding);
};
