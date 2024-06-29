import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import host from '../config/host.json';
import { toast } from 'react-toastify';
import { useAuth } from '../supports/AuthProvider';
import axios from 'axios';

const {SERVER_API} = host;
const {API_ENDPOINT} = host;

function Assistant() {
    const [pokemonName, setPokemonName] = useState('');
    const [isShiny, setIsShiny] = useState('');
    const auth = useAuth();
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

                console.log(pokemonName);
                console.log(isShiny);
            }
            catch(error){
                toast.error('Có lỗi xảy ra (catch execption). Hãy thử lại');
            }
        };
        fetchData();
    }, [id]);

  return (
    <>
        <div className='mt-4 text-center'>
            {(pokemonName.length === 0) ? 
            (
                <tr>
                    <p>Không có dữ liệu khả dụng</p>
                </tr>
            ) :
            (
                pokemonName.map((jobs, index) => (
                    // <p>{pokemonName[index].character_name}</p>
                    <img src={`/assets/assistant_zone/${pokemonName[index].character_name}_${pokemonName[index].is_shiny}.png`} alt={`${pokemonName[index].character_name}`} />
                )
            ))}
        </div>

        <div className='mt-3 p-2'>
            {(isShiny.length === 0) ? 
            (
                <tr>
                    <p>Không có dữ liệu khả dụng</p>
                </tr>
            ) : 
            (
                isShiny.map((jobs, index) => (
                    // <p>{isShiny[index].is_shiny}</p>
                    jobs.is_shiny === '1' ? (
                        <p>Shiny</p>
                    ) : (
                        <p>No Shiny</p>
                    )
                    
                )
            ))}
        </div>
    </>
  )
}

export default Assistant