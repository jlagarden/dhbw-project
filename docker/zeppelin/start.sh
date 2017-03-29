#!/bin/bash

# start zeppelin
/zeppelin/bin/zeppelin-daemon.sh start

# don't exit
/usr/bin/tail -f /dev/null
