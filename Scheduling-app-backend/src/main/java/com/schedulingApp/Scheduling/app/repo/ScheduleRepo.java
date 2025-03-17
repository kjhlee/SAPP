package com.schedulingApp.Scheduling.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schedulingApp.Scheduling.app.models.Schedule;
import com.schedulingApp.Scheduling.app.models.User;

@Repository
public interface ScheduleRepo extends JpaRepository<Schedule, Long>{
    List<Schedule> findByUser(User user);
}
