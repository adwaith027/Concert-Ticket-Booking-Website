import {createBrowserRouter} from 'react-router-dom';
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login';
import Listconcert from './components/Listconcert';
import Createconcert from './components/Createconcert';
import Adminhome from './components/Adminhome';
import Userhome from './components/Userhome';
import Bookticket from './components/Bookticket';
import AboutUs from './components/AboutUs';
import Editconcert from './components/Editconcert';

const router=createBrowserRouter([
    {path:'admin-home',element:<Adminhome/>},
    {path:'user-home',element:<Userhome/>},
    {path:'aboutus',element:<AboutUs/>},
    {path:'signup',element:<Signup/>},
    {path:'login',element:<Login/>},
    {path:'concerts',element:<Listconcert/>},
    {path:'create-concert',element:<Createconcert/>},
    {path:'edit-concert/:concertid',element:<Editconcert/>},
    {path:'book-concert/:concertid',element:<Bookticket/>}
])

export default router;