import axios from 'axios';
import { useState } from "react";
//import {login} from "./UserLoginUI"

function UserRegistration() {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function save(event) {
        event.preventDefault();
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // Check password length
        if (password.length < 7) {
            alert("Password must be at least 7 characters long");
            return;
        }

        const data = {
            username: username,
            name: name,
            lastname: lastname,
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8080/users/add', data);
            if (response.status === 200) {
                alert("Registration successful");
                
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed");
        }
    }

    return (
        <div className="container mt-4">
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Lastname</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Lastname"
                        value={lastname}
                        onChange={(event) => {
                            setLastname(event.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Min 7 characters"
                        minLength="7"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        required
                    />
                </div>

                <button className="btn btn-primary mt-4" onClick={save}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default UserRegistration;
