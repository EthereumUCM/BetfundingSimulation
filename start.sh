#!/usr/bin/env bash

# Function to show help
function show_help () {
    echo -e "Usage:  \e[1m./start.sh \e[33m[OPTIONS]\e[0m"
    echo ""
    echo -e "Starts \e[1mtestrpc\e[0m and creates a betfunding contract with truffle"
    echo ""
    echo "Possible arguments:"
    echo ""
    echo -e "  \e[1m-v\e[0m      be verbose"
    echo -e "  \e[1m-s\e[0m      starts the server and creates a Betfunding instance"
    echo -e "  \e[1m-k\e[0m      kills the server"
    echo -e "  \e[1m-i\e[0m      print server info"
    echo ""
}
# Function to set the PID of testrpc process
function set_pid () {
    echo "TESTRPCPID=$1" > env.vars
    TESTRPCPID=$1
}

function print_server_ifo () {
if [ $TESTRPCPID = 0 ]
then
echo "Server is not running, use -s option to start the server"
else
echo "Server running with PID=$TESTRPCPID"
fi
}


OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
output_file=""
verbose=0
exec=0
TESTRPCPID=$(cat ./env.vars | grep TESTRPCPID | sed 's/TESTRPCPID\=//g')

if [ -z "$TESTRPCPID" ]
then
    set_pid 0
fi

while getopts "h?viskf:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    v)
        verbose=1
        ;;
    i)
        print_server_ifo
        exit 0
        ;;
    s)
        exec=1
        ;;
    k)
        exec=2
        ;;
    f)
        output_file=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

#echo "verbose=$verbose, output_file='$output_file', Leftovers: $@"

case "$exec" in
    1)
        if [ $TESTRPCPID = 0 ]
        then
            testrpc &
            pid="$!"
            set_pid "$pid"
            echo "Starting testrpc server with pid=$pid"
            truffle compile
            truffle migrate
            truffle exec ./createProject.js
        else
            echo "Already running..."
        fi
        exit 0
        ;;
    2)
        if [ $TESTRPCPID != 0 ]
        then
            echo "Ending testrpcserver"
            kill $TESTRPCPID
            set_pid 0
        else
            echo "No server detected"
        fi
        exit 0
        ;;
    9)
        testrpc &
        echo "$!"
        ;;

esac

case "$@" in

    "")
        show_help
        ;;

    *)
        exit 0
        ;;
esac