package com.hiddenFounders.services;

import com.hiddenFounders.exceptions.InvalidAccountExcption;
import com.hiddenFounders.models.Account;
import com.hiddenFounders.models.holders.CredentialsHolder;
import org.springframework.security.authentication.BadCredentialsException;

public interface AuthenticationService {

    public String authenticate(CredentialsHolder credentials) throws BadCredentialsException;

    public Account getCurrentAccount();

    public Account saveAccount(Account account) throws InvalidAccountExcption;
}
