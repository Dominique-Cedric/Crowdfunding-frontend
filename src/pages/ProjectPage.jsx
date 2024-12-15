import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import "./ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();
    const { auth } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const [pledgeData, setPledgeData] = useState({
        amount: '',
        comment: '',
        anonymous: false
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(
                    `https://risingathletes-495c4007dfac.herokuapp.com/projects/${id}/`
                );
                
                if (!response.ok) {
                    throw new Error('Project not found');
                }
                
                const data = await response.json();
                console.log('Project data:', data);
                setProject(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching project:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handlePledgeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                'https://risingathletes-495c4007dfac.herokuapp.com/pledges/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth.token}`
                    },
                    body: JSON.stringify({
                        amount: parseFloat(pledgeData.amount),
                        project: parseInt(id),
                        comment: pledgeData.comment,
                        anonymous: pledgeData.anonymous
                    })
                }
            );

            if (response.ok) {
                // Refresh project data
                const updatedResponse = await fetch(
                    `https://risingathletes-495c4007dfac.herokuapp.com/projects/${id}/`
                );
                const updatedProject = await updatedResponse.json();
                setProject(updatedProject);
                
                // Reset form
                setPledgeData({ amount: '', comment: '', anonymous: false });
                setShowPledgeForm(false);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create pledge');
            }
        } catch (err) {
            console.error('Error creating pledge:', err);
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading project...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!project) {
        return <div className="not-found">Project not found</div>;
    }

    return (
        <div className="project-container">
            <div className="project-details">
                <h1>{project.title}</h1>
                <img src={project.image} alt={project.title} className="project-image" />
                <p className="description">{project.description}</p>
                
                <div className="stats">
                    <div className="stat">
                        <h3>Goal</h3>
                        <p>${parseFloat(project.goal).toLocaleString()}</p>
                    </div>
                    <div className="stat">
                        <h3>Pledged</h3>
                        <p>${(project.sum_pledges || 0).toLocaleString()}</p>
                    </div>
                    <div className="stat">
                        <h3>Status</h3>
                        <p>{project.is_open ? 'Active' : 'Closed'}</p>
                    </div>
                </div>

                {auth.token ? (
                    project.is_open && (
                        <div className="pledge-section">
                            {!showPledgeForm ? (
                                <button 
                                    onClick={() => setShowPledgeForm(true)}
                                    className="pledge-button"
                                >
                                    Support this project
                                </button>
                            ) : (
                                <form onSubmit={handlePledgeSubmit} className="pledge-form">
                                    <div className="form-group">
                                        <label>Amount ($)</label>
                                        <input
                                            type="number"
                                            value={pledgeData.amount}
                                            onChange={(e) => setPledgeData({
                                                ...pledgeData,
                                                amount: e.target.value
                                            })}
                                            required
                                            min="1"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Comment (optional)</label>
                                        <textarea
                                            value={pledgeData.comment}
                                            onChange={(e) => setPledgeData({
                                                ...pledgeData,
                                                comment: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="form-group checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={pledgeData.anonymous}
                                                onChange={(e) => setPledgeData({
                                                    ...pledgeData,
                                                    anonymous: e.target.checked
                                                })}
                                            />
                                            Make this pledge anonymous
                                        </label>
                                    </div>
                                    <div className="button-group">
                                        <button type="submit" className="submit-button">
                                            Submit Pledge
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPledgeForm(false)}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )
                ) : (
                    <div className="login-prompt">
                        <p>Please <Link to="/login">log in</Link> to support this project</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectPage;