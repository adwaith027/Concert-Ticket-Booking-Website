import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
import './styles/create concert.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAdmin from "./authentication/checkAdmin";

function Createconcert(){
    const [concertname,setConcertname]=useState('');
    const [concertdate,setConcertdate]=useState('');
    const [concerttime,setConcerttime]=useState('');
    const [concertvenue,setConcertvenue]=useState('');
    const [ticketprice,setTicketprice]=useState('');
    const [availabletickets,setAvailabletickets]=useState('');
    const user=useSelector((state)=>(state.auth.user))
    let [error,setError]=useState('')
        
    const addconcert=async(event)=>{
        event.preventDefault();
        const concertdata={
            concertname:concertname,
            concertdate:concertdate,
            concerttime:concerttime,
            concertvenue:concertvenue,
            ticketprice:ticketprice,
            availabletickets:availabletickets
        }
        try{
            await axios.post('create-concert/',concertdata,{
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json',
                  }
            })
            window.alert('Concert Added')
            setConcertname('');
            setConcertdate('');
            setConcerttime('');
            setConcertvenue('');
            setTicketprice('');
            setAvailabletickets('');
        }catch(error){
            setError('Error creating concert')
            console.log(error)
        };
    };
    return(
        <div>
            <Navbar/>
        <div className="createconcert">
            <h2>Add New Concerts</h2>
            <form onSubmit={addconcert}>
                <div className="form-group">
                    <label>Concert Name </label>
                    <input type="text" value={concertname} onChange={(event)=>setConcertname(event.target.value)} />
                    <label>Concert Date </label>
                    <input type="date" value={concertdate} onChange={(event)=>setConcertdate(event.target.value)} />
                    <label>Concert Time </label>
                    <input type="time" value={concerttime} onChange={(event)=>setConcerttime(event.target.value)} />
                    <label>Concert Venue </label>
                    <input type="text" value={concertvenue} onChange={(event)=>setConcertvenue(event.target.value)} />
                    <label>Ticket Price </label>
                    <input type="number" value={ticketprice} onChange={(event)=>setTicketprice(event.target.value)} />
                    <label>Available Tickets </label>
                    <input type="number" value={availabletickets} onChange={(event)=>setAvailabletickets(event.target.value)} />
                </div>
                <button type="submit" className="submit-btn">Add Concert</button>
            </form>
        </div>
        </div>
    );
}

export default checkAdmin(Createconcert);