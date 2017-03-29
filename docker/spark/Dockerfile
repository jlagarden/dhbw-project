FROM ubuntu:16.04

# install java
RUN apt-get update
RUN apt-get install -y openjdk-8-jre
RUN apt-get install -y zip

# add entrypoint script
COPY start.sh /
RUN chmod u+x /start.sh

# install spark
ADD http://d3kbcqa49mib13.cloudfront.net/spark-2.0.0-bin-hadoop2.7.tgz /spark.tgz
RUN tar -xzf /spark.tgz && mv /spark-2.0.0-bin-hadoop2.7 /spark

# download spark-streaming-app
ADD https://gitlab.jos-it.de/jan.lagarden/dhbw-projekt-app/builds/artifacts/master/download?job=build /artifacts.zip
RUN unzip /artifacts.zip

# Expose spark webui and master port
EXPOSE 8080
EXPOSE 7077

ENTRYPOINT /start.sh
