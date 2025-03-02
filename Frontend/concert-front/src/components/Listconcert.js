import { useState,useEffect } from "react";
import axios from "axios";
import './styles/Liststyles.css'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import checkAuth from "./authentication/checkAuth";
import { useSelector } from "react-redux";

function Listconcert(){
    const [concerts,setConcerts]=useState([])
    var [error, setError] = useState('');
    const {concertname}=useParams();
    var navigate=useNavigate();
    const user=useSelector((state)=>(state.auth.user))

    useEffect(()=>{
        axios.get('/view-concerts/')
        .then(response=>{
            setConcerts(response.data);
        })
        .catch(error=>{
            setError('Failed to fetch concerts');
        })
    },[]);
    
    async function deleteconcert(id){
        try{
            await axios.delete('http://localhost:8000/delete-concert/'+id,{
                headers:{
                    'Authorization':`Token ${user.token}`
                }
            }).then((response)=>{
                window.alert('Concert Deleted')
                id=('')
                axios.get('/view-concerts/')
                .then(response=>{
                setConcerts(response.data);
        })
            })
        }catch(error){
            console.log(error)
        }
    };

    return(
        <div>
            <Navbar/>   
            <div className="main-body">
                <div className="list-page">
                    <h2>Concerts available for booking</h2>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <table className="listing-table">
                        <thead>
                            <tr>
                                <th>Concert Name</th>
                                <th>Concert Date</th>
                                <th>Concert Time</th>
                                <th>Concert Venue</th>
                                <th>Ticket Price</th>
                                <th>Available tickets</th>
                                {user?(
                                user.role=='admin' ?
                                (<th colSpan={2}>Action</th>):         
                                (<th>Book tickets</th>)
                                ):(
                                <></>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {concerts.length > 0 ? (
                                concerts.map((concert, index) => (
                                    <tr key={index}>
                                        <td>{concert.concertname}</td>
                                        <td>{concert.concertdate}</td>
                                        <td>{concert.concerttime}</td>
                                        <td>{concert.concertvenue}</td>
                                        <td>{concert.ticketprice}</td>
                                        <td>{concert.availabletickets}</td>
                                        {user?(
                                            user.role=='user' ?
                                            (
                                                <td><Link to={`/book-concert/${concert.id}`} className='btn'>Book</Link></td>
                                            ):(<>
                                                <td><Link to={`/edit-concert/${concert.id}`} className='btn'>Edit</Link></td>
                                                <td><Link onClick={()=>deleteconcert(concert.id)}  className='btn'>Remove</Link></td>
                                            </>)
                                        ):(
                                        <></>
                                        )}
                                    </tr>
                                ))) : (
                                <tr>
                                    <td>No concerts available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Listconcert);