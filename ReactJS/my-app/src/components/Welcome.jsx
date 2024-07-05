import React, { useEffect, useState } from 'react'
// import bg from './inline-img/bg/0_1.PNG';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Welcome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [auth, setAuth] = useState({
    token : localStorage.getItem('token') || null,
    isAuthenticated : localStorage.getItem('token') ? true : false
});

  const handleNavigation = () => {
    const check_username = localStorage.getItem('username');
    if (check_username) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const HandleAbout = () => {
    toast.success('Hình ảnh: The Pokémon Company / Game Freak / Nintendo (1996)');
    toast.success('Mã nguồn: GitHub/@TrHgTung');
  }

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
    toast.warning('Đã đăng xuất. Hãy đăng nhập lại', {
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
    <>
      <div className="row mt-4">
        <div className="col-2">
          <div className='text-center ms-5 force-link' onClick={HandleAbout}>
            <h6>Giới thiệu về <i>Lời nhắc</i></h6>
          </div>
        </div>
        <div className="col-7">
        </div>
        <div className="col-3">
          {username ? (
              <>
              <div className="dropdown">
              <a class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                
              </a>
                <ul className="dropdown-menu show" aria-labelledby="dropdownMenuLink">
                  <li><a href='/' className="dropdown-item btn btn-outline-success" onClick={handleNavigation}>Truy cập dữ liệu</a></li>
                  <li><a onClick={logout} className="dropdown-item force-link btn btn-outline-danger" >Đăng xuất</a></li>
                </ul>
              </div>
              </>
          ) : (
            <a href='/login' className="btn btn-sm btn-primary" onClick={handleNavigation}>Đăng nhập</a>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <h2>Ứng dụng Lời nhắc</h2>
          <small><i>Một ứng dụng nhắc nhở các công việc của người dùng</i></small>
          <div className='mt-3'>
            <button className='btn btn-secondary' onClick={handleNavigation}>Bắt đầu sử dụng</button>
          </div>
        </div>      
      </div>
      <div>
        <img src='/assets/bg/0_1.PNG' alt="" />
      </div>
    </>
  )
}

export default Welcome