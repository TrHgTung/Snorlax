import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './supports/AuthProvider';
import PrivateRoute from './supports/PrivateRoute';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/list" 
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        } 
                    />
                    {/* Các route khác */}
                    {/* <Route path="/logout" element={<Logout />} /> */}
                </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
