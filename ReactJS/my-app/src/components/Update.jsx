import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

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
                const response = await axios.get(`http://127.0.0.1:4401/api/job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData(response.data.result);
                // console.log(response.data.result)
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
            const response = await axios.put(`http://127.0.0.1:4401/api/edit/job/${id}`, formData, {
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
    <div className='container'>
        <div className="row">
            <div className="col-md-4 mt-4">
                <h4>Update cho mục {id}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="content" className="form-label">Content:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            name="content"
                            placeholder="Enter..."
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="priority_level" className="form-label">Priority Level:</label>
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
                        <label htmlFor="deadline" className="form-label">Deadline:</label>
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
                    <button type="submit" className="btn btn-primary mb-3">Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Update