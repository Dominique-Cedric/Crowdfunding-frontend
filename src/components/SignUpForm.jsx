import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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
        // Add your signup logic here
        // Then navigate to login or home page
        navigate("/login");
    };

    return (
        <form>
            <div className="input-group">
                <label>Username</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Choose a username" 
                    onChange={handleChange}
                    style={{ 
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield'
                    }}
                />
            </div>
            <div className="input-group">
                <label>Email</label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Enter your email" 
                    onChange={handleChange}
                    style={{ 
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield'
                    }}
                />
            </div>
            <div className="input-group">
                <label>Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Create a password" 
                    onChange={handleChange}
                    style={{ 
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield'
                    }}
                />
            </div>
            <div className="input-group">
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm your password" 
                    onChange={handleChange}
                    style={{ 
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield'
                    }}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create Account
            </button>
        </form>
    );
}

export default SignUpForm;




