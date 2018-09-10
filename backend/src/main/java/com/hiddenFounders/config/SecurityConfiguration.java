
package com.hiddenFounders.config;

import com.hiddenFounders.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    public final static String AUTHORIZATION_HEADER = "Authorization";

    @Autowired
    UserDetailsService mongoUserDetailsService ;

    @Autowired
    JwtFilter jwtFilter ;

    @Autowired
    CorsFilter corsFilter ;

    @Override
    protected void configure(HttpSecurity security) throws Exception {
        System.out.println("this is the value of jwt filter --- "+jwtFilter);
        security
                //Disabling csrf
                .csrf().disable()

                .authorizeRequests()
                //We permit all requests to the server
                .antMatchers("/").permitAll()

                .antMatchers("/login").permitAll()

                .antMatchers("/register").permitAll()

                .anyRequest().authenticated().and()

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .addFilterBefore(corsFilter, CorsFilter.class)

                .headers().cacheControl() ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceBean()).passwordEncoder(passwordEncoder());
    }

    @Override
    public UserDetailsService userDetailsServiceBean() throws Exception {
        return mongoUserDetailsService;
    }

    @Override
    protected @Bean AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    public @Bean PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder() ;
    }


}