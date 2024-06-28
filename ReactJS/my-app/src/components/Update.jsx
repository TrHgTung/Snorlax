import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import host from '../config/host.json';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

const Update = () => {
    const { id } = useParams(); // Lấy jobId từ URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        content: '',
        priority_level: '',
        deadline: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData(response.data.result);
                
                // console.log(getName)
            }
            catch(error){
                console.log('Error', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        try{
            const response = await axios.put(`${SERVER_API}${API_ENDPOINT}/edit/job/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                console.log('Task updated successfully:', response.data.result);
                // Optionally redirect or update UI after successful update
                navigate('/');
            }
            else {
                console.log('Failed to update task:', response.data.message);
                navigate('/');
            }
        }
        catch (error) {
            console.log('Error updating task:', error);
        }
        
    }

  return (
    <div className='container mt-3'>
        <a href="/" style={{ textDecoration: 'none' }}>&lt; Quay lại</a>
        <div className="row">
            <div className="col-md-4 mt-4">
                <h4>Sửa lại mục <i>{formData.content}</i></h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="content" className="form-label">Nội dung lời nhắc:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            name="content"
                            placeholder="Nhập nội dung lời nhắc"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="priority_level" className="form-label">Mức ưu tiên:</label>
                        {/* <input
                            type="text"
                            className="form-control"
                            id="priority_level"
                            name="priority_level"
                            placeholder="Enter..."
                            value={formData.priority_level}
                            onChange={handleChange}
                        /> */}
                        <select
                          name="priority_level"
                          id="priority_level"
                          className='form-control'
                          value={formData.priority_level}
                          onChange={handleChange}
                        >
                          <option className='text-success font-weight-bold' value="1">Mặc định</option>
                          <option className='text-warning font-weight-bold' value="2">Vừa phải</option>
                          <option className='text-danger font-weight-bold' value="3">Cao</option>
                        </select>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="deadline" className="form-label">Thời hạn:</label>
                        {/* <input
                            type="text"
                            className="form-control"
                            id="deadline"
                            name="deadline"
                            placeholder="Enter..."
                            value={formData.deadline}
                            onChange={handleChange}
                        /> */}
                        <input 
                          type="datetime-local" 
                          id="deadline" 
                          name="deadline" 
                          min="2024-01-01T00:00" 
                          max="2038-01-19T03:14"
                          className='form-control'
                          value={formData.deadline}
                          onChange={handleChange}
                        ></input>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Update