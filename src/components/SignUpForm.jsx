import { useState } from "react";
import postUser from "../api/post-user.js";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const navigate = useNavigate();  
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
    });
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };
   const handleSubmit = (event) => {
       event.preventDefault();
       if (credentials.username && credentials.password && credentials.email) {
           postUser(
               credentials.username,
               credentials.email,
               credentials.password
           ).then((response) => {
            window.localStorage.setItem("token", response.token);
             navigate("/");
           });
       }
   };
    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                />
            </div>
           <button type="submit" onClick={handleSubmit}>
               Sign Up
           </button>
        </form>
    );
}
export default SignUpForm;




