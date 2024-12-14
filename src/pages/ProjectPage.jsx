import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useProject from "../hooks/use-project";
import "../ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();
    const project = useProject(id);

    if (!project) {
        return <div>Loading project...</div>;
    }

    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper">
                <div className="project-details">
                    <img src={project.image_url} alt={project.title} />
                    <div className="project-content">
                        <h1>{project.title}</h1>
                        <div className="project-meta">
                            <span className={`status ${project.is_open ? 'active' : 'closed'}`}>
                                {project.is_open ? 'Active' : 'Closed'}
                            </span>
                            <span className="date">Created: {new Date(project.date_created).toLocaleDateString()}</span>
                        </div>
                        <div className="goal-amount">
                            Goal: {new Intl.NumberFormat('en-AU', {
                                style: 'currency',
                                currency: 'AUD'
                            }).format(project.goal || 0)}
                        </div>
                        <p className="description">{project.description}</p>
                    </div>
                </div>
            </div>
            <footer className="login-footer" style={{ marginTop: 'auto' }}>
                <p className="copyright">© 2024 Rising Athletes, Inc. All Rights Reserved</p>
                <div className="footer-links">
                    <Link to="/terms">Terms and Conditions</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/contact">Contact us</Link>
                </div>
            </footer>
        </div>
    );
}

export default ProjectPage;