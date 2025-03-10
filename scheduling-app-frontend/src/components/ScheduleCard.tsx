import React from "react"
import { ScheduleItem } from "../types/schedule";
import "./ScheduleCard.css"

const ScheduleCard: React.FC<ScheduleItem> = ({id, name, startTime, endTime, weekday}) =>{
    return (
        <div className = "schedule-card">
            <h3> { name } </h3>
            <p>StartTime: {startTime} </p>
            <p>EndTime: {endTime} </p>
            <p> {weekday} </p>
        </div>
    );
}
export default ScheduleCard;