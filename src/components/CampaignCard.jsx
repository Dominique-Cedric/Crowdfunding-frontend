import React from 'react';
import { Link } from 'react-router-dom';
import "./CampaignCard.css";

function CampaignCard({ campaign, showDonateButton }) {
    return (
        <div className="project-card">
            <Link to={`/project/${campaign.id}`}>
                <img src={campaign.image} alt={campaign.title} />
                <div className="project-card-content">
                    <h3>{campaign.title}</h3>
                    <p className="description">{campaign.description}</p>
                    <div className="project-card-meta">
                        <p className="goal">
                            Goal: ${Number(campaign.goal).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                        {campaign.sum_pledges && (
                            <p className="current">
                                Current: ${Number(campaign.sum_pledges).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </p>
                        )}
                        <p className="status">{campaign.is_open ? "Active" : "Closed"}</p>
                        <p className="date">Created: {new Date(campaign.date_created).toLocaleDateString()}</p>
                    </div>
                    {showDonateButton && campaign.is_open && (
                        <button className="support-button">
                            Support This Project
                        </button>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default CampaignCard; 