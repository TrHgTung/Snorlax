import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Update = ({jobId}) => {
    const [formData, setFormData] = useState({
        content: '',
        priority_level: '',
        deadline: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://127.0.0.1:4401/api/edit/job/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData(response.data);
            }
            catch(error){
                console.log('Error', error);
            }
        };
        fetchData();
    }, [jobId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

  return (
    <div>Update</div>
  )
}

export default Update