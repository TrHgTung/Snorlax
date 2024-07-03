import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import host from '../config/host.json';
import quote from '../config/quote.json';
import { toast } from 'react-toastify';
import { useAuth } from '../supports/AuthProvider';
import axios from 'axios';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

function Assistant() {
    const [pokemonName, setPokemonName] = useState('');
    const [isShiny, setIsShiny] = useState('');
    const [content, setContent] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [deadline, setDeadline] = useState('');
    const [auth, setAuth] = useState({
        token : localStorage.getItem('token') || null,
        isAuthenticated : localStorage.getItem('token') ? true : false
    });
    const originDateTimeString = deadline.deadline;
    
    // const auth = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy jobId từ URL

    useEffect(() => {
        const fetchData = async () => {
            // e.preventDefault();
    
            try{
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPokemonName(response.data.get_pokemon_name);
                setIsShiny(response.data.check_pokemon_shiny);
                setContent(response.data.result);
                setPriorityLevel(response.data.result);
                setDeadline(response.data.result);

                console.log(pokemonName);
                console.log(isShiny);
            }
            catch(error){
                toast.error('Có lỗi xảy ra (catch execption). Hãy thử lại');
            }
        };
        fetchData();
    }, [id]);

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

    const formatDateTime = (originDateTimeString) => {
        const date = new Date(originDateTimeString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `Ngày ${day}-${month}-${year} - Lúc ${hours}:${minutes}*`;
    };
    const formattedDateTime = formatDateTime(originDateTimeString);

    const handleHoanThanhTask = async (jobId) => {
        try {
            await axios.get(`${SERVER_API}/sanctum/csrf-cookie`, { withCredentials: true });
            const response = await axios.patch(`${SERVER_API}${API_ENDPOINT}/finish/job/${jobId}`, 
                null, {
                headers: {
                    "Accept-Language": "en-US,en;q=0.9",
                    'Content-Type': 'application/json',
                    'Charset':'utf-8',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.success) {
                // window.location.reload();
                toast.success('Tuyệt vời! Bạn đã hoàn thành công việc này. Hãy quay lại', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            } else {
                toast.success('Tuyệt vời! Bạn đã hoàn thành công việc này. Hãy quay lại', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('Không thể hoàn thành, có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra. Nội dung lỗi: ', error);
        }
    };

    // useEffect(() => {
    //     const getUserName = localStorage.getItem('username');
    //     if (getUserName) {
    //         setUsername(getUserName);
    //       } else {
    //         // Nếu không có giá trị trong localStorage
    //         console.log("Đã có lỗi xảy ra khi lấy ra dữ liệu user");
    //       }
    // }, []);

    const [text, setText] = useState('');

    useEffect(() => {
        // Lấy giá trị từ localStorage khi component được mount
        const storedText = localStorage.getItem('username');
        if (storedText) {
        setText(storedText);
        } else {
        // Nếu không có giá trị trong localStorage, đặt giá trị mặc định là 'Hello World'
            setText('Hello World');
        }
    }, []);

    let uname = '';
    const handleChangeTextAfterClick = (e) => {
        uname = localStorage.getItem('username');
        const newText = '<b>' + pokemonName.character_name + ': </b>Nào, ' + uname + ', hãy cùng nhau hoàn thành lời nhắc này thật sớm nhé!';
        
        // setUsername(newText);
        // Lưu giá trị mới vào localStorage
        // localStorage.setItem('text', newText);
       //  const newText = 'Hello Changed';
        setText(newText);
        // Lưu giá trị mới vào localStorage
        // localStorage.setItem('text', newText);
        // Cập nhật innerText của element
        e.target.innerHTML = newText;
      };

    const randQuote = quote;
    var itemRand = randQuote[Math.floor(Math.random()*randQuote.length)];

  return (
    <>
        <div className='container'>
            <div className="row mt-3">
                <div className="col-md-3">
                    <a href="/" style={{ textDecoration: 'none' }}>&lt; Quay lại</a>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-3 text-center mb-4 mt-3">
                    <button className='btn btn-sm btn-danger' onClick={logout} >Đăng xuất nhanh</button>
                </div>
            </div>
        </div>
        <div className='mt-4 text-center'>
            {(pokemonName.length === 0) ? 
            (
                <div className='p-5'>
                    <tr>
                        <p>Đang cố gắng tải hình ảnh trợ thủ của bạn...</p>
                    </tr>
                </div>
                
            ) :
            (
                pokemonName.map((jobs, index) => (
                    <>
                        <div className='mt-2 mb-4'>
                            <img className='img-need-hover' src={`/assets/assistant_zone/${pokemonName[index].character_name}_${isShiny[index].is_shiny}.png`} width="360px" height="360px" alt={`${pokemonName[index].character_name}`} />
                        </div>
                            <div className='mt-5 mb-3' onClick={handleChangeTextAfterClick}>
                                {(isShiny.map((jobs, index) => (
                                    jobs.is_shiny === '1' ? (
                                        <p><strong>{pokemonName[index].character_name}: </strong>Xin chào, mình là Shiny {pokemonName[index].character_name} của bạn. Chúng ta hãy cùng hoàn thành lời nhắc <i>({content.content})</i> này nhé!</p>
                                    ) : (
                                        <p><strong>{pokemonName[index].character_name}: </strong>Xin chào, mình là {pokemonName[index].character_name} của bạn. Chúng ta hãy cùng hoàn thành lời nhắc <i>({content.content})</i> này nhé!</p>
                                    )
                                )))}
                            </div>
                    </>
                )
            ))}
        </div>
        <div class="container">
            <div class="my-3 p-3 bg-body rounded shadow-sm">
                <h5 class="border-bottom pb-2 mb-0 text-center">Chi tiết lời nhắc</h5>
                    {( content.length === 0 || priorityLevel.length === 0 || deadline.length === 0) ? (
                        <>
                            <div class="d-flex text-body-secondary pt-3">
                                <p>
                                   Đang cố gắng tải dữ liệu...
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div class="d-flex text-body-secondary pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                <p class="pb-3 mb-0 lh-sm border-bottom">
                                    <strong>Nội dung lời nhắc: </strong>{content.content}
                                </p>
                            </div>
                            <div class="d-flex text-body-secondary pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
                                <p class="pb-3 mb-0 lh-sm border-bottom">
                                    <strong>Mức ưu tiên: </strong> {priorityLevel.priority_level}
                                </p>
                            </div>
                            <div class="d-flex text-body-secondary pt-3">
                                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"></rect><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
                                <p class="pb-3 mb-0 lh-sm border-bottom">
                                    <strong>Thời hạn: </strong> {formattedDateTime}
                                </p>
                            </div>
                            <div className='mt-3 small'>
                                <p><strong>Fact:</strong> {itemRand} </p>
                            </div>
                        </>                                   
                    )}
            </div>
        </div>
        {( content.status == '1') ? (
            <div className='mt-3 text-center'>
                <button onClick={() => handleHoanThanhTask(content.id)} className='btn btn-success'>Đánh dấu hoàn thành</button>
            </div>
        ) : (
            <div className='mt-3 text-center'>
                <b>Bạn đã từng cùng với trợ thủ của mình hoàn thành lời nhắc này rồi. Chúc mừng nhé!</b>
            </div>
        )}
        
        <div className='mt-3 p-5'>
            <small><i><strong>*: </strong> Đây là thời gian được lấy dựa trên thời gian thực của thiết bị mà bạn đang sử dụng</i></small><br />
            <small><i><strong>Source: </strong> <a href="https://github.com/trHgTung/snorlax" target='_blank'>GitHub (Hoang Tung)</a> </i></small>
        </div>

    </>
  )
}

export default Assistant