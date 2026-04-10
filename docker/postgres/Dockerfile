FROM postgres:15-alpine
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_DB=etrade_db
ENV POSTGRES_USER=etrade_user
ENV POSTGRES_PASSWORD=etrade_password
