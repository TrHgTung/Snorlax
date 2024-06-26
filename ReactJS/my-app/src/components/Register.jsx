import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bg from '../assets/not_transparent/0.PNG';

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
        e.preventDefault();
        if(formData.password != formData.confirm_password){
            toast.error('Mật khẩu nhập lại không chính xác');
            return;
        }

        try{
            //await axios.get('http://127.0.0.1:4401/sanctum/csrf-cookie', { withCredentials: true });
            const response = await axios.post('http://127.0.0.1:4401/api/register', {
                display_name: formData.display_name,
                email: formData.email,
                password: formData.password
            },  { withCredentials: true });

            if(response.data.success){
                toast.success('Đăng ký thành công. Hãy đăng nhập bằng tài khoản của bạn');
            }
            else{
                toast.warning('Đăng ký thành công. Hãy đăng nhập bằng tài khoản của bạn');
                // toast.error('Có lỗi xảy ra (else). Hãy thử lại');
            }
        }
        catch (error){
            toast.error('Có lỗi xảy ra (catch execption). Hãy thử lại');
        }
    };

  return (
    <div className="container">
            <form onSubmit={handleRegister}>
                <div className="row">
                    <div className="col-md-6">
                        {/* Chen hinh anh */}
                        <img src={bg} alt="review-pokemon" />
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
                        <div className="form-floating mt-4 mb-4">
                            <label htmlFor="assist_id">Chọn một trợ lý**: </label>
                            <select
                                name="assist_id"
                                id="assist_id"
                                className='form-control'
                                value={formData.assist_id}
                                onChange={handleChange}
                            >
                                <option className='text-secondary font-weight-bold' value="0">...</option>
                                <option className='text-success font-weight-bold' value="1">+Venusaur*</option>
                                <option className='text-warning font-weight-bold' value="2">+Pikachu*</option>
                                <option className='text-danger font-weight-bold' value="3">+Charizard*</option>
                                <option className='text-secondary font-weight-bold' value="4">+Umbreon*</option>
                                <option className='text-primary font-weight-bold' value="5">+Lapras*</option>
                                <option className='text-secondary font-weight-bold' value="0">Tôi không cần trợ lý</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Đăng ký</button>
                        <div className='mt-3'>
                            <p>Đã có tài khoản? <Link to="/login">Quay về đăng nhập</Link></p>
                        </div>
                    </div>
                    <div>
                        <p className='p-0.25'>*: Dấu cộng đặt trước tên Pokémon, tức là sẽ có sự xuất hiện của tất cả dạng tiến hóa của Pokémon đó</p>
                        <p className='p-0.25'>**: Trợ lý sẽ sử dụng hình ảnh của Pokémon*** mà bạn đã đăng ký cùng với tài khoản, để đồng hành và hỗ trợ bạn hoàn thành tất cả các lời nhắc đúng hạn.</p>
                        <p className='p-0.25'>***: Pokémon is a Japanese media franchise consisting of video games, animated series and films, a trading card game, and other related media. <br />Tác giả sở hữu: <i> The Pokémon Company, GameFreak, Nintendo</i></p>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default Register