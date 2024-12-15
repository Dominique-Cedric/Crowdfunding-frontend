import React, { createContext, useContext, useState, useEffect } from 'react';

// Export the context so it can be imported by the hook
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        console.log('Initial token from localStorage:', token);
        return { token };
    });

    const login = (userData) => {
        console.log('Login called with:', userData);
        if (!userData.token) {
            console.error('No token provided in login data');
            return;
        }
        localStorage.setItem('token', userData.token);
        setAuth({ token: userData.token });
    };

    const logout = () => {
        console.log('Logout called');
        localStorage.removeItem('token');
        setAuth({ token: null });
    };

    useEffect(() => {
        console.log('Auth state updated:', auth);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}