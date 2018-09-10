package com.hiddenFounders.models.holders;

public class CredentialsHolder {
    public String username;
    public String password ;
    @Override
    public String toString() {
        return "Credentials{" + "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
