import React from "react"
import { ScheduleItem } from "../types/schedule";
import "./ScheduleCard.css"

interface ScheduleCardProps extends ScheduleItem{
    onDelete: (id: number) => void;
}
const ScheduleCard: React.FC<ScheduleCardProps> = ({id, name, startTime, endTime, weekday, onDelete}) =>{

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className = "schedule-card">
            <h3> { name } </h3>
            <p>{startTime} - {endTime}</p>
            <button className = "button" onClick = {handleDelete}> x </button>
        </div>
    );
}
export default ScheduleCard;