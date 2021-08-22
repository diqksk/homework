#!/bin/bash

if [ $# -ne 1 ]; then
	echo "Please input one daemon name"
	echo "usage) stop <daemon-name>"
	exit 0
fi

if [ -z `grep -r ${1} ~/bin/dl.txt` ]; then
	echo "you can only input in this list"
	cat ~/bin/dl.txt
	exit 0
fi

getDaemon(){
	str="${1}"
	echo `systemctl list-units --type=service --state=running | grep "${str}" | awk '{print $1}'`
}

daemon=$(getDaemon ${1})

if [ -n "$daemon" ]; then
	echo "restarting $daemon"
	systemctl restart $daemon
	exit 0
fi 

echo "${1} is not running"
