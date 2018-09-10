package com.hiddenFounders.services;

import com.hiddenFounders.repositories.AccountRepository;
import com.hiddenFounders.models.Account;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.HashSet;


@Repository("mongoUserDetailsService")
public class MongoUserDetailsService  implements UserDetailsService{

    private AccountRepository accountRepository ;

    public MongoUserDetailsService(AccountRepository accountRepository ) {
        this.accountRepository = accountRepository ;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Account account = accountRepository.findAccountByUsername(s);
        UserDetails userDetails = new User(account.getUsername(),account.getPassword(),new HashSet<>()) ;
        return userDetails;
    }
}

