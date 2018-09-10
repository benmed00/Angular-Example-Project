package com.hiddenFounders.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Document(collection = "users")
public class Account {

    @Id
    private String id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String email;

    private boolean enabled;

    private List<String> likedShops ;

    public Account() {
    }

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled=true;
    }

    public Account(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getLikedShops() {
        return likedShops;
    }

    public void setLikedShops(List<String> likedShops) {
        this.likedShops = likedShops;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", enabled=" + enabled +
                '}';
    }

    public static boolean isValidAccount(Account account){
        if (account == null)
            return false ;
        account.setUsername(account.getUsername()==null?"":account.getUsername());
        account.setPassword(account.getPassword()==null?"":account.getPassword());
        if (account.getUsername().length()<3 || account.getUsername().length()< 3  )
            return false;
        return true;
    }
}

