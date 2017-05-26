var Betfunding = artifacts.require("Betfunding");

let betfundingInstance;

module.exports = function(done) {
  Betfunding.deployed().then(function(instance) {
    betfundingInstance = instance;

    return betfundingInstance.createProject("p1", "d1", 1234567891234567, "0x123");
  }).then(function(result) {

    return betfundingInstance.numProjects.call(0);
  }).then(function(num) {
    console.log(num);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};
