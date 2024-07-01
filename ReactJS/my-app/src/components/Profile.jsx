import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import host from '../config/host.json';
import { toast } from 'react-toastify';
import { useAuth } from '../supports/AuthProvider';
import axios from 'axios';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

function Profile() {
    // const auth = useAuth();
    const [auth, setAuth] = useState({
        token : localStorage.getItem('token') || null,
        isAuthenticated : localStorage.getItem('token') ? true : false
    });
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setUsrEmail] = useState('');
    const [pokemonName, setPokemonName] = useState('');

    useEffect(() => {
        // const validToken = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                setUserName(response.data.data);
                setUsrEmail(response.data.data);
                setPokemonName(localStorage.getItem('pokemon_name'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [auth.token]);    
    
    if (!userName || !email) {
        return <div>Đang tải dữ liệu...</div>;
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

    const pokemonNameImg = localStorage.getItem('assist_id');

    const randQuote = [
        'Hehe',
        'Haha', 
        'Hihi',
        'Douma',
        'F*ck you'
    ];
    var itemRand = randQuote[Math.floor(Math.random()*randQuote.length)];

    // console.log(itemRand);

    const handleTouchPokemon = () => {
        toast.success(itemRand, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
  return (
    <>
        <div className="row mt-5">
            <div className="col-1 col-md-1"></div>
            <div className="col-11 col-md-11">
                <a href="/" style={{ textDecoration: 'none' }}>&lt; Quay lại</a>
            </div>
        </div>
        <h5 className='text-center mt-3'>Thông tin tài khoản</h5>
        <div className="row text-center mt-5">
            <div class="col-12 col-md-12">
                <img src={`/assets/profile_user.png`} alt=""  className="bd-placeholder-img rounded-circle" width="140" height="140" />
                <h2 className="fw-normal mt-4"><strong>{userName.display_name}</strong></h2>
                <p><strong>E-mail: </strong>{email.email}</p>
                <p><button onClick={logout} className="btn btn-sm btn-danger">Đăng xuất »</button></p>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-1 col-md-1">
                
            </div>
            <div className="col-11 col-md-11">
            <p><i>Kế bên phải là trợ thủ của bạn, hãy chào bạn ấy nhé! »»»»»</i></p>
                <div>
                    {/* Assistant image */}
                    {pokemonNameImg !== '0' && <img onClick={handleTouchPokemon} src={`/assets/${pokemonNameImg}.png`} className='img-need-hover-login' alt={`${pokemonName}`} title={`${pokemonName} đang là trợ lý chính của bạn. Hãy thử chạm vào ${pokemonName}`} width='50%' height='50%' />}
                    {pokemonNameImg === '0' && <></>}
                </div>
            </div>
        </div>

    </>
  )
}

export default Profile;