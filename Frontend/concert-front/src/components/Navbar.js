import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "./store/authSlice";
import axios from "axios";
import './styles/Navbarstyles.css';

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout(){
        if(user){
            dispatch(removeUser());
            navigate('/login');
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>Concert Booker</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
            {user?(
                user.role=='admin'?(
                <li className="nav-item">
                    <NavLink to={"/admin-home"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Home
                    </NavLink>
                </li>
                ):(
                    <li className="nav-item">
                    <NavLink to={"/user-home"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Home
                    </NavLink>
                </li>
                )
            ):(
            <></>
            )}
            <li className="nav-item">
               <NavLink to={"/concerts"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                    Concerts
                </NavLink>
            </li>
            {user?(
                user.role=='admin'?(    
                <>
                <li className="nav-item">
                   <NavLink to={"/create-concert"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Add Concerts
                    </NavLink>
                </li>
                <li className="nav-item">
                   <NavLink to={"/edit-concert"} id="edit" className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                        Edit Concert
                    </NavLink>
                </li>
                </>
                ):(
                <li className="nav-item">
                   <NavLink to={"/book-concert"} id="book" className={ 'nav-link '+(status => status.isActive ? 'active' : '')} >
                        Book Ticket
                    </NavLink>
                </li>
                )
            ):(
                <></>
            )}
            <li className="nav-item">
               <NavLink to={"/aboutus"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                    About us
                </NavLink>
            </li>
            {user?
             <li className="nav-item">
             <button className="nav-link" onClick={logout}>Logout</button>
            </li>:
            <></>
            }
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;