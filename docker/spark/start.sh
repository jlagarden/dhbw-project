#!/bin/bash

# start spark
/spark/sbin/start-master.sh
sleep 5
/spark/sbin/start-slave.sh spark://0.0.0.0:7077

sleep 180
/spark/bin/spark-submit --class com.project.sparkstreaming.App --master local[1] /sparkstreaming-1-jar-with-dependencies.jar
# set spark memory
# cp /spark/conf/spark-defaults.conf.template /spark/conf/spark-defaults.conf
# echo "spark.driver.memory              5g" >> /spark/conf/spark-defaults.conf

# don't exit
/usr/bin/tail -f /dev/null
