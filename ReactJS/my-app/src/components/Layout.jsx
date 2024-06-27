import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './Task';
import { Navigate, useNavigate  } from 'react-router-dom';
// import Logout from './Logout';
import { useAuth } from '../supports/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import './css/hover.css';


const Layout = ()  => {
  const [selectOption, setSelectOption] = useState('0');
  const [auth, setAuth] = useState({
    token : localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false
  });

  const [formData, setFormData] = useState({
    content: '',
    priority_level: '',
    assist_id: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const inputElement = document.getElementById('assist_id123');
    if(inputElement){
      setSelectOption(inputElement.value);
    }
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:4401/api/jobPost', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            console.log('Task added successfully:', response.data.result);
            // Optionally reset form after successful submission
            setFormData({
                content: '',
                priority_level: '',
                assist_id: '',
                deadline: ''
            });
        } else {
            console.error('Failed to add task:', response.data.message);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
  };

  const display_name = localStorage.getItem('display_name');
  const assist_id = localStorage.getItem('assist_id');
  // const [username, setUsername] = useState('');

  // useEffect(() => {
  //   if(originUsername) {
  //     const parts = originUsername.split('@'); // Tách email thành mảng gồm phần trước và sau dấu @
  //     if (parts.length > 0) {
  //         setUsername(parts[0]); // Lấy phần tử đầu tiên là phần trước dấu @
  //     }
  //   }
  // }, [originUsername]);

  const navigate = useNavigate();
 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('assist_id');
    localStorage.removeItem('display_name');
    localStorage.removeItem('pokemon_name');
    setAuth({ 
        token: null,
        isAuthenticated: false 
    });
    toast.success('Đã đăng xuất. Hãy đăng nhập lại', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
    navigate('/login');
}

    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-10 text-center mb-4 mt-3">
            <h2 className='w-100 d-flex justify-content-center'>Lời nhắc</h2>
            <small><i>Người dùng: @{display_name} - Trợ lý chính:  
                {assist_id === '1' && ' Venusaur'}
                {assist_id === '2' && ' Pikachu'}
                {assist_id === '3' && ' Charizard'}
                {assist_id === '4' && ' Umbreon'}
                {assist_id === '5' && ' Lapras'}
                {(assist_id !== '1' 
                && assist_id !== '2' 
                && assist_id !== '3'  
                && assist_id !== '4'  
                && assist_id !== '5') && ' Không có'}
            </i></small>
          </div>
          <div className="col-md-2">
            <div className='mt-4'>
              <button onClick={logout} className='btn btn-sm btn-danger'>Đăng xuất</button>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <h4>Thêm lời nhắc của bạn</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor='content' className="form-label">Nội dung lời nhắc:</label>
                        <input type='text' 
                          className='form-control' 
                          id='content' 
                          name='content' 
                          placeholder='Nhập nội dung lời nhắc...' 
                          value={formData.content}
                          onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='priority_level' className="form-label">Mức ưu tiên:</label>
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
                        <label htmlFor='assist_id123' className="form-label">Chọn trợ thủ riêng cho lời nhắc:</label>
                        <select
                          name="assist_id"
                          id="assist_id123"
                          className='form-control'
                          value={formData.assist_id}
                          onChange={handleChange}
                        >
                          <option className='text-primary font-weight-bold' value="2">Snorlax</option>
                          <option className='text-success font-weight-bold' value="3">Leafeon</option>
                          {/* <option className='text-primary font-weight-bold' value="10">Glaceon</option>
                          <option className='text-warning font-weight-bold' value="4">Jolteon</option>
                          <option className='text-danger font-weight-bold' value="5">Flareon</option>
                          <option className='text-success font-weight-bold' value="6">Meowscarada</option>
                          <option className='text-danger font-weight-bold' value="7">Latias</option>
                          <option className='text-warning font-weight-bold' value="8">Beedrill</option>
                          <option className='text-success font-weight-bold' value="9">Larvitar</option> */}
                          <option className='text-warning font-weight-bold' value="4">*Lucario*</option>
                        </select>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='deadline' className="form-label">Thời hạn:</label>
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
                    <button type="submit" className='btn btn-primary mb-3'>Thêm lời nhắc</button>
                </form>
            </div>
            <div className="col-md-8">  
              {selectOption !== '0' && <img src={`/assets/add/${selectOption}.png`} className='img-need-hover' alt=''/>}       
              {selectOption === '1' && <p><i>Hình ảnh về trợ thủ của bạn sẽ xuất hiện tại đây, sau khi bạn nhấn qua từng mục trong trường <strong>'Chọn trợ thủ riêng cho lời nhắc'</strong></i></p>}       
                <Task/>
            </div>
        </div>
      </div>
    )
  }


export default Layout;