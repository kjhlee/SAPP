package com.schedulingApp.Scheduling.app.enums;

public enum Weekday {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;

    public static Weekday fromString(String value){
        return Weekday.valueOf(value.toUpperCase());
    }
}
