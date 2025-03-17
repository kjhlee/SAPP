import { useState, useEffect, useMemo } from "react";
import { Schedule, ScheduleItem} from "../types/schedule"
import './styles/SchedulePage.css'
import ScheduleCard from "../components/ScheduleItemCard";
import AddScheduleItem from "../components/AddScheduleItem";
import { useParams } from "react-router-dom";

function SchedulePage() {
    const { id } = useParams();
    const [schedule, setSchedule] = useState<Schedule | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSchedule = () =>{
        fetch(`http://localhost:8080/schedules/${id}`) // TODO: api should be the given id for the schedule
        .then((res) => res.json())
        .then((data) => setSchedule(data))
        .catch((err) => console.error("Error fetching schedule: ", err));
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

  

    const scheduleByDay = useMemo(() => {
        const groupedByDay: Record<string, ScheduleItem[]> = {
        MONDAY: [],
        TUESDAY: [],
        WEDNESDAY: [],
        THURSDAY: [],
        FRIDAY: [],
        SATURDAY: [],
        SUNDAY: [],
        };

        if (schedule?.scheduleItems) {
        schedule.scheduleItems.forEach((item) => {
            if (item.weekday && groupedByDay[item.weekday]) {
            groupedByDay[item.weekday].push(item);
            }
        });
        }

        return groupedByDay; // Computed only when `schedule` changes
    }, [schedule]);

    const handleDelete = async(itemId: number) => {
        try{
        await fetch(`http://localhost:8080/schedules/4/items/${itemId}`, {
            method: "DELETE"
        });
        fetchSchedule();
        } catch (error) {
            console.error(error);
        }
    }

  // console.log(scheduleByDay)
  
  // schedules.forEach((schedules) => {
  //   schedules.scheduleItems.forEach((item) => {
  //     if(item.weekday && scheduleByDay[item.weekday]) {
  //       scheduleByDay[item.weekday].push(item);
  //     }
  //   })
  // })

  // if (schedule && scheduleByDay.scheduleItems){
  //   schedule.scheduleItems.forEach((items) => {
  //     if(items.weekday){
  //       scheduleByDay[items.weekday].push(items);
  //     }
  //   })
  // }
  // console.log(scheduleByDay);

    return (
        <div>
        <h2>Schedule ID: {schedule?.id || "Loading..."}</h2>
        <button onClick={() => setIsModalOpen(true)}>➕ Add Shift</button> {/* Open Modal Button */}
        {isModalOpen && (
            <AddScheduleItem
            scheduleId={schedule?.id || 4}
            onClose={() => setIsModalOpen(false)}
            onItemAdded={fetchSchedule} // Auto-refresh schedule after adding shift
            />
        )}

        <div className="mainPage">
            <div className="Calendar-Box">
            {Object.entries(scheduleByDay).map(([day, items]) => (
                <div key={day} className={`column day ${day.toLowerCase()}`}>
                <h3>{day}</h3>
                {items.map((item) => (
                    <ScheduleCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    weekday={item.weekday}
                    onDelete = {handleDelete}
                    />
                ))}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}

export default SchedulePage;
