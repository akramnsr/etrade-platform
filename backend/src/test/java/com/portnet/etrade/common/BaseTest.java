package com.portnet.etrade.common;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
    "spring.datasource.driver-class-name=com.h2database.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.flyway.enabled=false",
    "spring.security.oauth2.resourceserver.jwt.issuer-uri=",
    "spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:8180/realms/etrade/protocol/openid-connect/certs"
})
public abstract class BaseTest {
}
