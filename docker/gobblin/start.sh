#!/bin/bash

# save env variables
echo "JAVA_HOME=$JAVA_HOME" >> /etc/environment
echo "GOBBLIN_WORK_DIR=$GOBBLIN_WORK_DIR" >> /etc/environment
echo "GOBBLIN_JOB_CONFIG_DIR=$GOBBLIN_JOB_CONFIG_DIR" >> /etc/environment

# wait until everything else is started
sleep 600

# start gobblin in standalone mode
/gobblin/bin/gobblin-standalone.sh start

# don't exit
tail -f /dev/null
