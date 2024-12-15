import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import "./UserProfilePage.css";

function UserProfilePage() {
    const { auth, setAuth } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [userDetails, setUserDetails] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [userPledges, setUserPledges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Add loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = auth.token;
                console.log('Current token:', token);
                
                if (!token) {
                    console.log('No token available');
                    setError('Please log in to view profile');
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    'https://risingathletes-495c4007dfac.herokuapp.com/users/1/',
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem('token');
                        setAuth({ token: null });
                        throw new Error('Session expired. Please log in again.');
                    }
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                console.log('User data:', data);
                setUserDetails(data);
                setLoading(false);
            } catch (err) {
                console.error('Error in fetchUserDetails:', err);
                setError('Failed to fetch user details. Please try logging in again.');
                setLoading(false);
            }
        };

        const fetchUserProjects = async () => {
            try {
                const response = await fetch(
                    'https://risingathletes-495c4007dfac.herokuapp.com/projects/',
                    {
                        headers: {
                            'Authorization': `Token ${auth.token}`
                        }
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    const userProjects = data.filter(project => project.owner === 1);
                    setUserProjects(userProjects);
                }
            } catch (err) {
                console.error('Failed to fetch user projects:', err);
            }
        };

        const fetchUserPledges = async () => {
            try {
                const response = await fetch(
                    'https://risingathletes-495c4007dfac.herokuapp.com/pledges/',
                    {
                        headers: {
                            'Authorization': `Token ${auth.token}`
                        }
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    const userPledges = data.filter(pledge => pledge.supporter === 1);
                    setUserPledges(userPledges);
                }
            } catch (err) {
                console.error('Failed to fetch user pledges:', err);
            }
        };

        if (auth.token) {
            fetchUserDetails();
            fetchUserProjects();
            fetchUserPledges();
        }
    }, [auth.token, setAuth]);

    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <div className="loading-message">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <div className="error-message">{error}</div>
                    <Link to="/login" className="login-link">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1>My Profile</h1>
                </div>

                <div className="profile-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile Details
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        My Projects
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'pledges' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pledges')}
                    >
                        My Pledges
                    </button>
                </div>

                {activeTab === 'profile' && userDetails && (
                    <div className="profile-section">
                        <h2>Profile Information</h2>
                        {!isEditing ? (
                            <div className="profile-info">
                                <p><strong>Username:</strong> {userDetails.username}</p>
                                <p><strong>Email:</strong> {userDetails.email}</p>
                                <button 
                                    className="edit-button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <form className="profile-form">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input 
                                        type="text"
                                        value={userDetails.username}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email"
                                        value={userDetails.email}
                                        disabled
                                    />
                                </div>
                                <div className="button-group">
                                    <button 
                                        type="button" 
                                        className="cancel-button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="profile-section">
                        <h2>My Projects</h2>
                        <div className="projects-grid">
                            {userProjects.length > 0 ? (
                                userProjects.map(project => (
                                    <div key={project.id} className="project-item">
                                        <h4>{project.title}</h4>
                                        <p>{project.description}</p>
                                        <p className="project-status">
                                            Status: {project.is_open ? 'Active' : 'Closed'}
                                        </p>
                                        <Link 
                                            to={`/project/${project.id}`}
                                            className="view-button"
                                        >
                                            View Project
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>You haven't created any projects yet.</p>
                            )}
                        </div>
                        <Link to="/create-project" className="create-button">
                            Create New Project
                        </Link>
                    </div>
                )}

                {activeTab === 'pledges' && (
                    <div className="profile-section">
                        <h2>My Pledges</h2>
                        <div className="pledges-list">
                            {userPledges.length > 0 ? (
                                userPledges.map(pledge => (
                                    <div key={pledge.id} className="pledge-item">
                                        <h4>Pledge to Project</h4>
                                        <p className="pledge-amount">
                                            Amount: ${pledge.amount}
                                        </p>
                                        <p>Date: {new Date(pledge.date_created).toLocaleDateString()}</p>
                                        <Link 
                                            to={`/project/${pledge.project}`}
                                            className="view-button"
                                        >
                                            View Project
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>You haven't made any pledges yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfilePage; 