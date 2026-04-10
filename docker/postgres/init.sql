-- Initialize Keycloak database alongside eTrade database
CREATE USER etrade_user WITH PASSWORD 'password';
CREATE DATABASE etrade_db OWNER etrade_user;
GRANT ALL PRIVILEGES ON DATABASE etrade_db TO etrade_user;

CREATE DATABASE keycloak_db OWNER etrade_user;
GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO etrade_user;
