# Betfunding Simulation
Repository to test the behavior of the Betfunding platform with agents via testrpc

## Installation

### TestRPC
First you need to download testrpc from (https://github.com/ethereumjs/testrpc).


> `testrpc` is written in Javascript and distributed as a Node package via `npm`. Make sure you have Node.js (>= v6.9.1) installed, and your environment is capable of installing and compiling `npm` modules.


Linux installation:

 ```
 npm install -g ethereumjs-testrpc
```

Windows installation:

```
For more information about installing on windows, visit:
https://github.com/ethereumjs/testrpc/wiki/Installing-TestRPC-on-Windows
```

macOS installation:
>macOS Make sure you have the XCode Command Line Tools installed. These are needed in general to be able to compile most C based languages on your machine, as well as many npm modules.

## Execution
1. Run TestRPC. Open a terminal and execute:
```
testrpc
```
2. Open the file index.html in the browser and the command console with F12:
3. In the browser console, execute the following function to deploy the contract:
```
deploy()
```
4. Create a sample project:
```
createSampleProject()
```
5. Bet on that project with random values:
```
randomBet(0)
```
6. Check the status of the project:
```
getProjectBets(0)
```



## Cosas pentiendes

- Oraculo que controle todo
- Carga los contratos en memoria
- Simulacion con proyectos inicales
- Script para crear 
- Tiempo límite con turnos o nº de bloques o variables
- Tiempo de precalentamiento
    - X turnos para crear proyectos
    - Despues arrancas todo
- Añadir agentes para crear proyectos
- Ver funciones de aleatoriedad
    - Ver que no sea uniforme, lo ideal es normal.
- Flujo:
    - Precalentamiento
    - Cada agente recorrre proyectos
    - Cada agente decide si apuesta o no
    - Los oraculos deciden si se termina
    - Actualizan los datos de los proyectos
    - Captura datos que nos interesen