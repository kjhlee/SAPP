package com.schedulingApp.Scheduling.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schedulingApp.Scheduling.app.DTO.LoginRequest;
import com.schedulingApp.Scheduling.app.DTO.RegisterRequest;
import com.schedulingApp.Scheduling.app.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserRegistrationLoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@Valid @RequestBody RegisterRequest request){
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public String loginUser(@Valid @RequestBody LoginRequest request){
        return userService.loginUser(request);
    }
}
