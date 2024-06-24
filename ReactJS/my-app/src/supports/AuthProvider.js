import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (localStorage.getItem('token')) {
            setAuth({ token });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null });
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
