import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import "../HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) {
        return <div>Loading projects...</div>;
    }

    if (error) {
        return <div>Error loading projects: {error.message}</div>;
    }

    const activeProjects = projects.filter(project => project.is_open);
    const closedProjects = projects.filter(project => !project.is_open);

    return (
        <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="content-wrapper">
                <div className="projects-section">
                    <h2 className="section-title">Active Campaigns</h2>
                    <div id="project-list">
                        {activeProjects.map((projectData) => (
                            <ProjectCard 
                                key={projectData.id} 
                                projectData={projectData} 
                            />
                        ))}
                    </div>
                </div>

                <div className="projects-section">
                    <h2 className="section-title">Completed Campaigns</h2>
                    <div id="project-list">
                        {closedProjects.map((projectData) => (
                            <ProjectCard 
                                key={projectData.id} 
                                projectData={projectData} 
                            />
                        ))}
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

export default HomePage;