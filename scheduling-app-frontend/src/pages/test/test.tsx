import { useState, useEffect } from "react";
import { Schedule, ScheduleItem} from "../../types/schedule"
import './test.css'

function Test() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/schedules/all") // Adjust API URL as needed
      .then((res) => res.json())
      .then((data) => setSchedules(data));
  }, []);

  return (
    <div>
      <h2>Schedules</h2>
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div key={schedule.id}>
            <h3>Schedule ID: {schedule.id}</h3>
            <ul>
              {schedule.scheduleItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.startTime} to {item.endTime} ({item.weekday || "No Day"})
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No schedules available</p>
      )}
      <div className = "mainPage">
        <div className = "Calendar-Box">
          <div className = "Monday"></div>
          <div className = "Tuesday"></div>
          <div className = "Wednesday"></div>
          <div className = "Thursday"></div>
          <div className = "Friday"></div>
          <div className = "Saturday"></div>
          <div className = "Sunday"></div>
        </div>
      </div>
    </div>
  );
}

export default Test;
