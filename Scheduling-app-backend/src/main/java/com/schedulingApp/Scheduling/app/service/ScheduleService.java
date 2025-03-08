package com.schedulingApp.Scheduling.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.schedulingApp.Scheduling.app.models.Schedule;
import com.schedulingApp.Scheduling.app.models.ScheduleItem;
import com.schedulingApp.Scheduling.app.repo.ScheduleRepo;

@Service
public class ScheduleService {
    private final ScheduleRepo scheduleRepo;

    public ScheduleService(ScheduleRepo scheduleRepo){
        this.scheduleRepo = scheduleRepo;
    }

    public Schedule addSchedule(Schedule schedule){
        return scheduleRepo.save(schedule);
    }

    public Optional<Schedule> getScheduleById(Long id){
        Optional<Schedule> newSchedule = scheduleRepo.findById(id);
        return newSchedule;
    }

    public List<Schedule> getSchedule(){
        return scheduleRepo.findAll();
    }
    public Schedule updateSchedule(Schedule schedule){
        return scheduleRepo.save(schedule);
    }

    public void deleteSchedule(Long id){
        scheduleRepo.deleteById(id);
    }

    public ScheduleItem addScheduleItem(Long id, ScheduleItem item) {
        Schedule currSchedule = scheduleRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Schedule Not Found"));
    
        currSchedule.addScheduleItem(item);
    
        scheduleRepo.save(currSchedule);
    
        return item;
    }
    

    public void deleteScheduleItem(Long scheduleId, Long itemId) {
        Schedule currSchedule = scheduleRepo.findById(scheduleId)
            .orElseThrow(() -> new RuntimeException("Schedule Not Found"));
    
        boolean removed = currSchedule.getScheduleItems().removeIf(item -> item.getId().equals(itemId));
    
        if (!removed) {
            throw new RuntimeException("Schedule Item Not Found");
        }
    
        scheduleRepo.save(currSchedule);
    }
    

}

