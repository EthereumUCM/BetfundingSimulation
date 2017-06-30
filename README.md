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
Run TestRPC. Open a terminal and execute:
```
testrpc -a 1000
```
Open ```index.html```


## Roadmap

- [x] Create an oracle thar controlls everithing
- [x] Save a contract's snapshot locally
- [x] Initial projects creation
- [ ] Script para crear
- [ ] Projects block limit
- [ ] Tiempo de precalentamiento
    - X turnos para crear proyectos
    - Despues arrancas todo
- [ ] Añadir agentes para crear proyectos
- [x] Normal random numbers generator
- Flujo:
    - [ ] Precalentamiento
    - [x] Cada agente recorrre proyectos
    - [x] Cada agente decide si apuesta o no
    - [ ] Los oraculos deciden si se termina
    - [ ] Actualizan los datos de los proyectos
    - [ ] Captura datos que nos interesen
