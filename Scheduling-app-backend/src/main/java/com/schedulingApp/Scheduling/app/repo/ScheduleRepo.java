package com.schedulingApp.Scheduling.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schedulingApp.Scheduling.app.models.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule, Long>{

}
