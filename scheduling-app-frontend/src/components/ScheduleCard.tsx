import React, { JSX } from "react";

import './ScheduleCard.css'
import { useNavigate } from "react-router-dom";



interface ScheduleCardProps{
    id: number;
    onDelete: (id: number) => void;
}
const ScheduleCard: React.FC<ScheduleCardProps> =({ id, onDelete }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/schedules/${id}`)
    }
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
    };
    return(
        <div className = "rectangle-schedule" onClick = {handleClick} style = {{cursor: "pointer"}}>
            <h1>Schedule { id }</h1>
            
            <button onClick={handleDelete} className = "delete-button">
                x
            </button>
        </div>
    );
}

export default ScheduleCard;