package com.schedulingApp.Scheduling.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.schedulingApp.Scheduling.app.enums.Weekday;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class ScheduleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String startTime;
    private String endTime;

    @Enumerated(EnumType.STRING) // Store as a string in the database
    private Weekday weekday;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    @ToString.Exclude
    @JsonBackReference 
    private Schedule schedule;

    public ScheduleItem(String name, String startTime, String endTime, Weekday weekday){
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.weekday = weekday;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }


}
