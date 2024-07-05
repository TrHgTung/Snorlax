import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../supports/AuthProvider';
import { BsEmojiSmile, BsEmojiAstonished, BsEmojiAngry } from "react-icons/bs";
import host from '../config/host.json';
import { toast } from 'react-toastify';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;
const {MAIL_API_ENDPOINT} = host;
const {MAIL_SERVER_API} = host;

const Task = () => {
    const [data, setData] = useState('');
    const [pokemonTaskName, setPokemonTaskName] = useState('');
    const [deadline, setDeadline] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();
    let stt = 1;
    const pokemonName = localStorage.getItem('pokemon_name');
    const assistId = localStorage.getItem('assist_id');

    const [sendData, setSendData] = useState({
        email: '',
        assistant: '',
        deadline: ''
    });

    useEffect(() => {
        // const validToken = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_API}${API_ENDPOINT}/jobs`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                
                setDeadline(response.data.result);
                setData(response.data.result);
                setPokemonTaskName(response.data.get_pokemon_name);
                //setCheckDeadline(response.data.check_time);

                // console.log("Check Deadline: " + checkDeadline.character_name)              
        }
        catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [auth.token]);    
    
    if (!data || !pokemonTaskName) {
        return <div>Đang tải dữ liệu...</div>;
    }

    const handleUpdateClick = (jobId) => {
        navigate(`/update/${jobId}`);
    };

    const directToAssistant = (jobId) => {
        navigate(`/assistant-zone/${jobId}`);
    };
  
    const handleHoanThanhTask = async (jobId) => {
        try {
            await axios.get(`${SERVER_API}/sanctum/csrf-cookie`, { withCredentials: true });
            const response = await axios.patch(`${SERVER_API}${API_ENDPOINT}/finish/job/${jobId}`, 
                // status: '0' // Cap nhat thanh '0' (hoan thanhf Task)
                null, {
                headers: {
                    "Accept-Language": "en-US,en;q=0.9",
                    'Content-Type': 'application/json',
                    'Charset':'utf-8',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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
                // console.log(response.headers)
                console.log('Đã đánh dấu hoàn thành');
                window.location.reload();
            } else {
                // console.log(response.headers)
                console.error('Không thể hoàn thành, có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra. Nội dung lỗi: ', error);
        }
    };

    const sendMailFunction = async (e) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem('username');
            const assistant = localStorage.getItem('pokemon_name');
            const deadline = localStorage.getItem('deadline');
         
            const sendData = {
                email: email,
                assistant: assistant,
                deadline: deadline // Sửa lỗi gán 'deadline' vào 'email'
            };
            const response = await axios.post(`http://127.0.0.1:5000/api/send`, sendData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                        'supports_credentials' : true
                    }
                },
                {withCredentials: true}
            );
           

            if (response.data.success) {
                console.log('Dang gui tin hieu toi SMTP...'); 
            } else {             
                console.error('Co loi xay ra');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        e.target.innerHTML = '<div></div>';
    };
   
    let dl = [];
    let dateOnDeadline = '';
    for(let i = 0; i < deadline.length; i++){
        dl.push(deadline[i].deadline);
    }
    console.log(dl);
    let dates = [];
    
    dl.forEach(datetime => {
        let date = datetime.substring(0, 10);
        dates.push(date);
    });
    
    console.log('Dinh dang xu ly: ' + dates);// ***
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Thêm '0' phía trước nếu cần thiết
    let day = now.getDate().toString().padStart(2, '0'); // Thêm '0' phía trước nếu cần thiết
    let formatDate = `${year}-${month}-${day}`;
    console.log(`Ngày tháng năm hiện tại: ${formatDate}`); 
    // let result_date = [];
    
    for(let i = 0; i < dates.length; i++){
        if(dates[i] == formatDate){
            dateOnDeadline = dates[i];
        }
    }
    if(dateOnDeadline){
        localStorage.setItem('deadline', dateOnDeadline);
        console.log(dateOnDeadline);
    }
    else {
        localStorage.removeItem('deadline');
        console.log('Không có lời nhắc nào đến hạn');
    }

    return (
      <div className='container'>
        <div>
            {(dateOnDeadline) ? (
                <div className='text-danger mb-4 mt-1' onClick={sendMailFunction} id="notification-on-centerr">CẢNH BÁO: Có lời nhắc sắp đến hạn hôm nay, hãy kiểm tra lại<br />Nhấn vào đây để tắt</div>
            ) : (
                <div className='mb-4 mt-1'><i>Hãy hover vào từng trợ thủ để xem chúng nhắc bạn điều gì</i></div>
            )}
        </div>
        <h4>Danh sách lời nhắc cần hoàn thành</h4>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Nội dung công việc</th>
                    <th scope="col">Thời hạn</th>
                    <th scope="col">Mức ưu tiên</th>
                    <th scope="col">Trợ thủ</th>
                    <th scope="col">Cập nhật công việc</th>
                    <th scope="col">Hoàn thành công việc</th>
                </tr>
            </thead>
            <tbody>
                {(data.length === 0) ? (
                    <tr>
                        <td colSpan="7" className="text-center">Không có lời nhắc khả dụng</td>
                    </tr>
                ) : (
                    // pokemonTaskName.map(pokemons => (
                        data.map((jobs, index) => (
                            jobs.status === '1' && (
                                <tr key={jobs.id}>
                                    <td>{stt++}</td>
                                    <td>{jobs.content}</td>
                                    <td>{jobs.deadline}</td>
                                    {jobs.priority_level === 'easy' && <p className='text-success'><BsEmojiSmile /> Thấp</p>}
                                    {jobs.priority_level === 'middle' && <p className='text-warning'><BsEmojiAstonished /> Trung bình</p>}
                                    {jobs.priority_level === 'difficult' && <p className='text-danger'><BsEmojiAngry /> Cao</p>}
                                    <td>{pokemonTaskName[index] ? (<a className='force-link link-offset-2 link-underline link-underline-opacity-0' onClick={ () => directToAssistant(jobs.id) }>{pokemonTaskName[index].character_name}</a> ) : (<p>Lời nhắc này không có trợ thủ!</p>)}</td>
                                    <td>
                                        <button onClick={ () => handleUpdateClick(jobs.id) } className='btn btn-sm btn-secondary'>Chỉnh sửa</button>
                                    </td>
                                    <td>
                                        <button onClick={ () => handleHoanThanhTask(jobs.id) } className='btn btn-sm btn-success ms-2'>Đánh dấu h.tất</button>
                                    </td>
                                </tr>
                                // ))
                            )
                        )
                    ))}
            </tbody>
        </table>
        <div>
           {assistId !== '0' && data.length !== 0 && <img src={`/assets/${assistId}.png`} className='img-need-hover-login' alt={`${pokemonName}`} title={`${pokemonName} thắc mắc rằng bạn đã hoàn thành mọi công việc hay chưa?`} width={`40%`} height={`30%`} />}
           {assistId === '0' && <></>}
           {assistId !== '0' && data.length === 0 && <img src={`/assets/${assistId}.png`} className='img-need-hover-login' alt={`${pokemonName}`} title={`${pokemonName} đang vui vẻ vì bạn đang rảnh rỗi`} width={`40%`} height={`30%`} />}
        </div>
      </div>
    )
  }


export default Task;