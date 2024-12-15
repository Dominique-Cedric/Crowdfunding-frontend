import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider';
import CampaignCard from '../components/CampaignCard';
import { Link } from 'react-router-dom';
import "../HomePage.css";

function Home() {
    const { auth } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://risingathletes-495c4007dfac.herokuapp.com/projects/');
                const data = await response.json();
                if (response.ok) {
                    setProjects(data);
                } else {
                    setError('Failed to fetch projects');
                }
            } catch (err) {
                setError('Error loading projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading projects...</div>;
    if (error) return <div>Error: {error}</div>;

    const activeProjects = projects.filter(project => project.is_open);
    const closedProjects = projects.filter(project => !project.is_open);

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                {/* Active Campaigns Section */}
                <section className="projects-section mb-12">
                    <h2 className="section-title text-2xl font-bold mb-6">Active Campaigns</h2>
                    <div className="project-list">
                        {activeProjects.map((projectData) => (
                            <CampaignCard 
                                key={projectData.id} 
                                campaign={projectData}
                                showDonateButton={!!auth.token}
                            />
                        ))}
                    </div>
                </section>

                {/* Completed Campaigns Section */}
                <section className="projects-section mb-8">
                    <h2 className="section-title text-2xl font-bold mb-6">Completed Campaigns</h2>
                    <div className="project-list">
                        {closedProjects.map((projectData) => (
                            <CampaignCard 
                                key={projectData.id} 
                                campaign={projectData}
                            />
                        ))}
                    </div>
                </section>
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

export default Home; 