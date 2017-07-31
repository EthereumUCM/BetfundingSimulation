class DeveloperBehaviour {
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
        decision.side = true;
        decision.amount = Math.round(200 * randnBm());
        decision.bet = true;
        decision.type = 0;
      }
    }
    return decision;
  }
}
