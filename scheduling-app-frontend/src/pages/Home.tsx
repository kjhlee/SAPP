import "./styles/Home.css"

import { Link } from "react-router-dom";

function Home() {
    return(
        <div className = "main">
            <h1>SAPP</h1>
            <p>by: kj Lee</p>
            <p>This is the home page</p>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/ScheduleList">Schedules</Link>
        </div>
    )
}
export default Home;