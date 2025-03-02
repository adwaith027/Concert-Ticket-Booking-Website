import { useEffect, useState } from "react";
import React from "react";
import './styles/bookticket.css';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Bookticket(){
    const[concertname,setConcertname]=useState('');
    const[ticketprice,setTicketprice]=useState('');
    const[totalprice,setTotalprice]=useState(0)
    const[ticketcount,setTicketcount]=useState(0);
    const {concertid} =useParams();
    const[cid,setCid]=useState();
    let [err,setErr]=useState('')
    const user=useSelector((state)=>state.auth.user);
    const navigate=useNavigate();

    function setValues(e){
        const ticketcount=Number(e.target.value)
        setTicketcount(ticketcount)
        setTotalprice(Number(ticketcount*ticketprice))
    }

    useEffect(()=>{
        axios.get('/view-concerts/'+concertid).then(response=>{
            setCid(response.data.id)
            setConcertname(response.data.concertname);
            setTicketprice(response.data.ticketprice);
        })
    },[concertid])

    const addticket=async(event)=>{
        event.preventDefault();
        const ticketdata={
            concertname:concertname,
            ticketcount:ticketcount,
        };
        console.log(ticketdata)
        console.log(cid)
        try{
            await axios.post('http://localhost:8000/book-ticket/',ticketdata,{
                headers:{
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            setConcertname('')
            setTicketcount('')
            window.alert('Ticket booked')
            navigate('/concerts')
        }catch(error){
            setErr('Error booking tickets')
            console.log(err)
            console.log(user.token)
            console.log(ticketdata)
        }
    };

    return(
        <div className="ticket-div">
            <Navbar/>
            <div className="ticket-box">
                <h1>Book Tickets</h1>
                <form onSubmit={addticket}>
                <label>Concert Name :&nbsp;&nbsp;</label>
                <input type="text" name="concertname" value={concertname} disabled/>
                <label>Tickets for:&nbsp;&nbsp;</label>
                <div className="radio-box">
                    <input type="radio" id="1" name="ticketcount" value={1} onChange={(e)=>setValues(e)} required/>
                    <label htmlFor="1">1 Person</label>&nbsp;&nbsp;
                    <input type="radio" id="2" name="ticketcount" value={2} onChange={(e)=>setValues(e)} required/>
                    <label htmlFor="2">2 Persons</label>&nbsp;&nbsp;
                    <input type="radio" id="3" name="ticketcount" value={3} onChange={(e)=>setValues(e)} required/>
                    <label htmlFor="3">3 Persons</label>&nbsp;&nbsp;       
                </div>
                <label>Total Ticket Price :&nbsp;&nbsp;</label>
                <input type="number" value={totalprice} disabled/><br/>
                <button type="submit" className="sub-btn">Book Tickets</button>
                </form>
            </div>
        </div>
    );
}

export default Bookticket;