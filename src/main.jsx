import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import NavBar from "./components/NavBar.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/contactus", element: <ContactUsPage /> },
      { path: "/about", element: <AboutUsPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/create-project", element: <CreateProjectPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

