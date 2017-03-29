FROM ubuntu:16.04

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN DEBIAN_FRONTEND=noninteractive apt-get update \
	&& DEBIAN_FRONTEND=noninteractive apt-get -y -q install python-software-properties software-properties-common \
  && DEBIAN_FRONTEND=noninteractive apt-get -y -q install postgresql-9.6 postgresql-client-9.6 postgresql-contrib-9.6

USER postgres

RUN /etc/init.d/postgresql start \
    && psql --command "CREATE USER super WITH SUPERUSER PASSWORD 'super';" \
    && createdb -O super db

USER root
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.6/main/pg_hba.conf
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.6/main/postgresql.conf

EXPOSE 5432

RUN mkdir -p /var/run/postgresql && chown -R postgres /var/run/postgresql

USER postgres

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/9.6/bin/postgres", "-D", "/var/lib/postgresql/9.6/main", "-c", "config_file=/etc/postgresql/9.6/main/postgresql.conf"]
