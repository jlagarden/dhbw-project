FROM ubuntu:16.04

# install java
RUN apt-get update
RUN apt-get install -y openjdk-8-jre

# add entrypoint script
COPY start.sh /
RUN chmod u+x /start.sh

# install zeppelin
COPY zeppelin /zeppelin
COPY interpreter.json /zeppelin/conf/interpreter.json

# Expose webui and master port
EXPOSE 8080

# save notebooks
VOLUME /zeppelin/notebooks

ENTRYPOINT /start.sh
