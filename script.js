// Node connection
var web3 = new Web3();
web3.setProvider( new web3.providers.HttpProvider( "http://localhost:8545" ) );

// Account definitions --------

// Oracle account
var oracle = web3.eth.accounts[ 0 ];
web3.eth.defaultAccount = oracle;

// Developers accounts
var developerAccounts = [];

// Invertors accounts
var investorAccounts = [];

// Speculator accounts
var speculatorAccounts = [];

for ( var i = 0 ; i < 333 ; i++ ) {
    developerAccounts[ i ] = web3.eth.accounts[ i ];
    investorAccounts[ i ] = web3.eth.accounts[ i + 333 ];
    speculatorAccounts[ i ] = web3.eth.accounts[ i + 666 ];
}

// Contract definition ---------------

var abi = '[{"constant":false,"inputs":[{"name":"projectId","type":"uint256"}],"name":"updateBalances","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getBets","outputs":[{"name":"numSuccessGamblers","type":"uint256"},{"name":"successBounty","type":"uint256"},{"name":"numFailGamblers","type":"uint256"},{"name":"failBounty","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"projectId","type":"uint256"},{"name":"success","type":"bool"}],"name":"verify","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"desc","type":"string"},{"name":"deadline","type":"uint256"},{"name":"oracle","type":"address"}],"name":"createProject","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numProjects","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"projectId","type":"uint256"},{"name":"success","type":"bool"}],"name":"bet","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"claimProfits","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getProject","outputs":[{"name":"creator","type":"address"},{"name":"deadline","type":"uint256"},{"name":"oracle","type":"address"},{"name":"verified","type":"bool"},{"name":"name","type":"string"},{"name":"desc","type":"string"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"projectId","type":"uint256"},{"indexed":false,"name":"creator","type":"address"}],"name":"NewProject","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"projectId","type":"uint256"},{"indexed":true,"name":"gambler","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"success","type":"bool"}],"name":"Bet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"projectId","type":"uint256"},{"indexed":true,"name":"oracle","type":"address"},{"indexed":false,"name":"result","type":"bool"}],"name":"Result","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"projectId","type":"uint256"}],"name":"Distribution","type":"event"}]';
var Betfunding = web3.eth.contract( JSON.parse( abi ) );
var betfundingInstance = Betfunding.at( $( "#bfaddr" ).val() );

var projects = [];
var epochs = 0;
var pbets = [];
var nbets = [];

function deploy() {
    betfundingInstance = Betfunding.new(
        {
            from: web3.eth.accounts[ 0 ],
            data: "0x6060604052341561000c57fe5b5b6111c88061001c6000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631209073c146100995780631ccf6955146100b957806327e235e3146101025780633e7cb0d31461014c5780634457d5f0146101775780635a067baa1461023c5780639a6d3aaa146102625780639df51b8914610285578063f0f3f2c814610297575bfe5b34156100a157fe5b6100b76004808035906020019091905050610430565b005b34156100c157fe5b6100d76004808035906020019091905050610831565b6040518085815260200184815260200183815260200182815260200194505050505060405180910390f35b341561010a57fe5b610136600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108c5565b6040518082815260200191505060405180910390f35b341561015457fe5b610175600480803590602001909190803515159060200190919050506108dd565b005b341561017f57fe5b61023a600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109e4565b005b341561024457fe5b61024c610b3e565b6040518082815260200191505060405180910390f35b61028360048080359060200190919080351515906020019091905050610b44565b005b341561028d57fe5b610295610dc9565b005b341561029f57fe5b6102b56004808035906020019091905050610e9a565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184151515158152602001806020018060200183810383528581815181526020019150805190602001908083836000831461037c575b80518252602083111561037c57602082019150602081019050602083039250610358565b505050905090810190601f1680156103a85780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383600083146103f0575b8051825260208311156103f0576020820191506020810190506020830392506103cc565b505050905090810190601f16801561041c5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b60006000600060006000600060006000600089600054811015156104545760006000fd5b8a62093a8060016000838152602001908152602001600020600101540142101561047e5760006000fd5b600160008d81526020019081526020016000209a508a600301600401548b600301600101540196508a60020160149054906101000a900460ff16156106a15760648b600301600701540199508a600301600001548a1115610514578a6003016000015499508b7f646281a1f6e9956b914b633483bb33fe8d21acc7c1061352910df7243113cc6b60405180905060405180910390a25b5b898b60030160070154101561069c578a60030160020160008c60030160070154815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1698508a60030160060160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549750600260018c60030160000154018c60030160000154028115156105cc57fe5b049550858b600301600701548c6003016000015403612710028115156105ee57fe5b0494508a60030160010154886127100281151561060757fe5b049350600284860181151561061857fe5b0492506127108b60030160040154840281151561063157fe5b048801600260008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508a60030160070160008154809291906001019190505550610515565b610820565b60648b600301600701540199508a600301600301548a11156106f8578a6003016003015499508b7f646281a1f6e9956b914b633483bb33fe8d21acc7c1061352910df7243113cc6b60405180905060405180910390a25b5b898b60030160070154101561081f578a60030160050160008c60030160070154815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1698508a60030160060160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205497506127108b60030160040154612710898b02028115156107ac57fe5b048115156107b657fe5b04600260008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508a600301600701600081548092919060010191905055506106f9565b5b5b5b505b5050505050505050505050565b6000600060006000846000548110151561084b5760006000fd5b600160008781526020019081526020016000206003016000015494506001600087815260200190815260200160002060030160010154935060016000878152602001908152602001600020600301600301549250600160008781526020019081526020016000206003016004015491505b5b509193509193565b60026020528060005260406000206000915090505481565b81600054811015156108ef5760006000fd5b82600160008281526020019081526020016000206001015442108061092e575062093a8060016000838152602001908152602001600020600101540142115b156109395760006000fd5b833373ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109ab5760006000fd5b836001600087815260200190815260200160002060020160146101000a81548160ff0219169083151502179055505b5b505b505b505050565b60006001600060005481526020019081526020016000209050338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828160010181905550818160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508481600b019080519060200190610aa49291906110e3565b508381600c019080519060200190610abd9291906110e3565b506000547f4cd47a427b12b78ab498fbe3a9ff5dbad600a7c8580d6305a60c9d9cf78d3e3733604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a26000600081548092919060010191905055505b5050505050565b60005481565b60008260006001600083815260200190815260200160002060030160060160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541115610bac5760006000fd5b8360005481101515610bbe5760006000fd5b6000341415610bcd5760006000fd5b846001600082815260200190815260200160002060010154421115610bf25760006000fd5b6001600087815260200190815260200160002060030193508415610c9357338460020160008660000154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503484600101600082825401925050819055508360000160008154809291906001019190505550610d12565b338460050160008660030154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034846004016000828254019250508190555083600301600081548092919060010191905055505b348460060160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff16867fe75d2d08c72f43db2c67834349ea67dbf8e9a54b1aa753ad63e8c31a5bdd9599348860405180838152602001821515151581526020019250505060405180910390a35b5b505b5b505b50505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f193505050501515610e965760006000fd5b5b50565b6000600060006000610eaa611163565b610eb2611163565b8660005481101515610ec45760006000fd5b6001600089815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169650600160008981526020019081526020016000206001015495506001600089815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1694506001600089815260200190815260200160002060020160149054906101000a900460ff16935060016000898152602001908152602001600020600b018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561101f5780601f10610ff45761010080835404028352916020019161101f565b820191906000526020600020905b81548152906001019060200180831161100257829003601f168201915b5050505050925060016000898152602001908152602001600020600c018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110d05780601f106110a5576101008083540402835291602001916110d0565b820191906000526020600020905b8154815290600101906020018083116110b357829003601f168201915b505050505091505b5b5091939550919395565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061112457805160ff1916838001178555611152565b82800160010185558215611152579182015b82811115611151578251825591602001919060010190611136565b5b50905061115f9190611177565b5090565b602060405190810160405280600081525090565b61119991905b8082111561119557600081600090555060010161117d565b5090565b905600a165627a7a723058207310ad3671fe0696a13bc93b65ff1ba5c42b2216d5a2a1c3f6bacbb84195449a0029",
            gas: "4700000"
        }, function( e, contract ) {
            console.log( e, contract );
            if ( typeof contract.address !== "undefined" ) {
                log( "Contract mined! address: " + contract.address + " transactionHash: " + contract.transactionHash );
                setBetfundingAddress( contract.address );
            }
        } );

    /*  Test accounts:
     for ( var i = 0 ; i < 333 ; i++ ) {
     log( "developer[" + i + "]=" + developerAccounts[ i ] );
     log( "investor[" + i + "]=" + investorAccounts[ i ] );
     log( "speculator[" + i + "]=" + speculatorAccounts[ i ] );
     }
     */
}

function createInitialProjects() {
    for ( var i  = 0 ; i < 100; i++ ) {
        var name = "project" + i;
        var difficulty = randnBm();
        var socialImpact = randnBm();
        var desc = "difficulty:" + difficulty + ";social_impact:" + socialImpact;
        var date = 34132894719238471;
        projects[ i ] = {
            name:name,
            difficulty:difficulty,
            socialImpact:socialImpact,
            desc:desc,
            date:date,
            oracle:oracle,
            npbets:0,
            nnbets:0,
            apbets:0,
            anbets:0
        };
        createProject( projects[ i ] );
    }
}

// Events --------
var eProjects = betfundingInstance.NewProject( function( error, result ) {
    if ( !error ) {
        log( "New project created successfully" );
        log( result.args );
    }
} );

var eBets = betfundingInstance.Bet( function( error, result ) {
    if ( !error ) {
        log( "New bet registered" );
        log( result.args );
    }
} );


// Main loop
function run() {
    epochs += 1;
    pbets[ epochs ] = 0;
    nbets[ epochs ] = 0;
    investorBehaviour();
    developerBehaviour();
    speculatorBehaviour();
    oracleBehaviour();
    printChart();
}

function investorBehaviour() {

    for ( var i = 0 ; i < 333 ; i++ ) {
        for ( var j = 0 ; j < projects.length ; j++ ) {
            if ( randnBm() > 0.76 ) {
                try {
                    var amountBet = 1000 * randnBm(); //Calc amount
                    betfundingInstance.bet( j, false, { value: amountBet, from: investorAccounts[ i ], gas: 3000000 } );
                    nbets[ epochs ] += 1;
                    projects[ j ].nnbets += 1;
                    projects[ j ].anbets += amountBet;
                } catch ( err ) {
                }
            }
        }
    }
}

function developerBehaviour() {

    for ( var i = 0 ; i < 333 ; i++ ) {
        for ( var j = 0 ; j < projects.length ; j++ ) {
            if ( randnBm() > 0.83 ) {
                try {
                    var amountBet = 1000 * randnBm(); //Calc amount
                    betfundingInstance.bet( j, true, { value: amountBet, from: developerAccounts[ i ], gas: 3000000 } );
                    pbets[ epochs ] += 1;
                    projects[ j ].npbets += 1;
                    projects[ j ].apbets += amountBet;
                }catch ( err ) {
                }
            }
        }
    }
}

function speculatorBehaviour() {

    for ( var i = 0 ; i < 333 ; i++ ) {
        for ( var j = 0 ; j < projects.length ; j++ ) {
            if ( randnBm() > 0.92 ) {
                var amountBet = 1000 * randnBm(); //Calc amount
                if ( randnBm() > 0.5 ) {
                    try {
                        betfundingInstance.bet( j, true, { value: amountBet, from: speculatorAccounts[ i ], gas: 3000000 } );
                        pbets[ epochs ] += 1;
                        projects[ j ].npbets += 1;
                        projects[ j ].apbets += amountBet;
                    }catch ( err ) {
                    }
                } else {
                    try {
                        betfundingInstance.bet( j, false, { value: amountBet, from: speculatorAccounts[ i ], gas: 3000000 } );
                        nbets[ epochs ] += 1;
                        projects[ j ].nnbets += 1;
                        projects[ j ].anbets += amountBet;
                    }catch ( err ) {
                    }
                }
            }
        }
    }
}

function oracleBehaviour() {

    for ( var i = 0 ; i < projects.length ; i++ ) {
         if ( randnBm() > 0.96 ) {
             betfundingInstance.verify( i, true );
         }
    }
}

// Helper Functions ---------------

function setBetfundingAddress( address ) {
    $( "#bfaddr" ).val( address );
    betfundingInstance = Betfunding.at( $( "#bfaddr" ).val() );
}

function bet( project, projectSuccess, amount, role ) {
    betfundingInstance.bet( project, projectSuccess, { value: amount, from: role, gas: 3000000 } );
    printChart();
}

function createProject( project ) {
    betfundingInstance.createProject( project.name, project.desc, project.date, project.oracle, { gas: 3000000 } );
}

function getNumProjects() {
    for ( var i = 0 ; i < projects.length; i++ ) {
        log( projects[ i ].name );
        log( "difficulty: " + projects[ i ].difficulty );
        log( "social impact: " + projects[ i ].socialImpact );
        log( "Positive bets: " + projects[ i ].npbets );
        log( "Amount of positive bets: " + projects[ i ].apbets );
        log( "-----" );
        log( "Negative bets: " + projects[ i ].nnbets );
        log( "Amount of negative bets: " + projects[ i ].anbets );
        log( "_________" );
    }
    return betfundingInstance.numProjects.call().toNumber();
}

function getProject( i ) {
    log( betfundingInstance.getProject.call( i ) );
}

function getProjectBets( i ) {
    log( betfundingInstance.getBets.call( i ) );
    log( "num + bets: " + betfundingInstance.getBets.call( i )[ 0 ].toNumber() );
    log( "amount +: " + betfundingInstance.getBets.call( i )[ 1 ].toNumber() );
    log( "num - bets: " + betfundingInstance.getBets.call( i )[ 2 ].toNumber() );
    log( "amount -: " + betfundingInstance.getBets.call( i )[ 3 ].toNumber() );
    printChart();
}

function printChart() {
    var pb = projects[ 0 ].npbets;
    var nb = projects[ 0 ].nnbets;
    var ap = projects[ 0 ].apbets;
    var an = projects[ 0 ].anbets;

    for ( var i = 1; i < projects.length ; i++ ) {
        pb += projects[ i ].npbets;
        nb += projects[ i ].nnbets;
        ap += projects[ i ].apbets;
        an += projects[ i ].anbets;
    }

    window.myPie.config.data.datasets[ 0 ].data =  [ nb, pb ];
    window.myPie.config.data.datasets[ 1 ].data =  [ an, ap ];
    window.myPie.update();

    var pbetsplot = [];
    var nbetsplot = [];
    for ( var i = 0 ; i < epochs; i++ ) {
        pbetsplot.push( {
            x: i + 1,
            y:  pbets[ i + 1 ]
        } );
        nbetsplot.push( {
            x: i + 1,
            y:  nbets[ i + 1 ]
        } );
    }
    window.myScatter.config.data.datasets[ 0 ].data = pbetsplot;
    window.myScatter.config.data.datasets[ 1 ].data = nbetsplot;
    window.myScatter.update();
}

// Standard Normal variate using Box-Muller transform.
function randnBm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return (
        ( Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ) ) +
        5.4 ) / 10; // Range 0..1
}

// Log in the text area
function log( s ) {
    $( "#logarea" ).append( s + "\n" );
}
