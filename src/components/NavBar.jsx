import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
       <Link to="/login">Log In</Link>
       <Link to="/signup">Signup</Link>
       
       {/* <Link to="/signup">Pledge</Link> */}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;