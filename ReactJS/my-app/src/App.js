import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Layout from './components/Layout';
import { AuthProvider } from './supports/AuthProvider';
import PrivateRoute from './supports/PrivateRoute';
import Logout from './components/Logout';
import { render } from '@testing-library/react';
import Update from './components/Update';

function App() {
  return (
    <Router>
      <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        } 
                    />
                    {/* Các route khác */}
                    {/* <Route path="/logout" element={<Logout />} /> */}
                    <Route path="/update/:id" element={<Update />} />
                </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
