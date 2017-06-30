// Standard Normal variate using Box-Muller transform.
function randnBm() {
  var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
  var v = 1 - Math.random();
  return (
    (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)) +
    5.4) / 10; // Range 0..1
}

// Log in the text area
function log(s) {
  $("#logarea").append(s + "\n");
}

function getNumProjects() {
  for (var i = 0; i < projects.length; i++) {
    log("");
    log(projects[i].name);
    log("difficulty: " + projects[i].difficulty);
    log("social impact: " + projects[i].socialImpact);
    log("verified: " + projects[i].verified);
    log("-----");
    log("Positive bets: " + projects[i].numPosBets);
    log("Amount of positive bets: " + projects[i].amountPosBets);
    log("-----");
    log("Negative bets: " + projects[i].numNegBets);
    log("Amount of negative bets: " + projects[i].amountNegBets);
    log("_________");
  }
  return betfundingInstance.numProjects.call().toNumber();
}
