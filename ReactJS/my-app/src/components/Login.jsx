import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../supports/AuthProvider';

axios.defaults.withCredentials = true;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleLogin  = async (e) => {
        e.preventDefault();
        try{
            await axios.get('http://127.0.0.1:4401/sanctum/csrf-cookie', { withCredentials: true });
            const response = await axios.post('http://127.0.0.1:4401/api/login', {
                email,
                password,
            }, { withCredentials: true });

            const { token } = response.data;
            // const { token } = JSON.stringify(response.data.token);
            // localStorage.setItem('token', JSON.stringify(response.data.token));
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // console.log('Successful');
            if (token) {
                login(token); 
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate('/');
            } else {
                console.log('Token not found in response');
            }
            // console.log(JSON.stringify(response.data.token));
            // navigate('/');
        }
        catch (error) {
            console.log('Cannot authenticate due to an error');
        }
    };
  
    return (
        
        <div className='container'>
            <form onSubmit={handleLogin}>
                <div className="row">
                    <div className="col-md-4">
                    <h2 className='w-100 d-flex justify-content-center p-3 mb-4'>Please sign in</h2>
                        <div class="form-floating mt-4">
                            <label htmlFor='email'>Email:</label>
                            <input type="email" class="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div class="form-floating mt-4 mb-4">
                            <label htmlFor='password'>Password:</label>
                            <input type="password" class="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button class="btn btn-primary w-100 py-2" type="submit">Login</button>
                        {error && <p>{error}</p>}
                    </div>
                </div>
                
            </form>
        </div>
    )
  }


export default Login;