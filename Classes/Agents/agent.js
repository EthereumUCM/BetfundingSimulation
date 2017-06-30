class Agent {
  constructor(address) {
    this._address = address;
    this.changeBehaviour();
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
  }

  calcAmount() {
    return Math.round(500 * randnBm()); //Calc amount
  }

  epoch() {
    for (let i = 0; i < projects.length; i++) {
      let decision = this._behaviour.decide(projects[i]);
      if (decision.bet) {
        this.bet(decision);
      }
    }
    if (randnBm > changeBehaviourChance) {
      this.changeBehaviour();
    }
  }

  changeBehaviour() {
    let behaviourGenerator = randnBm();
    if (behaviourGenerator > behaviourSpeculatorChance) {
      this._behaviour = new SpeculatorBehaviour();
    } else if (behaviourGenerator > behaviourInvestorChance) {
      this._behaviour = new InvestorBehaviour();
    } else {
      this._behaviour = new DeveloperBehaviour();
    }
  }

  bet(decision) {
    var amountBet = decision.amount;
    try {
      betfundingInstance.bet(decision.project.index, decision.side, {
        value: amountBet,
        from: this._address,
        gas: 300000
      }, function(error, result) {
        if (!error)
          console.log(result);
        else
          console.error(error);
      });
      if (decision.side) {
        numPositiveBets[epochs] += 1;
        decision.project.numPosBets += 1;
        decision.project.amountPosBets += amountBet;
      } else {
        numNegativeBets[epochs] += 1;
        decision.project.numNegBets += 1;
        decision.project.amountNegBets += amountBet;
      }
    } catch (error) {}
  }
}
