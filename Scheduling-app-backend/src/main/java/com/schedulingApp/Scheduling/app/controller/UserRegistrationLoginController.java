package com.schedulingApp.Scheduling.app.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schedulingApp.Scheduling.app.DTO.LoginRequest;
import com.schedulingApp.Scheduling.app.DTO.RegisterRequest;
import com.schedulingApp.Scheduling.app.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserRegistrationLoginController {
    @Autowired
    private UserService userService;

    // @PostMapping("/register")
    // public String registerUser(@Valid @RequestBody RegisterRequest request){
    //     return userService.registerUser(request);
    // }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request){
        try {
            userService.registerUser(request);
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong!");
        }
    }

    // @PostMapping("/login")
    // public String loginUser(@Valid @RequestBody LoginRequest request){
    //     return userService.loginUser(request);
    // }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest request){
        try {
            String token = userService.loginUser(request);
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Something went wrong"));
        }
    }
}
