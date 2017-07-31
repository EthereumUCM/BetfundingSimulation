class InvestorBehaviour {
  constructor() {}

  decide(project) {
    let decision = {
      project: project,
      side: true,
      amount: 0,
      bet: false
    }

    if (!project.verified) {
      if (randnBm() > investorBetChance) {
        decision.side = false;
        decision.amount = Math.round(100 * randnBm());
        decision.bet = true;
        decision.type = 1;
      }
    }
    return decision;
  }
}
