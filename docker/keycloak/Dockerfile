FROM quay.io/keycloak/keycloak:23.0
COPY realm-etrade.json /opt/keycloak/data/import/
ENV KC_DB=postgres
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--import-realm"]
