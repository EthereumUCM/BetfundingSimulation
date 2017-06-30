function printChart() {
  var pb = 0;
  var nb = 0;
  var ap = 0;
  var an = 0;
  var pv = 0;
  var pip = 0;

  for (var i = 0; i < projects.length; i++) {
    pb += projects[i].numPosBets;
    nb += projects[i].numNegBets;
    ap += projects[i].amountPosBets;
    an += projects[i].amountNegBets;
    if (projects[i].verified) {
      pv += 1;
    } else {
      pip += 1;
    }
  }

  window.myPie.config.data.datasets[0].data = [nb, pb];
  window.myPie.config.data.datasets[1].data = [an, ap];
  window.myPie.update();

  window.myPie2.config.data.datasets[0].data = [pv, pip];
  window.myPie2.update();

  var pbetsplot = [];
  var nbetsplot = [];
  for (var i = 0; i < epochs; i++) {
    pbetsplot.push({
      x: i + 1,
      y: numPositiveBets[i + 1]
    });
    nbetsplot.push({
      x: i + 1,
      y: numNegativeBets[i + 1]
    });
  }
  window.myScatter.config.data.datasets[0].data = pbetsplot;
  window.myScatter.config.data.datasets[1].data = nbetsplot;
  window.myScatter.update();
}
