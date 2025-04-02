import "./styles/Home.css"
function Home() {
    return(
        <div className = "main">
            <h1>SAPP</h1>
            <p>by: kj Lee</p>
            <p>This is the home page</p>
            <a href="http://localhost:3000/login">Login</a>
            <br></br>
            <a href="http://localhost:3000/ScheduleList">Schedules</a>
        </div>
    )
}
export default Home;