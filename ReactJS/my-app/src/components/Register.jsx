import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        display_name: '',
        email: '',
        password: '', 
        confirm_password: '', 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => { // kiem tra xac nhan password
        //e.preventDefault();
        if(formData.password != formData.confirm_password){
            toast.error('Mật khẩu nhập lại không chính xác');
            return;
        }

        try{
            const response = await axios.post('http://127.0.0.1:4401/api/register', {
                display_name: formData.display_name,
                email: formData.email,
                password: formData.password
            });

            if(response.data.success){
                toast.success('Đăng ký thành công. Hãy đăng nhập bằng tài khoản của bạn');

                // const min = 1111;
                // const max = 9999;
                // const rand = min + Math.random() * (max - min);
                // localStorage.setItem('check_register', rand);
                navigate('/login');
                // console.log(response.data)
            }
            else{
                navigate('/login');
                toast.error('Có lỗi xảy ra (else). Hãy thử lại');
                // console.log(response.data)
            }
        }
        catch (error){
            navigate('/register');
            toast.error('Có lỗi xảy ra (catch execption). Hãy thử lại');
        }
    };

  return (
    <div className="container">
            <form onSubmit={handleRegister}>
                <div className="row">
                    <div className="col-md-6">
                        {/* Chen hinh anh */}
                    </div>
                    <div className="col-md-6">
                        <h2 className='w-100 d-flex justify-content-center p-3 mt-3'>Đăng ký sử dụng</h2>
                        <p className='text-center'><i>Hãy bắt đầu sử dụng Lời nhắc</i></p>
                        <div className="form-floating mt-4">
                            <label htmlFor='display_name'>Tên hiển thị:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="display_name" 
                                name="display_name" 
                                value={formData.display_name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-floating mt-4">
                            <label htmlFor='email'>E-mail:</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-floating mt-4">
                            <label htmlFor='password'>Mật khẩu:</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-floating mt-4 mb-4">
                            <label htmlFor='confirm_password'>Nhập lại mật khẩu:</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirm_password" 
                                name="confirm_password" 
                                value={formData.confirm_password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Đăng ký</button>
                        <div className='mt-3'>
                            <p>Đã có tài khoản? <Link to="/login">Quay về đăng nhập</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default Register