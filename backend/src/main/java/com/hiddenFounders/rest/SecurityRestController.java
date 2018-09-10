package com.hiddenFounders.rest;

import com.hiddenFounders.exceptions.InvalidAccountExcption;
import com.hiddenFounders.models.Account;
import com.hiddenFounders.models.holders.CredentialsHolder;
import com.hiddenFounders.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
public class SecurityRestController {

    @Autowired
    AuthenticationService authenticationService ;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsHolder credentials){
        String token = null ;
        try {
            token= authenticationService.authenticate(credentials) ;
        }catch (BadCredentialsException exp){
            return ResponseEntity.status(401).build();
        }
        Map<String,String> map = new HashMap<>() ;
        map.put("token", token) ;
        return ResponseEntity.ok().header("token", token).body(map) ;
    }

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody Account account){
        Account newAccount = null ;
        try {
            newAccount = authenticationService.saveAccount(account) ;
        } catch (InvalidAccountExcption exp) {
            exp.printStackTrace();
            return ResponseEntity.badRequest().body(exp.getMessage());
        }
        return ResponseEntity.ok().body(newAccount);
    }

    @GetMapping("/checktoken")
    public ResponseEntity<?> checkToken(){
        return ResponseEntity.ok().build() ;
    }

    @GetMapping("/user_details")
    public ResponseEntity<?> userDetails() {
        Account account = authenticationService.getCurrentAccount();
        account.setPassword(null);
        return ResponseEntity.ok(authenticationService.getCurrentAccount());
    }
}
