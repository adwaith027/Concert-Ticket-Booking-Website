import React, { useEffect } from "react";
import './styles/home.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAdmin from "./authentication/checkAdmin";
import Navbar from "./Navbar";

function Adminhome(){

    return(
        <div>
            <Navbar/>
            <div className="home">
                <h2>Welcome Admin</h2>
            </div>
        </div>
    );
}

export default checkAdmin(Adminhome);