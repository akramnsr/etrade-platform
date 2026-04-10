FROM quay.io/keycloak/keycloak:23.0.0
COPY realm-etrade.json /opt/keycloak/data/import/realm-etrade.json
ENV KEYCLOAK_IMPORT=/opt/keycloak/data/import/realm-etrade.json
EXPOSE 8080
