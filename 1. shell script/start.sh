#!/bin/bash

if [ $# -ne 1 ]; then
	echo "Please input one daemon name"
	echo "usage) start <daemon-name>"
	echo "usable daemon list...  1.nginx 2.mysqld"
	exit 0
fi

for i in `cat ~/bin/dl.txt`
do
	if [[ $1 =~ $i ]]; then
		echo "startng $i"
		systemctl start ${i}
		exit 0
	fi
done 

echo "usable daemon list...  1.nginx 2.mysql"
