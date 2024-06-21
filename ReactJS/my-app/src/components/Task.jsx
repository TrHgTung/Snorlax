import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const Task = () => {
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const result = await axios("http://127.0.0.1:4401/api/jobs");
            console.log(result);
        }catch (error) {
            console.log('Cannot authenticate due to an error');
        }
    }
  
    return (
      <div className='container'>
        <h4>Tasks List</h4>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </table>
      </div>
    )
  }


export default Task