import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './Task';
import { Navigate, useNavigate  } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from '../supports/AuthProvider';
import axios from 'axios';


const Layout = ()  => {
  const [auth, setAuth] = useState({
    token : localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false
  });

  const [formData, setFormData] = useState({
    content: '',
    priority_level: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:4401/api/jobPost', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            console.log('Task added successfully:', response.data);
            // Optionally reset form after successful submission
            setFormData({
                content: '',
                priority_level: '',
                deadline: ''
            });
        } else {
            console.error('Failed to add task:', response.data.message);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

 
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
      <div className='container'>
        <div className="row">
          <div className="col-md-10">
            <h2 className='w-100 d-flex justify-content-center p-3 mb-4'>To-do list</h2>
          </div>
          <div className="col-md-2">
            <div className='mt-4'>
              <button onClick={logout} className='btn btn-sm btn-danger'>Đăng xuất</button>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <h4>Add your tasks</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor='content' className="form-label">Content:</label>
                        <input type='text' 
                          className='form-control' 
                          id='content' 
                          name='content' 
                          placeholder='Enter...' 
                          value={formData.content}
                          onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='priority_level' className="form-label">Priority Level:</label>
                        <input 
                          type="text"
                          className="form-control"
                          id="priority_level"
                          name="priority_level"
                          placeholder="Enter..."
                          value={formData.priority_level}
                          onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='deadline' className="form-label">Third element:</label>
                        <input 
                          type="text"
                          className="form-control"
                          id="deadline"
                          name="deadline"
                          placeholder="Enter..."
                          value={formData.deadline}
                          onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-primary mb-3'>Add this task</button>
                </form>
            </div>
            <div className="col-md-8">         
                <Task/>
            </div>
        </div>
      </div>
    )
  }


export default Layout;