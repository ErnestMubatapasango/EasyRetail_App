import React from 'react';
import './App.css';
import ProductSearch from './components/ProductSearch';

function App() {
  return (
    <div className="App">
      <div className='app--content__wrapper'>
        <ProductSearch />
        <ProductSearch />
      </div>
      
    </div>
  );
}

export default App;
