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
  
    const handleHoanThanhTask = async (jobId) => {
        try {
            const response = await axios.put(`http://127.0.0.1:4401/api/finish/job/${jobId}`, 
                // status: '0' // Cap nhat thanh '0' (hoan thanhf Task)
                null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Sau khi cập nhật thành công, cập nhật lại danh sách công việc
            if (response.data.success) {
                // Bởi vì phương thức PUT đã trả về controller có chức năng tự xử lí update trường status = 0 (xử lí phía backend) rồi nên ko cần xử lí phía frontend

                // const updatedJobs = data.map(jobs => {
                //     if (jobs.id === jobId) {
                //         return { ...jobs, status: '0' };
                //     }
                //     return jobs;
                // });
                // setData(updatedJobs);
                console.log('Đã đánh dấu hoàn thành');
                window.location.reload();
            } else {
                console.error('Không thể hoàn thành, có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra. Nội dung lỗi: ', error);
        }
    };

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
                            <td><button onClick={() => handleHoanThanhTask(jobs.id)} className='btn btn-sm btn-secondary'>Hoàn thành</button></td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
      </div>
    )
  }


export default Task;