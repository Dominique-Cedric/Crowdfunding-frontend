import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import './navbar.css';  // Add this line at the top of your NavBar component


function NavBar() {
   const { auth, setAuth } = useAuth();

   const handleLogout = () => {
       window.localStorage.removeItem("token");
       setAuth({ token: null });
   };

   console.log(auth);

   return (
       <div>
           <nav>              
               <NavLink to="/" className="nav-link" activeClassName="active">
                   Home
               </NavLink>

               {auth.token ? (
                   <NavLink to="/" onClick={handleLogout} className="nav-link">
                       Log Out
                   </NavLink>
               ) : (
                   <NavLink to="/login" className="nav-link">
                       Login
                   </NavLink>
               )}

               <NavLink to="/signup" className="nav-link">
                   Sign Up
               </NavLink>
               <NavLink to="/contactus" className="nav-link">
                   Contact Us
               </NavLink>
           </nav>
           <Outlet />
       </div>
   );
}

export default NavBar;
