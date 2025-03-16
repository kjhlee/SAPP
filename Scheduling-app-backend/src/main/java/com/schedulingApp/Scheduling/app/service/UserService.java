package com.schedulingApp.Scheduling.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.schedulingApp.Scheduling.app.DTO.LoginRequest;
import com.schedulingApp.Scheduling.app.DTO.RegisterRequest;
import com.schedulingApp.Scheduling.app.models.User;
import com.schedulingApp.Scheduling.app.repo.UserRepo;
import com.schedulingApp.Scheduling.app.security.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerUser(RegisterRequest request){ 
        if(userRepo.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("This email already exists");
        }
        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new IllegalArgumentException("Passwords do not match");
        }
        User nUser = new User();
        nUser.setEmail(request.getEmail());
        nUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(nUser);
        return "user registered successfully";
    }

    public String loginUser(LoginRequest request){
        Optional<User> userOpt = userRepo.findByEmail(request.getEmail());
        if(userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())){
            throw new IllegalArgumentException("Invalid email or password");
        }
        return jwtUtil.generateToken(request.getEmail());
    }
}
