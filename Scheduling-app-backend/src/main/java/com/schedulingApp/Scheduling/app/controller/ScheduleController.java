package com.schedulingApp.Scheduling.app.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schedulingApp.Scheduling.app.models.Schedule;
import com.schedulingApp.Scheduling.app.models.ScheduleItem;
import com.schedulingApp.Scheduling.app.models.User;
import com.schedulingApp.Scheduling.app.repo.ScheduleRepo;
import com.schedulingApp.Scheduling.app.repo.UserRepo;
import com.schedulingApp.Scheduling.app.security.JwtUtil;
import com.schedulingApp.Scheduling.app.service.ScheduleService;

@RestController
@RequestMapping("schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    private ScheduleRepo scheduleRepo;

    @Autowired
    public ScheduleController(ScheduleService scheduleService){
        this.scheduleService = scheduleService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Schedule API is working!");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Schedule>> getAllSchedules(){
        List<Schedule> allSchedules = scheduleService.getSchedule();
        return new ResponseEntity<List<Schedule>>(allSchedules, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id){
        return scheduleService.getScheduleById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build()); 
    }


    @PutMapping("/update")
    public ResponseEntity<Schedule> updateSchedule(@RequestBody Schedule schedule){
        Schedule updatedSchedule = scheduleService.updateSchedule(schedule);
        return new ResponseEntity<>(updatedSchedule, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Schedule> deleteSchedule(@PathVariable Long id){
        scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // @PostMapping("/add")
    // public ResponseEntity<Schedule> addSchedule(@RequestBody Schedule schedule){
    //     Schedule newSchedule = scheduleService.addSchedule(schedule);
    //     return new ResponseEntity<>(newSchedule, HttpStatus.CREATED);
    // }

    @PostMapping("/{scheduleId}/items")
    public ResponseEntity<ScheduleItem> addScheduleItem(
        @PathVariable Long scheduleId,
        @RequestBody ScheduleItem item) {
        ScheduleItem createdItem = scheduleService.addScheduleItem(scheduleId, item);

        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }

    @DeleteMapping("/{scheduleId}/items/{itemId}")
    public ResponseEntity<Void> deleteScheduleItem(
        @PathVariable Long scheduleId,
        @PathVariable Long itemId) {
        scheduleService.deleteScheduleItem(scheduleId, itemId);
        return ResponseEntity.noContent().build(); // returns HTTP 204 No Content
    }

    // @GetMapping("/my")
    // public ResponseEntity<List<Schedule>> getMySchedules(@AuthenticationPrincipal User user){
    //     List<Schedule> schedules = scheduleRepo.findByUser(user);
    //     return ResponseEntity.ok(schedules);
    // }

    @PostMapping("/myadd")
    public ResponseEntity<Schedule> createSchedule(@AuthenticationPrincipal User user, @RequestBody Schedule schedule){
        schedule.setUser(user);
        Schedule savedSchedule = scheduleRepo.save(schedule);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedSchedule);
    }

    //TODO create a method to allow updating a schedule item

}
