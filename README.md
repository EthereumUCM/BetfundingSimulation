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

### Truffle
```
npm install -g truffle
```

see https://truffle.readthedocs.io/en/latest/getting_started/installation/ for more information.

## Execution
1. Run TestRPC. Open a terminal and execute:
```
testrpc
```
2. Open a new terminal in the same directory as the project and execute:
```
truffle compile
```
```
truffle migrate
```
3. In the same terminal, create a new project:
```
truffle exec createProject.js
```
4. In the same terminal, create a sample bet:
```
truffle exec bet.js
```
