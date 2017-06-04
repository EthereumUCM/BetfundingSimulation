var bet = require('./bet.js');

class Developer {

    constructor(initialMoney) {
        this.money = initialMoney;
    }

    step() {
        console.log('Lee posibles proyectos');

        console.log('Decide si apostar a proyectos');

        console.log('Apuesta');
    }

    bet(value,isPositiveBet){
        // bet();
        console.log('Apuesta al proyecto '+value+' al lado de '+isPositiveBet);
    }

}
module.exports = Developer
