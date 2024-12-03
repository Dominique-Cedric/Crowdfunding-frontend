import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import ContactUsForm from "./components/ContactUsForm.jsx";

import { AuthProvider } from "./components/AuthProvider.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/contactus", element: <ContactUsForm /> },
      { path: "/project/:id", element: <ProjectPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    {/* Here we wrap our app in the router provider so they render */}
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

