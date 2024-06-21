import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
