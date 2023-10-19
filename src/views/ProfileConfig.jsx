import axios from 'axios';
import { useState, useEffect } from "react";

function UserRegistration() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [userPassword, setUserPassword] = useState(""); 

    const userId = 16; //SHOULD GET ID FROM COOKIE

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/users/getUser?id=${userId}`);
                const userData = response.data;

                setUsername(userData.username);
                setName(userData.name);
                setLastname(userData.lastname);
                setEmail(userData.email);
                setUserPassword(userData.password); 
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, [userId]);

    async function update(event) {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
    
        if (password.length < 7) {
            alert("Password must be at least 7 characters long");
            return;
        }
    
        if (oldPassword !== userPassword) {
            alert("Wrong password! Please try again or contact the administrator");
            return;
        }
    
        const data = {
            id: userId,
            username: username,
            name: name,
            lastname: lastname,
            email: email,
            password: password
        };
    
        try {
            const response = await axios.post('http://localhost:8080/users/updateUser', data);
            if (response.status === 200) {
                alert("Update successful");
            } else {
                alert("Update failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Update failed");
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Insert new password"
                        minLength="7"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Old Password for Verification</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Insert old password"
                        value={oldPassword}
                        onChange={(event) => {
                            setOldPassword(event.target.value);
                        }}
                        required
                    />
                </div>

                <button className="btn btn-primary mt-4" onClick={update}>
                    Update
                </button>
            </form>
        </div>
    );
}

export default UserRegistration;
