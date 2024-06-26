import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import { AuthProvider } from './supports/AuthProvider';
import PrivateRoute from './supports/PrivateRoute';
// import Logout from './components/Logout';
import { render } from '@testing-library/react';
import Update from './components/Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/register" element={<Register />} />
      </Routes> */}
      <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
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
                    <Route 
                      path="/update/:id" 
                      element={
                        <PrivateRoute>
                          <Update />
                        </PrivateRoute>
                      } 
                    />
                </Routes>
                <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
        </AuthProvider>
    </Router>
  );
}

export default App;
