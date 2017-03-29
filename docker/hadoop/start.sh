#!/bin/bash

# save env variable to make it available after relogin
echo "JAVA_HOME=$JAVA_HOME" >> /etc/environment

# create ssh keys
ssh-keygen -q -t rsa -N '' -f /root/.ssh/id_rsa

# make login using keys work
cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys

# make ssh be less strict about keys and fingerprints
echo "Host * " >> /root/.ssh/config
echo "  StrictHostKeyChecking no" >> /root/.ssh/config

# start sshd
mkdir /var/run/sshd
/usr/sbin/sshd &
sleep 1

# format hdfs
/hadoop/bin/hdfs namenode -format

# start hdfs
/hadoop/sbin/start-dfs.sh &

# don't exit
/usr/bin/tail -f /dev/null
