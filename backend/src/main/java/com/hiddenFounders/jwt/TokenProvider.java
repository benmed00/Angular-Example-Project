package com.hiddenFounders.jwt;


import org.springframework.security.core.Authentication;

public interface TokenProvider {

    public String createToken(Authentication authentication);

    public Authentication getAuthentication(String token) ;

    public boolean validateToken(String authToken) ;


}
