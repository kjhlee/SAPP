import { useState, useEffect } from "react";
import { Schedule, ScheduleItem} from "../../types/schedule"
import './test.css'
import ScheduleCard from "../../components/ScheduleCard";

function Test() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/schedules/all") // Adjust API URL as needed
      .then((res) => res.json())
      .then((data) => setSchedules(data));
  }, []);

  const  scheduleByDay: Record<string, ScheduleItem[]> = {
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: []
  }
  
  schedules.forEach((schedules) => {
    schedules.scheduleItems.forEach((item) => {
      if(item.weekday && scheduleByDay[item.weekday]) {
        scheduleByDay[item.weekday].push(item);
      }
    })
  })

  console.log(scheduleByDay);

  return (
    <div>
      <h2>Schedules</h2>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div key={schedule.id}>
            <h3>Schedule ID: {schedule.id}</h3>
            <ul>
              {/* maps the item to a scheduleCard component */}
              {schedule.scheduleItems.map((item) => (
                <ScheduleCard 
                id = {item.id}
                name = {item.name}
                startTime = {item.startTime}
                endTime = {item.endTime}
                weekday= {item.weekday}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No schedules available</p>
      )}
      <div className = "mainPage">
        <div className="Calendar-Box">
          <div className="column day monday">
            Monday
            <ScheduleCard 
                id = {4}
                name = {"KJ"}
                startTime = {"10:30"}
                endTime = {"5:00"}
                weekday= {"MONDAY"}
                />
          </div>
          <div className="column day tuesday">Tuesday</div>
          <div className="column day wednesday">Wednesday</div>
          <div className="column day thursday">Thursday</div>
          <div className="column day friday">Friday</div>
          <div className="column day saturday">Saturday</div>
          <div className="column day sunday">Sunday</div>
        </div>

      </div>
    </div>
  );
}

export default Test;
