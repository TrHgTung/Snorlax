import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Task from './Task';

export class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h2 className='w-100 d-flex justify-content-center p-3 mb-4'>To-do list</h2>
        <div className="row">
            <div className="col-md-4">
                <h4>Add your tasks</h4>
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor='content' className="form-label">Content:</label>
                        <input type='text' className='form-control' id='content' name='content' placeholder='Enter...' />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='priority_level' className="form-label">Priority Level:</label>
                        <input type='text' className='form-control' id='priority_level' name='priority_level' placeholder='Enter...' />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor='deadline' className="form-label">Third element:</label>
                        <input type='text' className='form-control' id='deadline' name='deadline' placeholder='Enter...' />
                    </div>
                    <button type="submit" className='btn btn-primary mb-3'>Add this task</button>
                </form>
            </div>
            <div className="col-md-8">
                
                <Task/>
            </div>
        </div>
      </div>
    )
  }
}

export default Home