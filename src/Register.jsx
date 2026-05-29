import React from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

function Register() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    let navigate = useNavigate();

    const registerUser = async () => {
        try {
            const response = await axios.post("https://storywebsite-r3kv.onrender.com/users/register", {
                name,
                username,
                email,
                password
            });

            console.log("Registration Successful");
            console.log(JSON.stringify(response.data));

            navigate('/login');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className = 'Register'>
            <div id = 'registerDiv'>
                <form id = 'registerForm'>
                    <label className = 'label'>Name: </label>
                    <input className = 'input' placeholder='Enter your name....' type = 'text'
                    onChange={(e) => setName(e.target.value)} />
                    <label className = 'label'>Username: </label>
                    <input className = 'input' placeholder='Enter a username....' type = 'text'
                    onChange = {(e) => setUsername(e.target.value)} />
                    <label className = 'label'>Email: </label>
                    <input className = 'input' placeholder='Enter your email....' type = 'text'
                    onChange={(e) => setEmail(e.target.value)} />
                    <label className = 'label'>Password: </label>
                    <input className = 'input' placeholder='Enter a password....' type = 'password'
                    onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button id ='registerButton2' type = 'button' onClick={registerUser}>REGISTER</button>
                    <div id = 'alreadyLogin'>
                        <div id = 'already'>Already Have An Account?</div>
                        <Link to = '/login' className = 'link'>
                            <div id = 'login'>Login</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;