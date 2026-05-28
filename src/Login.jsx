import React from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Login() {
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    
    const [cookies, setCookie] = useCookies(['name', 'username', 'email']);

    let navigate = useNavigate();

    const userLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/users/login", 
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            setCookie('name', response.data.data.user.name, {
                path: '/'
            });

            setCookie('username', response.data.data.user.username, {
                path: '/'
            });

            setCookie('email', response.data.data.user.email, {
                path: '/'
            });

            navigate("/profile");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className = 'Login'>
            <div id = 'loginDiv'>
                <form id = 'loginForm'>
                    <label className = 'label'>Email: </label><br />
                    <input className = 'input' placeholder='Enter your email....' type = 'text'
                    onChange = {(e) => setEmail(e.target.value)} />
                    <br /><br />
                    <label className = 'label'>Password: </label><br />
                    <input className = 'input' placeholder='Enter your password....' type = 'password'
                    onChange={(e) => setPassword(e.target.value)} />
                    <br /><br />
                    <button id = 'loginButton2' type='button' onClick={userLogin}>LOGIN</button>
                    <div id = 'dontRegister'>
                        <div id = 'dont'>Don't Have An Account?</div>
                        <Link className='link' to = '/register'>
                            <div id = 'register'>Register</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;