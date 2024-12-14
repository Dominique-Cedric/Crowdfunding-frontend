import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ projectData }) {
    const {
        id,
        title,
        description,
        goal_amount,
        goalAmount,
        goal,
        amount,
        target_amount,
        image_url,
        is_open,
        date_created
    } = projectData;

    // Format the date
    const formattedDate = new Date(date_created).toLocaleDateString();
    
    // Try different possible goal amount properties
    const actualGoalAmount = goal_amount || goalAmount || goal || amount || target_amount || 0;
    
    // Format the goal amount as currency
    const formattedGoal = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
    }).format(actualGoalAmount);

    // Debug log to see all project data
    console.log('Full Project Data:', projectData);

    return (
        <div className="project-card">
            <Link to={`/project/${id}`}>
                <img src={image_url} alt={title} />
                <div className="project-card-content">
                    <h3>{title}</h3>
                    <p className="description">{description}</p>
                    <div className="project-card-meta">
                        <p className="goal">Goal: {formattedGoal}</p>
                        <p className="status">{is_open ? "Active" : "Closed"}</p>
                        <p className="date">Created: {formattedDate}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard;