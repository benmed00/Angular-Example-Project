package com.hiddenFounders.services;

import com.hiddenFounders.repositories.AccountRepository;
import com.hiddenFounders.exceptions.InvalidAccountExcption;
import com.hiddenFounders.jwt.TokenProvider;
import com.hiddenFounders.models.Account;
import com.hiddenFounders.models.holders.CredentialsHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository("authenticationService")
public class AuthenticationServiceImpl implements AuthenticationService {

    private AuthenticationManager authenticationManager ;

    private TokenProvider tokenProvider;

    private AccountRepository accountRepository ;

    private PasswordEncoder passwordEncoder ;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager, TokenProvider tokenProvider,
                                     AccountRepository accountRepository, PasswordEncoder passwordEncoder ){
        this.authenticationManager = authenticationManager ;
        this.tokenProvider = tokenProvider ;
        this.accountRepository = accountRepository ;
        this.passwordEncoder = passwordEncoder ;
    }

    @Override
    public String authenticate(CredentialsHolder credentials) throws BadCredentialsException {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                credentials.username,
                credentials.password
        );

        if (!authenticationManager
                .authenticate(authentication)
                .isAuthenticated())
            throw new BadCredentialsException("Wrong username or password") ;

        return "Bearer ".concat(tokenProvider.createToken(authentication));
    }

    @Override
    public Account getCurrentAccount() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName() ;
        return username == null ? null : accountRepository.findAccountByUsername(username) ;
    }

    @Override
    public Account saveAccount(Account account) throws InvalidAccountExcption {
        if (! Account.isValidAccount(account))
            throw new InvalidAccountExcption("Please set a valid account bean") ;

        if (accountRepository.findAccountByUsername(account.getUsername()) != null)
            throw new InvalidAccountExcption("Account username duplication error") ;
        account.setEnabled(true);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        return accountRepository.save(account) ;
    }


}
