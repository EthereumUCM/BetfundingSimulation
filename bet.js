var Betfunding = artifacts.require("Betfunding");

let betfundingInstance;

module.exports = function(done) {
  Betfunding.deployed().then(function(instance) {
    betfundingInstance = instance;

    return betfundingInstance.bet(0, true, {value: 1000});
  }).then(function() {

    return betfundingInstance.getBets.call(0);
  }).then(function(bets) {
    console.log(bets);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};
