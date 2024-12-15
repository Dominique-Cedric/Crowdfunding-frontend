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
    const [message, setMessage] = useState('');

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
            // Validate amount
            const amount = parseFloat(pledgeData.amount);
            if (isNaN(amount) || amount <= 0) {
                setError('Please enter a valid amount');
                return;
            }

            // Format the pledge data
            const pledgePayload = {
                amount: amount,  // Send as number, not string
                project: id,  // Send as string
                comment: pledgeData.comment || "",
                anonymous: pledgeData.anonymous
            };

            console.log('Submitting pledge:', pledgePayload);

            const response = await fetch(
                'https://risingathletes-495c4007dfac.herokuapp.com/pledges/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth.token}`
                    },
                    body: JSON.stringify(pledgePayload)
                }
            );

            if (response.ok) {
                // Success - don't try to parse response
                // Refresh project data
                const updatedResponse = await fetch(
                    `https://risingathletes-495c4007dfac.herokuapp.com/projects/${id}/`
                );
                const updatedProject = await updatedResponse.json();
                setProject(updatedProject);
                
                // Reset form and show success
                setPledgeData({ amount: '', comment: '', anonymous: false });
                setShowPledgeForm(false);
                setError('');
                setMessage('Thank you for your pledge!');
            } else {
                // Error handling
                setError('Failed to create pledge. Please try again.');
                console.error('Pledge Error - Status:', response.status);
            }
        } catch (err) {
            console.error('Error creating pledge:', err);
            setError('Network error. Please try again.');
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

                <div className="progress-section">
                    <div className="progress-info">
                        <span className="progress-text">
                            ${(project.sum_pledges || 0).toLocaleString()} raised of ${parseFloat(project.goal).toLocaleString()} goal
                        </span>
                        <span className="progress-percentage">
                            {Math.round((project.sum_pledges || 0) / project.goal * 100)}%
                        </span>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar" 
                            style={{ 
                                width: `${Math.min((project.sum_pledges || 0) / project.goal * 100, 100)}%` 
                            }}
                        />
                    </div>
                </div>

                <div className="share-section">
                    <h3>Share this project</h3>
                    <div className="share-buttons">
                        {/* Facebook */}
                        <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button facebook"
                            aria-label="Share on Facebook"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>

                        {/* Twitter */}
                        <a 
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${project.title} on Rising Athletes!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button twitter"
                            aria-label="Share on Twitter"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>

                        {/* LinkedIn */}
                        <a 
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button linkedin"
                            aria-label="Share on LinkedIn"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        {/* WhatsApp */}
                        <a 
                            href={`https://wa.me/?text=${encodeURIComponent(`Check out ${project.title} on Rising Athletes! ${window.location.href}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="share-button whatsapp"
                            aria-label="Share on WhatsApp"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>

                        {/* Copy Link Button */}
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                // You could add a toast notification here
                                alert('Link copied to clipboard!');
                            }}
                            className="share-button copy-link"
                            aria-label="Copy link"
                        >
                            <i className="fas fa-link"></i>
                        </button>
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