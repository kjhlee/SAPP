import {useState, useEffect} from "react";
import {Schedule, ScheduleItem } from "../types/schedule";


function Home(){
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

    const handleCreateSchedule = () =>{
        // newSchedule payload since it should always be empty
        const newSchedule = {
            scheduleItems: []
        };

        try{
            fetch(`http://localhost:8080/schedules/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSchedule)
            });
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div>
            <h1>SAPP</h1>
            <p>by: kj Lee</p>
            <button onClick = {handleCreateSchedule}>+ Add Schedule</button>
        </div>
    );
}

export default Home;