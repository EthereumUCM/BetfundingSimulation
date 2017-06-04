class Developer {

    constructor(initialMoney) {
        this.money = initialMoney;
    }

    step() {
        console.log('Lee posibles proyectos');

        console.log('Decide si apostar a proyectos');

        console.log('Apuesta');
    }

    step() {
        console.log('Lee posibles proyectos');

        console.log('Decide si apostar');

        console.log('Apuesta');
    }

    bet(value,isPositiveBet){
        console.log('Apuesta al proyecto '+value+' al lado de '+isPositiveBet);
    }

}
module.exports = Developer