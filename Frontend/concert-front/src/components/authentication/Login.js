import { useState,useEffect } from "react";
import axios from 'axios'; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../styles/login.css'
import { setUser } from "../store/authSlice";
import { setUserFromLocalStorage } from "../store/authSlice";
import checkGuest from "./checkguest";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    var [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch=useDispatch()
    
    useEffect(()=>{
          dispatch(setUserFromLocalStorage());
          },[dispatch]);

    const formSubmit = async (event) => {
        event.preventDefault();
        axios.post('/login/', {
            username: username,
            password: password
        }).then(response => {
            setError('');
            var user = {
                token:response.data.token,
                username:response.data.username,
                role:response.data.role
            }
            dispatch(setUser(user));
            if (user.role=='admin'){
                navigate('/admin-home');
            }
            else{
                navigate('/user-home')
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login.');
                console.log(error)
            }
        });
    };

    return (
        <div className="login-form">
        <div className="login-form-container">
            <h1>Login</h1><br/>
            <div>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                    <label className="form-label" htmlFor="username">Username :</label>
                    <input className="input-field" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="form-group">
                    <label className="form-label" htmlFor="password">Password :</label>
                    <input className="input-field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <button className="submit-button" type="submit">Login</button>
                    <div className="form-group">
                        <br/><span>New user? <Link to='/signup'>Register</Link> here</span>
                    </div>
                </form>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        </div>
    );
}

export default checkGuest(Login);
