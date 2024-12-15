import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ProjectPage from './pages/ProjectPage';
import UserProfilePage from './pages/UserProfilePage';
import CreateProjectPage from './pages/CreateProjectPage';

function AppRoutes() {
    return (
        <div className="app">
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/create-project" element={<CreateProjectPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default AppRoutes; 