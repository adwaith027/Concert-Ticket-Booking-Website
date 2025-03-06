import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import bookings from './styles/bookings.css'

function Viewbookings(){
    const [booking,setBooking]=useState('')
    const [error,setError]=useState('')
    const user=useSelector((state)=>(state.auth.user))
    useEffect(()=>{
        axios.get('view-tickets/')
        .then(response=>{
            setBooking(response.data);
        })
        .catch(error=>{
            setError(`Can't fetch concerts`)
        })
    },[])
    return(
        <div className="full-bg">
            <Navbar/>
            <div className="booking-container">
                <h1 className="booking-title">Bookings</h1>
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Concert Name</th>
                            <th>Ticket Price</th>
                            <th>Booked Tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking?(
                            booking.map((ticket,index)=>(
                                <tr key={index}>
                                    <td>{ticket.username}</td>
                                    <td>{ticket.concertname}</td>
                                    <td>{ticket.ticketprice}</td>
                                    <td>{ticket.bookedtickets}</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan={4}>No bookings have been made</td>
                            </tr>
                        )}
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Viewbookings;