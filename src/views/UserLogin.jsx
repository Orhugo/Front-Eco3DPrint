import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    async function login(event) {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:8080/users/login', data);

            if (response.status === 200) {
                const { message, status, user } = response.data;

                if (status) {
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isLoggedIn', true);
                    navigate('/Front-Eco3DPrint', {state: {user: user}});
                } else {
                    setLoginError('Mail or/and password incorrect. Try again');
                }
            } else {
                console.log('Login failed:', response.data);
                setLoginError('Mail or/and password incorrect');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('Mail or/and password incorrect');
        }
    }

    return (
        <div className="container mt-4">
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary mt-4" onClick={login}>
                    Login
                </button>
                
                {loginError && <p>{loginError}</p>}

                <p>
                    Don't have an account?{' '}
                    <Link to="/UserRegistration">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default UserLogin;
