import "./styles/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const navigate = useNavigate();
    const handleRegisterAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        if(password !== cPassword){
            alert("Passwords do not match!");
            return;
        }

        try {
            console.log("Calling: ", `${BASE_URL}/api/auth/register`);
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: cPassword
                })
            });

            const data = await response.text();
            if(response.ok) {
                navigate("/login");
            } else {
                alert(`Error: ${data}`)
            }
        } catch (error){
            alert("Failed to Register. Try Again");
        }
    }
    return(
        <div>
            <div className = "registerForm">
                <form onSubmit = {handleRegisterAccount}>
                    <label htmlFor="email">Email: </label>
                    <input 
                        type = "text" 
                        id = "email" 
                        name = "email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required 
                    />

                    <label htmlFor = "password">Password: </label>
                    <input 
                        type = "password" 
                        name = "password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required 
                        />
                    <label htmlFor = "cPassword">Confirm Password: </label>
                    <input 
                        type = "password" 
                        name = "cpassword"
                        value = {cPassword}
                        onChange = {(e) => setCpassword(e.target.value)}
                        required 
                    />
                    <input type = "submit" value = "Register"></input>
                </form>
            </div>
        </div>
    );
}

export default Register;
