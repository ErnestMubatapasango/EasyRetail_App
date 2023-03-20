import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PosPage from './pages/PosPage';
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/pos' element={<PosPage/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
