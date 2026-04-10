package com.portnet.etrade.auth.service;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    public Map<String, Object> getUserInfo(Jwt jwt) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("sub", jwt.getSubject());
        userInfo.put("email", jwt.getClaimAsString("email"));
        userInfo.put("name", jwt.getClaimAsString("name"));
        userInfo.put("preferred_username", jwt.getClaimAsString("preferred_username"));
        userInfo.put("roles", jwt.getClaimAsStringList("roles"));
        return userInfo;
    }
}
