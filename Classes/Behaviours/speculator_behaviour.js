class SpeculatorBehaviour {
  constructor() {}

  decide(project) {
    let decision = {
      project: project,
      side: true,
      amount: 0,
      bet: false
    }

    if (!project.verified) {
      if (randnBm() > developerBetChance) {
        decision.side = randnBm() > 0.5;
        decision.amount = Math.round(200 * randnBm());
        decision.bet = true;
      }
    }
    return decision;
  }
}
