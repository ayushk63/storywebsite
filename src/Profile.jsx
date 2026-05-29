import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import Navbar from './Navbar.jsx';

function Profile() {
    let [name, setName] = React.useState("");
    let [username, setUsername] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [newName, setNewName] = React.useState("");
    let [oldPassword, setOldPassword] = React.useState("");
    let [newPassword, setNewPassword] = React.useState("");

    let navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['name', 'email', 'username']);

    React.useEffect(() => {
        setName(cookies['name']);
        setEmail(cookies['email']);
        setUsername(cookies['username']);
    }, [cookies]);

    const logoutUser = async () => {
        try {
            const response = await axios.post(
                "https://storywebsite-r3kv.onrender.com/users/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setCookie('name', "");

            setCookie('email', "");

            setCookie('username', "")

            console.log("Logged out the user");
            console.log(JSON.stringify(response.data));

            navigate("/login");
        } catch(error) {
            console.log(error);
        }
    }

    const updateName = async () => {
        try {
            const response = await axios.post(
                "https://storywebsite-r3kv.onrender.com/users/updatename", 
                {
                    username,
                    newName
                }
            );

            setCookie("name", response.data.data.updatedUser.name, {
                path: "/"
            });
        } catch (error) {
            console.log(error);
        }
    }

    const updatePassword = async () => {
        try {
            await axios.post(
                "https://storywebsite-r3kv.onrender.com/users/updatepassword",
                {
                    username,
                    oldPassword,
                    newPassword
                }
            );
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="Profile">
            <Navbar /><br /><br />
            <div>Hi, {name}!</div>
            <div>Want to update your profile?</div>
            <button className = 'updateButton' onClick = {() => {
                let updateNameDiv = document.getElementById('updateNameDiv');

                if (updateNameDiv.style.display === 'none') {
                    updateNameDiv.style.display = 'block';
                } else {
                    updateNameDiv.style.display = 'none';
                }
            }}>UPDATE NAME</button><br />
            <div id = 'updateNameDiv' style={{ display: 'none' }}>
                <input type = 'text' placeholder="Enter New Name...." id = 'newNameInput'
                onChange={(e) => setNewName(e.target.value)} />
                <br />
                <button className="updateButton2" onClick={updateName}>UPDATE</button>
            </div>
            <button className = 'updateButton' onClick = {() => {
                let updatePasswordDiv = document.getElementById("updatePasswordDiv");

                if (updatePasswordDiv.style.display === 'none') {
                    updatePasswordDiv.style.display = 'block';
                } else {
                    updatePasswordDiv.style.display = 'none';
                }
            }}>UPDATE PASSWORD</button><br />
            <div id="updatePasswordDiv" style = {{ display: 'none' }}>
                <input type = 'password' placeholder="Enter Old Password...." id = 'oldPasswordInput'
                onChange={(e) => setOldPassword(e.target.value)} />
                <br />
                <input type = 'password' placeholder="Enter New Password...." id = 'newPasswordInput'
                onChange={(e) => setNewPassword(e.target.value)} />
                <br />
                <button className="updateButton2" onClick={updatePassword}>UPDATE</button>
            </div>
            <br />
            <div>Want to publish a new story?</div>

            <Link to = '/writestory'>
                <button id = 'writeStoryButton'>PUBLISH A STORY</button><br /><br />
            </Link>

            <div>Want to read others' stories?</div>
            <Link to = '/viewstory'>
                <button id = 'viewStoryButton'>READ STORIES</button>
            </Link>
            <br /><br />

            <button id = 'logoutButton' onClick={logoutUser}>LOGOUT</button>
        </div>
    );
}

export default Profile;