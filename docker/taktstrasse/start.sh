#!/bin/bash

sleep 30
java -jar /TaktstrasseOpcServer-0.0.1-SNAPSHOT.jar -amqp tcp://activemq:61616 -kafka kafka:9092 -d 1 -o /tmp -topic prod --fastforward &
sleep 10
java -jar /project-app-1.0-SNAPSHOT-jar-with-dependencies.jar 
# don't exit 
/usr/bin/tail -f /dev/null
