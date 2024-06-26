import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token : localStorage.getItem('token') || null,
        isAuthenticated : localStorage.getItem('token') ? true : false
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (localStorage.getItem('token')) {
            setAuth({ 
                token: token, 
                isAuthenticated: true 
            });
        } else {
             navigate('/login');
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ 
            token: token, 
            isAuthenticated: true 
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ 
            token: null,
            isAuthenticated: false 
        });
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
