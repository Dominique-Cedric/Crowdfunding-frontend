import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import './NavBar.css';

function NavBar() {
   const { auth, setAuth } = useAuth();

   const handleLogout = () => {
       window.localStorage.removeItem("token");
       setAuth({ token: null });
   };

   return (
       <>
           <nav>
               <div className="nav-links">
                   <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                       Home
                   </NavLink>
                   
                   <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                       About Us
                   </NavLink>

                   {auth.token && (
                       <NavLink to="/create-project" className={({ isActive }) => isActive ? "active" : ""}>
                           Create Campaign
                       </NavLink>
                   )}

                   {auth.token ? (
                       <NavLink to="/" onClick={handleLogout}>
                           Log Out
                       </NavLink>
                   ) : (
                       <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
                           Login
                       </NavLink>
                   )}

                   <NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>
                       Sign Up
                   </NavLink>
                   
                   <NavLink to="/contactus" className={({ isActive }) => isActive ? "active" : ""}>
                       Contact Us
                   </NavLink>
               </div>
           </nav>
           <main>
               <Outlet />
           </main>
       </>
   );
}

export default NavBar;
