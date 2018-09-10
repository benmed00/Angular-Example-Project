package com.hiddenFounders.repositories;

import com.hiddenFounders.models.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository("accountRepository")
public interface AccountRepository extends CrudRepository<Account,String> {
    public Account findAccountByUsername(String username) ;
}

