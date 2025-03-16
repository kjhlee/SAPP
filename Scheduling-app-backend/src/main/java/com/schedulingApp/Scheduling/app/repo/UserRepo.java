package com.schedulingApp.Scheduling.app.repo;

import java.lang.classfile.ClassFile.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schedulingApp.Scheduling.app.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
