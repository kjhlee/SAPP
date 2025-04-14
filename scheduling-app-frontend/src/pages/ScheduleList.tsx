import {useState, useEffect} from "react";
import {Schedule } from "../types/schedule";
import ScheduleCard from "../components/ScheduleCard";
import './styles/ScheduleList.css'

function ScheduleList(){
    const [schedules, setSchedules] = useState<Schedule[]> ([]);
    const token = localStorage.getItem("token");
    if(!token) {
        console.log("you have no token");
    }
    const fetchSchedules = async () => {
        // fetch("http://localhost:8080/schedules/all")
        //     .then((res) => res.json())
        //     .then((data) => setSchedules(data))
        //     .catch((err) => console.error("Error fetching schedules: ", err));
        try {
            
            const response = await fetch('http://localhost:8080/schedules/my', {
                method: "GET",
                headers: {
                   "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            // console.log(data);
            setSchedules(data);
        } catch (error) {
            console.error("Failed to fetch Schedules", error);
        }
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
            // const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/schedules/myadd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newSchedule),
                credentials: "include"
            });
            if(!response.ok){
                throw new Error("Failed to create a schedule")
            }
            setTimeout(() => {
                fetchSchedules();
            }, 50);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async(scheduleId: number) => {
        try {
            await fetch(`http://localhost:8080/schedules/delete/${scheduleId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include"
                }
            )
            setTimeout(() => {
                fetchSchedules();
            }, 50);
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