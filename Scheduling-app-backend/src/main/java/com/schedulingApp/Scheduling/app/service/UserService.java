package com.schedulingApp.Scheduling.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schedulingApp.Scheduling.app.DTO.RegisterRequest;
import com.schedulingApp.Scheduling.app.models.User;
import com.schedulingApp.Scheduling.app.repo.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public String registerUser(RegisterRequest request){ //TODO to the register request DTO
        if(userRepo.existsByEmail(request.getEmail())){
            return "This email already exists";
        }
        User nUser = new User();
        nUser.setEmail(request.getEmail());
        nUser.setPassword(request.getPassword());

        userRepo.save(nUser);
        return "user registered successfully";
    }
}
