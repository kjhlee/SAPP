import React, { useState } from "react";
import "./AddScheduleItem.css"

const BASE_URL = process.env.REACT_APP_API_URL;

interface AddScheduleItemProps {
    scheduleId: number;
    onClose: () => void;
    onItemAdded: () => void;
}
const AddScheduleItem: React.FC<AddScheduleItemProps> = ({
    scheduleId,
    onClose,
    onItemAdded,
}) => {
    const[name, setName] = useState("");
    const[startTime, setStartTime] = useState("");
    const[endTime, setEndTime] = useState("");
    const[weekday, setWeekday] = useState("MONDAY");

    const token = localStorage.getItem("token");

    const handleSubmit = async (e: React.FormEvent) => {
        console.log({scheduleId})
        e.preventDefault();
        
        const newItem = {name, startTime, endTime, weekday };

        try {
            const response = await fetch(
                `${BASE_URL}/schedules/${scheduleId}/items`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(newItem)
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add schedule item");
            }
            onItemAdded();
            onClose();
        } catch (error){
            console.log("Error adding schedule item: ", error);
        }
    };

    return(
        <div className = "modal">
            <div className = "modal-content">
                <h3>Add Schedule Shift</h3>
                <form onSubmit = {handleSubmit}>
                    <input
                    type = "text"
                    placeholder = "Name"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    required
                    />

                    <input 
                    type = "text"
                    placeholder = "start time: 10:30"
                    value = {startTime}
                    onChange = {(e) => setStartTime(e.target.value)}
                    required
                    />

                    <input
                    type = "text"
                    placeholder = "end time: 5:00"
                    value = {endTime}
                    onChange = {(e) => setEndTime(e.target.value)}
                    required
                    />

                    <select value = {weekday} onChange = {(e) => setWeekday(e.target.value)}>
                        <option value = "MONDAY">Monday</option>
                        <option value = "TUESDAY">Tuesday</option>
                        <option value = "WEDNESDAY">Wednesday</option>
                        <option value = "THURSDAY">Thursday</option>
                        <option value = "FRIDAY">Friday</option>
                        <option value = "SATURDAY">Saturday</option>
                        <option value = "SUNDAY">Sunday</option>
                    </select>
                    <button type = "submit" onClick = {handleSubmit}>Add shift</button>
                    <button type = "button" onClick = {onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddScheduleItem;