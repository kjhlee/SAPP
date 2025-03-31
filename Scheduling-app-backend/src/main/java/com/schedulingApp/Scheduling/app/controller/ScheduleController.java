package com.schedulingApp.Scheduling.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.schedulingApp.Scheduling.app.models.Schedule;
import com.schedulingApp.Scheduling.app.models.ScheduleItem;
import com.schedulingApp.Scheduling.app.models.User;

import com.schedulingApp.Scheduling.app.security.JwtUtil;
import com.schedulingApp.Scheduling.app.service.ScheduleService;
import com.schedulingApp.Scheduling.app.service.UserService;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService){
        this.scheduleService = scheduleService;
    }
    
    private User getUserFromToken(String token){
        if(token == null || !token.startsWith("Bearer ")){
            throw new IllegalArgumentException("Missing valid Authorization Header");
        }
        String jwt = token.substring(7);
        String email = jwtUtil.extractEmail(jwt);
        return userService.findUser(email);
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
    public ResponseEntity<?> getScheduleById(
        @PathVariable Long id,
        @RequestHeader("Authorization") String token
        ){
        User user = getUserFromToken(token);

        return scheduleService.getScheduleById(id)
            .map(schedule -> {
                if(!schedule.getUser().getId().equals(user.getId())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
                }
                return ResponseEntity.ok(schedule);
            })
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

    @PostMapping("/{scheduleId}/items") // probably change this to /{user_id}/{schedule_id}/addItem
    public ResponseEntity<?> addScheduleItem(
        @RequestHeader("Authorization") String token,
        @PathVariable Long scheduleId,
        @RequestBody ScheduleItem item) {
        
        User user = getUserFromToken(token);
        Schedule schedule = scheduleService.getScheduleById(scheduleId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule Not found"));

        if(!schedule.getUser().getId().equals(user.getId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot modify someone else's schedule");
        }
        ScheduleItem createdItem = scheduleService.addScheduleItem(scheduleId, item);

        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }
    @DeleteMapping("/{scheduleId}/items/{itemId}") // change to /{user_id}/deleteItem/{itemId}
    public ResponseEntity<Void> deleteScheduleItem(
        @PathVariable Long scheduleId,
        @PathVariable Long itemId) {
        scheduleService.deleteScheduleItem(scheduleId, itemId);
        return ResponseEntity.noContent().build(); // returns HTTP 204 No Content
    }

    @GetMapping("/my") // /{user_id}
    public ResponseEntity<List<Schedule>> getMySchedules(@RequestHeader("Authorization") String token){
        User user = getUserFromToken(token);
        List<Schedule> schedules = scheduleService.getSchedulesbyUser(user);
        return ResponseEntity.ok(schedules);
    
    }

    @PostMapping("/myadd") // /{user_id}/add
    public ResponseEntity<Schedule> createSchedule(@RequestHeader("Authorization") String token, @RequestBody Schedule schedule){
        User user = getUserFromToken(token);
        schedule.setUser(user);
        Schedule savedSchedule = scheduleService.addSchedule(schedule);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedSchedule);

    }

    //TODO create a method to allow updating a schedule item

}
