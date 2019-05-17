const cr = artifacts.require('copyright');
module.exports = function(deployer) {
  // Use deployer to state migration tasks
  deployer.deploy(cr);
};
