import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CreateProjectPage.css";

function CreateProjectPage() {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal_amount: "",
        image_url: "",
        is_open: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            const data = await response.json();
            navigate(`/project/${data.id}`);
        } catch (err) {
            console.error(err);
            alert("Failed to create project");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="create-project-container">
                    <h1>Create New Campaign</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Campaign Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={projectData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={projectData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal_amount">Goal Amount ($):</label>
                            <input
                                type="number"
                                id="goal_amount"
                                name="goal_amount"
                                value={projectData.goal_amount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image_url">Image URL:</label>
                            <input
                                type="url"
                                id="image_url"
                                name="image_url"
                                value={projectData.image_url}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Create Campaign
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProjectPage; 