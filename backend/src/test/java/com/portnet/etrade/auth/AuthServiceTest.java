package com.portnet.etrade.auth;

import com.portnet.etrade.auth.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private Jwt jwt;

    @Test
    void getUserInfo_shouldReturnUserInfoMap() {
        // Given
        when(jwt.getSubject()).thenReturn("user-123");
        when(jwt.getClaimAsString("email")).thenReturn("test@example.com");
        when(jwt.getClaimAsString("name")).thenReturn("Test User");
        when(jwt.getClaimAsString("preferred_username")).thenReturn("testuser");

        // When
        Map<String, Object> userInfo = authService.getUserInfo(jwt);

        // Then
        assertThat(userInfo).isNotNull();
        assertThat(userInfo.get("sub")).isEqualTo("user-123");
        assertThat(userInfo.get("email")).isEqualTo("test@example.com");
        assertThat(userInfo.get("name")).isEqualTo("Test User");
        assertThat(userInfo.get("preferred_username")).isEqualTo("testuser");
    }
}
