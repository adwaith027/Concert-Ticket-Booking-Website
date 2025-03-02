import Navbar from "./Navbar";
import checkUser from "./authentication/checkUser";
import './styles/home.css';

function Userhome(){
    return(
        <div>
            <Navbar/>
            <div className="home">
                <h2>Welcome User</h2>
            </div>
        </div>
    );
}

export default checkUser(Userhome);