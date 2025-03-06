import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import '../styles/reg.css'

function Signup(){
    var [username,setUsername]=useState('');
    var [email,setEmail]=useState('');
    var [password,setPassword]=useState('');
    var [confirm_password,setConfirm_password]=useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    function signupUser(){
        var user={
            username:username,
            email:email,
            password:password,
            confirm_password:confirm_password
        };
        axios.post('/signup/',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
                console.log(error.response.data.errors)
            }
        })
    }
    return(
        <div className="reg-form">
            <div className="reg-form-container">
                <h1>Signup</h1>
            {errorMessage?<div >{errorMessage}</div>:''}
            <div className="form-group">
                <label className="form-label">Username :</label>
                <input className="input-field" type='text' value={username} onChange={(event)=>setUsername(event.target.value)}/>    
            </div>
            <div className="form-group">
                <label className="form-label">Email :</label>
                <input className="input-field" type='email' value={email} onChange={(event)=>setEmail(event.target.value)}/>    
            </div>
            <div className="form-group">
                <label className="form-label">Password :</label>
                <input className="input-field" type='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>    
            </div>
            <div className="form-group">
                <label className="form-label">Confirm Password :</label>
                <input className="input-field" type='password' value={confirm_password} onChange={(event)=>setConfirm_password(event.target.value)}/>    
            </div>
            <div>
                <button className="submit-button" onClick={signupUser}>Submit</button>
            </div>
            <div className="form-group">
                <br/><span >Already a user? <Link className="lnk" to='/login'>Login</Link> instead</span>
            </div>
            </div>
        </div>
        );
}

export default Signup;