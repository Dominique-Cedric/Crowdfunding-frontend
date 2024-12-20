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
        <div className="page-wrapper">
            <div className="content-wrapper">
                {/* Active Campaigns Section */}
                <section className="projects-section mb-16">
                    <h2 className="section-title text-2xl font-bold mb-6">Active Campaigns</h2>
                    <div className="project-list">
                        {activeProjects.map((projectData) => (
                            <ProjectCard 
                                key={projectData.id} 
                                projectData={projectData} 
                                className="shadow-lg"
                            />
                        ))}
                    </div>
                </section>

                {/* Completed Campaigns Section */}
                <section className="projects-section mb-8">
                    <h2 className="section-title text-2xl font-bold mb-6">Completed Campaigns</h2>
                    <div className="project-list">
                        {closedProjects.map((projectData) => (
                            <ProjectCard 
                                key={projectData.id} 
                                projectData={projectData} 
                                className="shadow-lg"
                            />
                        ))}
                    </div>
                </section>
            </div>

            <footer className="login-footer">
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