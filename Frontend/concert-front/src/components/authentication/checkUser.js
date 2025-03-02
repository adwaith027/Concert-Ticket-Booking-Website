import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export const checkUser = (Component) =>{
    function Wrapper(props){
        var user = useSelector(store=>store.auth.user);
        var navigate = useNavigate();
        useEffect(()=>{
            if(user){
                if(user.role=='admin'){
                    return;
                }
            }
            else{
                navigate('/login');
            }
        },[user]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkUser;