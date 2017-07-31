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
      if (project.difficulty > 0.4 && project.amountPosBets > 200) {
        decision.side = false;
        decision.amount = Math.round(200 * randnBm());
        decision.bet = true;
        decision.type = 2;
      }

      if (project.difficulty < 0.3 && project.amountNegBets > 300) {
        decision.side = true;
        decision.amount = Math.round(200 * randnBm());
        decision.bet = true;
        decision.type = 2;
      }
    }
    return decision;
  }
}
