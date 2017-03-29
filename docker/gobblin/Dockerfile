FROM ubuntu:16.04

# install java
RUN apt-get update
RUN apt-get install -y openjdk-8-jre
RUN apt-get install -y zip

# add entrypoint script
COPY start.sh /
RUN chmod u+x /start.sh

# install gobblin
#ADD https://github.com/linkedin/gobblin/releases/download/gobblin_0.8.0/gobblin-distribution-0.8.0.tar.gz /gobblin.tgz
#RUN tar -xzf /gobblin.tgz && mv /gobblin-dist /gobblin
COPY gobblin-distribution-0.8.0.tar /gobblin.tar
RUN  tar -xf /gobblin.tar && mv /gobblin-dist /gobblin
COPY gobblin-jobs /etc/gobblin-jobs

# add our source and extractor
ADD https://gitlab.jos-it.de/jan.lagarden/dhbw-projekt-gobblin/builds/artifacts/master/download?job=build /artifacts.zip
RUN unzip /artifacts.zip
RUN mv /gobblin-1.jar /gobblin/lib/

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre
ENV GOBBLIN_WORK_DIR /tmp
ENV GOBBLIN_JOB_CONFIG_DIR /etc/gobblin-jobs

ENTRYPOINT /start.sh
