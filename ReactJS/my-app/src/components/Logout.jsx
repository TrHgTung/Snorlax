import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../supports/AuthProvider';


function Logout() {
    const [auth, setAuth] = useState({
        token : localStorage.getItem('token') || null,
        isAuthenticated : localStorage.getItem('token') ? true : false
    });
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ 
            token: null,
            isAuthenticated: false 
        });
        navigate('/login');
    }
  return (
    <div>Đã đăng xuất</div>
  )
}

export default Logout;