import "./styles/Register.css"
function Register() {
    return(
        <div>
            <div className = "registerForm">
                <form>
                    <label htmlFor="email">Email: </label>
                    <input type = "text" id = "email" name = "email"></input>
                    <label htmlFor = "password">Password: </label>
                    <input type = "password" name = "password"></input>
                    <label htmlFor = "cPassword">Confirm Password: </label>
                    <input type = "password" name = "cpassword"></input>
                    <input type = "submit" value = "Register"></input>
                </form>
            </div>
        </div>
    );
}

export default Register;
