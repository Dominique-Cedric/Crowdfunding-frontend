import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import "./CreateProjectPage.css";

function CreateProjectPage() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        goal: '',
        image: '',
        is_open: true,
        date_end: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate URL length
        if (formData.image.length > 200) {
            setError('Image URL must be less than 200 characters');
            return;
        }

        // Validate URL format
        try {
            new URL(formData.image);
        } catch {
            setError('Please enter a valid image URL');
            return;
        }

        try {
            const goalAmount = parseFloat(formData.goal);
            if (isNaN(goalAmount) || goalAmount <= 0) {
                setError('Please enter a valid goal amount');
                return;
            }

            const response = await fetch('https://risingathletes-495c4007dfac.herokuapp.com/projects/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${auth.token}`
                },
                body: JSON.stringify({
                    ...formData,
                    goal: goalAmount.toFixed(2)
                })
            });

            const data = await response.json();
            console.log('Create Project Response:', { status: response.status, data });

            if (response.ok) {
                navigate(`/project/${data.id}`);
            } else {
                const errorMessage = data.detail || Object.values(data)[0]?.[0] || 'Failed to create project';
                setError(errorMessage);
            }
        } catch (err) {
            console.error('Create Project Error:', err);
            setError('Network error. Please check your connection and try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="create-project-container">
            <div className="create-project-card">
                <h1>Create New Project</h1>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Project Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="goal">Goal Amount ($) *</label>
                        <input
                            type="number"
                            id="goal"
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            required
                            min="1"
                            step="0.01"
                            placeholder="Enter goal amount (e.g., 1000.00)"
                            className="form-input"
                        />
                        <small className="input-help">Enter amount in dollars (minimum $1)</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL * (max 200 characters)</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            maxLength="200"
                            placeholder="https://example.com/image.jpg"
                        />
                        <small className="input-help">
                            {formData.image.length}/200 characters
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_end">End Date *</label>
                        <input
                            type="date"
                            id="date_end"
                            name="date_end"
                            value={formData.date_end}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Create Project
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectPage; 