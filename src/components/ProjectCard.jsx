import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ projectData }) {
    const {
        id,
        title,
        description,
        goal_amount,
        current_amount,
        image_url,
        is_open,
        date_created
    } = projectData;

    // Format the date
    const formattedDate = new Date(date_created).toLocaleDateString();
    
    // Format the amounts as currency, with fallbacks for undefined values
    const formattedGoal = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
    }).format(goal_amount || 0);  // Add fallback to 0 if undefined

    const formattedCurrentAmount = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
    }).format(current_amount || 0);

    // Add console.log to debug the values
    console.log('Project Data:', {
        id,
        title,
        goal_amount,
        current_amount,
        raw_data: projectData
    });

    return (
        <div className="project-card mb-8">
            <Link to={`/project/${id}`}>
                <img src={image_url} alt={title} />
                <div className="project-card-content">
                    <h3>{title}</h3>
                    <p className="description">{description}</p>
                    <div className="project-card-meta">
                        <p className="goal">Goal: {formattedGoal}</p>
                        <p className="current">Current: {formattedCurrentAmount}</p>
                        <p className="status">{is_open ? "Active" : "Closed"}</p>
                        <p className="date">Created: {formattedDate}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard;