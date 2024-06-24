import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './Task';
import { Navigate, useNavigate  } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from '../supports/AuthProvider';


const Home = ()  => {
  const [auth, setAuth] = useState({
    token : localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false
});
  // const [authenticate, setAuthenticate] = useState('');
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("token");
  //   if (loggedInUser) {
  //     setAuthenticate(loggedInUser);
  //   }
  // }, []);

  // if (!authenticate) {
  // // Redirect
  // } else {
  //   return (
  //     <Navigate to="/login" />
  //   );
  // }

  // const checkLogin = async (e) => {
  //   e.preventDefault()
  //   if(localStorage.getItem("token") === null){
  //         return <Navigate to="/login" />
  //     }else{
  //         return <Navigate to="/list" />
  //     }
  // };
  const navigate = useNavigate();
  // const navLogout = () => {
  //   navigate('/logout');
  // }
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
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor='content' className="form-label">Content:</label>
                        <input type='text' className='form-control' id='content' name='content' placeholder='Enter...' />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='priority_level' className="form-label">Priority Level:</label>
                        <input type='text' className='form-control' id='priority_level' name='priority_level' placeholder='Enter...' />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='deadline' className="form-label">Third element:</label>
                        <input type='text' className='form-control' id='deadline' name='deadline' placeholder='Enter...' />
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


export default Home;