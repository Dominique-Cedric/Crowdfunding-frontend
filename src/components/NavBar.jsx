import { Link, Outlet } from "react-router-dom";
 import useAuth from "../hooks/use-auth.js";

function NavBar() {
   const {auth, setAuth} = useAuth();

   const handleLogout = () => {
       window.localStorage.removeItem("token");
       setAuth({ token: null });
   };

    console.log(auth)

    return (
        <div>
            <nav>              
                <Link to="/" style={{color: 'white'}}>Home</Link>

               {auth.token ? (
                   <Link to="/" onClick={handleLogout} style={{color: 'white'}}>
                       Log Out
                   </Link>
                   ) : (
                   <Link to="/login" style={{color: 'white'}} > Login</Link>
                   
               )}
               <Link to="/signup" style={{color: 'white'}}>Sign Up</Link>
               <Link to="/contactus" style={{color: 'white'}}>Contact Us</Link>


            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;