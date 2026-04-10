-- PostgreSQL initialization for eTrade Platform
CREATE DATABASE etrade_db;
CREATE USER etrade_user WITH ENCRYPTED PASSWORD 'etrade_password';
GRANT ALL PRIVILEGES ON DATABASE etrade_db TO etrade_user;
\c etrade_db
GRANT ALL ON SCHEMA public TO etrade_user;
