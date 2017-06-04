//var Betfunding = artifacts.require("Betfunding");

function print(_string) {
    console.log(_string);
}

const Developer = require("./developer.js");
const Investor = require("./developer.js");
var bots = [];
bots[0] = new Developer(10);
bots[1] = new Investor(10);
print(bots);

for (var i = 0; i < bots.length; i++){
    bots[i].step();
}





