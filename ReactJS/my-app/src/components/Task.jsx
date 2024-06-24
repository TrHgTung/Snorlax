import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../supports/AuthProvider';

const Task = () => {
    // useEffect(() => {
    //     fetchData();
    // }, [])

    // const fetchData = async () => {
    //     try{
    //         const result = await axios("http://127.0.0.1:4401/api/jobs");
    //         console.log(result);
    //     }catch (error) {
    //         console.log('Cannot authenticate due to an error');
    //     }
    const [data, setData] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        const validToken = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4401/api/jobs', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setData(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [auth.token]);     
    
    if (!data) {
        return <div>Loading...</div>;
    }
  
    return (
      <div className='container'>
        <h4>Tasks List</h4>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nội dung công việc</th>
                    <th scope="col">Thời hạn</th>
                    <th scope="col">Mức ưu tiên</th>
                    <th scope="col">Đánh dấu hoàn thành</th>
                </tr>
            </thead>
            <tbody>
                {data.map(jobs => (
                    jobs.status === '1' && (
                        <tr key={jobs.id}>
                            <td>{jobs.id}</td>
                            <td>{jobs.content}</td>
                            <td>{jobs.deadline}</td>
                            <td>{jobs.priority_level}</td>
                            <td><button className='btn btn-sm btn-secondary'>Hoàn thành</button></td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
      </div>
    )
  }


export default Task;