package com.schedulingApp.Scheduling.app.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.schedulingApp.Scheduling.app.models.User;
import com.schedulingApp.Scheduling.app.repo.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    private final UserRepo userRepo;
    public CustomUserDetailsService(UserRepo userRepo){
        this.userRepo = userRepo;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_USER")) // or user.getRoles()
        );
    }
}
