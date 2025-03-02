import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import './styles/editconcert.css'

function Editconcert(){
    const{concertid}=useParams();
    const[concertname,setConcertname]=useState('');
    const[concertdate,setConcertdate]=useState('');
    const[concerttime,setConcerttime]=useState('');
    const[concertvenue,setConcertvenue]=useState('');
    const[ticketprice,setTicketprice]=useState(0.00);
    const[availabletickets,setAvailabletickets]=useState(0);
    let navigate=useNavigate();
    const user=useSelector((state)=>state.auth.user)

    useEffect(()=>{
        axios.get('/view-concerts/'+concertid).then(response=>{
            setConcertname(response.data.concertname)
            setConcertdate(response.data.concertdate)
            setConcerttime(response.data.concerttime)
            setConcertvenue(response.data.concertvenue)
            setTicketprice(response.data.ticketprice)
            setAvailabletickets(response.data.availabletickets)
        })
    },[concertid])


    function concertedit(e){
        e.preventDefault()
        axios.put('http://localhost:8000/update-concert/'+concertid,{
            concertname:concertname,
            concertdate:concertdate,
            concerttime:concerttime,
            concertvenue:concertvenue,
            ticketprice:ticketprice,
            availabletickets:availabletickets
        },{ headers:{
            'Authorization':`Token ${user.token}`,
            'Content-Type': 'application/json',
        }}).then(()=>{
            window.alert('Edited')
        })
        navigate('/concerts')
    }
    return(
        <div>
            <Navbar/>
            <div className="edit-concert-box">
                <h1>Edit Concert Details</h1>
                <form onSubmit={concertedit}>
                    <label>Concert Name:</label>
                    <input type="text" name="concertname" value={concertname} onChange={(e)=>setConcertname(e.target.value)} required/>                    
                    <label>Concert Date:</label>
                    <input type="date" name="concertdate" value={concertdate} onChange={(e)=>setConcertdate(e.target.value)} required/>                    
                    <label>Concert Time:</label>
                    <input type="time" name="concerttime" value={concerttime} onChange={(e)=>setConcerttime(e.target.value)} required/>                    
                    <label>Concert Venue:</label>
                    <input type="text" name="concertvenue" value={concertvenue} onChange={(e)=>setConcertvenue(e.target.value)} required/>                    
                    <label>Ticket Price:</label>
                    <input type="number" name="ticketprice" step={0.01} min={0} onChange={(e)=>setTicketprice(e.target.value)} value={ticketprice} required/>                    
                    <label>Available Tickets:</label>
                    <input type="number" name="availabletickets" value={availabletickets} onChange={(e)=>setAvailabletickets(e.target.value)} required/>   
                    <button>Apply Changes</button>             
                </form>
            </div>
        </div>
    );
}

export default Editconcert;