import React from "react";
import { Schedule } from "../types/schedule";
import './ScheduleCard.css'
import { useNavigate } from "react-router-dom";

interface ScheduleCardProps{
    id: number;
}
const ScheduleCard: React.FC<ScheduleCardProps> =({ id }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/schedules/${id}`)
    }
    return(
        <div className = "rectangle-schedule" onClick = {handleClick} style = {{cursor: "pointer"}}>
            <h1>Schedule { id }</h1>
        </div>
    );
}

export default ScheduleCard;