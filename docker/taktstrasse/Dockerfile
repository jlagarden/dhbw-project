FROM ubuntu:16.04

# install java
RUN apt-get update
RUN apt-get install -y openjdk-8-jre
RUN apt-get install -y zip

# add entrypoint script
COPY start.sh /
RUN chmod u+x /start.sh

# app hinzufügen
ADD https://gitlab.jos-it.de/jan.lagarden/dhbw-projekt-app/builds/artifacts/master/download?job=build /artifacts.zip
RUN unzip /artifacts.zip

# taktstrasse
COPY TaktstrasseOpcServer-0.0.1-SNAPSHOT.jar /

ENTRYPOINT /start.sh
