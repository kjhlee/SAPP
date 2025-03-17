import "./styles/Login.css"

function Login(){
    return(
        <div>
            <div className = "loginForm">
                <form>
                    <label htmlFor="email">Email: </label>
                    <input type = "text" id = "email" name = "email"></input>
                    <label htmlFor = "password">Password: </label>
                    <input type = "password" name = "password"></input>
                    <input type = "submit" value = "Login"></input>
                </form>
            </div>
        </div>
    )
}

export default Login;