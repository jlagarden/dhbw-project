FROM ubuntu:16.04

# install java
RUN apt-get update
RUN apt-get install -y ssh
RUN apt-get install -y rsync
RUN apt-get install -y openjdk-8-jre

# add entrypoint script
COPY start.sh /
RUN chmod u+x /start.sh

# install hadoop
ADD http://apache.mirror.iphh.net/hadoop/common/hadoop-2.7.3/hadoop-2.7.3.tar.gz /hadoop.tgz
RUN tar -xzf /hadoop.tgz && mv /hadoop-2.7.3 /hadoop

# copy config files
COPY core-site.xml /hadoop/etc/hadoop/core-site.xml
COPY hdfs-site.xml /hadoop/etc/hadoop/hdfs-site.xml

# Expose hadoop ports
EXPOSE 50070
EXPOSE 50075
EXPOSE 50090
EXPOSE 50105
EXPOSE 50030
EXPOSE 50060

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre

ENTRYPOINT /start.sh
