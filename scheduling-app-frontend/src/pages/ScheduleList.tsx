import {useState, useEffect} from "react";
import {Schedule } from "../types/schedule";
import ScheduleCard from "../components/ScheduleCard";
import './styles/ScheduleList.css'

function ScheduleList(){
    const [schedules, setSchedules] = useState<Schedule[]> ([]);
    const fetchSchedules = () => {
        fetch("http://localhost:8080/schedules/all")
            .then((res) => res.json())
            .then((data) => setSchedules(data))
            .catch((err) => console.error("Error fetching schedules: ", err));
    };

    useEffect(() => {
        fetchSchedules();
    }, [])

    const handleCreateSchedule = async () =>{
        // newSchedule payload since it should always be empty
        const newSchedule = {
            scheduleItems: []
        };

        try{
            const response = await fetch(`http://localhost:8080/schedules/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSchedule)
            });
            if(!response.ok){
                throw new Error("Failed to create a schedule")
            }
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async(scheduleId: number) => {
        try {
            await fetch(`http://localhost:8080/schedules/delete/${scheduleId}`,
                {
                    method: "DELETE"
                }
            )
            fetchSchedules();
        } catch (error){
            console.error(error);
        }
    }
    return(
        <div>
            <div className = "header">
                <h1>SAPP</h1>
                <p>by: kj Lee</p>
            </div>
            <button onClick = {handleCreateSchedule}>+ Add Schedule</button>
            <div className = "schedules">
                {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <ScheduleCard key={schedule.id} id = {schedule.id} onDelete = {handleDelete} />
                    ))
                ) : (
                    <p>no schedules</p>
                )
                }
            </div>
        </div>
    );
}

export default ScheduleList;