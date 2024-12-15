import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./NavBar.css";

function NavBar() {
    const { auth, logout } = useAuth();

    return (
        <nav className="navbar-container">
            <Link to="/" className="logo">Rising Athletes</Link>
            <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                {auth.token ? (
                    <>
                        <li><NavLink to="/create-project">Create Project</NavLink></li>
                        <li><NavLink to="/profile">My Profile</NavLink></li>
                        <li>
                            <button 
                                onClick={logout} 
                                className="nav-item"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                    </>
                )}
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;
