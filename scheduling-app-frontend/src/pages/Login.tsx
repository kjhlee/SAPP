import "./styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(localStorage.getItem("token"));
            if(response.ok) {
                navigate("/ScheduleList");
            } else {
                alert(`Error ${data}`);
            }
        } catch (error) {
            console.log(error);
            alert("Failed To Login, Try Again");
        }
    }
    return(
        <div className="loginWrapper">
            <div className="loginForm">
                <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="submit" value="Login" />
                <p className="register-link">
                    If you don't have an account, <a href="http://localhost:3000/register">Register</a>
                </p>
                </form>
            </div>
        </div>

    )
}

export default Login;